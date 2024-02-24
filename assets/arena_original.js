// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



// Okay, Are.na stuff!    
let channelSlug = 'pizza-by-the-york' // The “slug” is just the end of the URL


// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.getElementById('channel-title')
	let channelDescription = document.getElementById('channel-description')
	// let channelCount = document.getElementById('channel-count') // 이거 시러
	let channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	// channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}


// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')


	console.log(block.class)


	// LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK LINK 
	if (block.class == 'Link') {
		// console.log(block)
		let linkItem =
			`

			<li class="block block-link">
			
				<h3>
				<a href="${block.source.url}">${block.title}</a>
				</h3>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE 
	else if (block.class == 'Image') {
		// console.log(block)
			let imageItem =
			`
			<button class="img-button">
			<li class="filtered block block-image">
					<img src="${block.image.large.url}" alt="${block.title} by ${block.user.full_name}">
			</li>
			</button>
			`
			channelBlocks.insertAdjacentHTML('beforeend', imageItem)
			// Assuming this code snippet is placed where it runs after the buttons have been added to the DOM
document.querySelectorAll('.img-button').forEach(button => {
    button.addEventListener('click', function() {
        // Find the img element within the clicked button
        const imgSrc = this.querySelector('img').src;

        // Create a new div to hold the fullscreen image
        const fullscreenDiv = document.createElement('div');
        fullscreenDiv.classList.add('fullscreen-image-container');
        
        // Create the new img element with the same src
        const fullscreenImg = document.createElement('img');
        fullscreenImg.src = imgSrc;

        // Append the img to the fullscreen div
        fullscreenDiv.appendChild(fullscreenImg);

        // Add a click event to the fullscreen div to remove it when clicked
        fullscreenDiv.addEventListener('click', function() {
            this.remove();
        });

        // Append the fullscreen div to the body
        document.body.appendChild(fullscreenDiv);
    });
});

			
		} 

	// TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT 
	else if (block.class == 'Text') {
		// console.log(block)

		let TextItem = 
		`
			<li class="block block-txt">

				<h3 class="title">
					${block.title}
				</h3>
			</li>
		`
		// let textBlocks = document. getElementById('text-blocks')
		// textBlocks.insertAdjacentHTML('beforeend', TextItem)
		channelBlocks.insertAdjacentHTML('beforeend', TextItem)

	}


	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition


		// Uploaded videos!

		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
				<li>
					<p><em>Video</em></p>
					<video controls src="${ block.attachment.url }"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		
		// PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF
		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {
			// console.log(block)

			let pdfItem = 
			`
			<li class="block block-pdf">
				<a herf="${"block.attachment.url"}
						<img src="${block.image.large.url}" alt="${block.title} ">
				</a>
			</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)

		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li>
					<p><em>Audio</em></p>
					<audio controls src="${ block.attachment.url }"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type


		// VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO 

		// Linked video!

		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
				<li class="filtered block block-video">
					${ block.embed.html }
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		
		// Linked audio!
		else if (embed.includes('rich')) {
			// …up to you!
		}
	}
}



// It‘s always good to credit your work:
let renderUser = (user, container) => { // You can have multiple arguments for a function!
	let userAddress =
		` 
		<address>
			<img src="${ user.avatar_image.display }">
			<h3>${ user.first_name }</h3>
			<p><a href="https://are.na/${ user.slug }">Are.na profile ↗</a></p>
		</address>
		`
	container.insertAdjacentHTML('beforeend', userAddress)
}



// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		console.log(data.contents)
		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})
		

		// let switchButton = document.querySelectorAll('.block-image b utton')
		// 	switchButton.onclick = () => { // Attach the click event.
		// 		alert('The button was clicked!') // Pop an alert!
		// 	} // 여기 뭔소리하는지 모르겠음

		// switchButton.forEach((switchButton)=>{
		// 	console.log(switchButton)
		// })

		// // Also display the owner and collaborators:
		// let channelUsers = document.getElementById('channel-users') // Show them together
		// data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		// renderUser(data.user, channelUsers)

	});



