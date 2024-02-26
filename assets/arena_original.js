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
    // Generate random positions within the grid
    const xPosition = Math.random() * 80 - 50; // Random position between 0 and 100%
    const yPosition = Math.random() * 50; // Random position between 0 and 100%
    const currentImageButton = document.createElement('button');
		currentImageButton.classList.add('img-button');
		currentImageButton.classList.add('block')
		currentImageButton.innerHTML = 
		`
			<li class="pepperoni slower filtered block block-image" style="transform: translate(${xPosition}%, ${yPosition}%);">
					<img src="${block.image.large.url}" alt="${block.title} by ${block.user.full_name}">
			</li>
		
		`

    channelBlocks.appendChild(currentImageButton);
    
    // Assuming this code snippet is placed where it runs after the buttons have been added to the DOM
		currentImageButton.addEventListener('click', function () {
			// Find the img element within the clicked button
			const imgSrc = this.querySelector('img').src;
	
			// Create a new div to hold the fullscreen image
			const fullscreenDiv = document.createElement('div');
			fullscreenDiv.classList.add('fullscreen-image-container');
			
			fullscreenDiv.classList.add('active');
			document.body.classList.add('no-scroll');

			// Create the new img element with the same src
			const fullscreenImg = document.createElement('img');
			fullscreenImg.src = imgSrc;
	
			// Append the img to the fullscreen div
			fullscreenDiv.appendChild(fullscreenImg);
	
			// Create a close button (X button) for the fullscreen div
			const closeButton = document.createElement('button');
			closeButton.classList.add('close-button');
			closeButton.textContent = 'X';
			fullscreenDiv.appendChild(closeButton);

			closeButton.addEventListener('click', function(event) {
				event.stopPropagation(); // Prevent any parent handlers from being executed
				console.log("Close button clicked!"); // Check if the event listener is triggered
				fullscreenDiv.classList.remove('active'); // Remove the active class to hide the fullscreenDiv
				document.body.classList.remove('no-scroll');

				document.body.removeChild(fullscreenDiv); // Optionally, remove the fullscreen div entirely
			});
			// Append the fullscreen div to the body
			document.body.appendChild(fullscreenDiv);
			const iframeBoundingRect = fullscreenImg.getBoundingClientRect();
			closeButton.style.left = iframeBoundingRect.right + 20 +'px';
			closeButton.style.top = iframeBoundingRect.top - 30 + 'px';
			})



	

}


	// TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT 
	else if (block.class == 'Text') {
		// console.log(block)
		const currentTextItem = document.createElement('button');
		currentTextItem.classList.add('block')
		currentTextItem.classList.add('block-txt')
		currentTextItem.innerHTML = 
		`
				<h3 class="title">
					${block.title}
				</h3>
		`
		// let textBlocks = document. getElementById('text-blocks')
		// textBlocks.insertAdjacentHTML('beforeend', TextItem)
		channelBlocks.appendChild(currentTextItem)
    
    // Assuming this code snippet is placed where it runs after the buttons have been added to the DOM
		currentTextItem.addEventListener('click', function () {
	
			// Create a new div to hold the fullscreen image
			const fullscreenDiv = document.createElement('div');
			fullscreenDiv.classList.add('fullscreen-image-container');
			
			fullscreenDiv.classList.add('active');
			document.body.classList.add('no-scroll');
			
			// Create the new img element with the same src
			const fullscreenParagraph = document.createElement('p');
			fullscreenParagraph.classList.add('fullscreen-text-container')
			fullscreenParagraph.innerHTML = block.content;
	
			// Append the img to the fullscreen div
			fullscreenDiv.appendChild(fullscreenParagraph);
	
			// Create a close button (X button) for the fullscreen div
			const closeButton = document.createElement('button');
			closeButton.classList.add('close-button');
			closeButton.textContent = 'X';
			fullscreenDiv.appendChild(closeButton);

			closeButton.addEventListener('click', function(event) {
				event.stopPropagation(); // Prevent any parent handlers from being executed
				console.log("Close button clicked!"); // Check if the event listener is triggered
				fullscreenDiv.classList.remove('active'); // Remove the active class to hide the fullscreenDiv
				document.body.classList.remove('no-scroll');

				document.body.removeChild(fullscreenDiv); // Optionally, remove the fullscreen div entirely
			});
			// Append the fullscreen div to the body
			document.body.appendChild(fullscreenDiv);
			const iframeBoundingRect = fullscreenParagraph.getBoundingClientRect();
			closeButton.style.left = iframeBoundingRect.right + 20 +'px';
			closeButton.style.top = iframeBoundingRect.top - 30 + 'px';

			})


	}


	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition


		// Uploaded videos!



		
		// PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF
		// Uploaded PDFs!
		 if (attachment.includes('pdf')) {
			// console.log(block)

			let pdfItem = 
			`
			<li class="block block-pdf">
			<a href="${block.attachment.url}">
						<img src="${block.image.large.url}" alt="${block.title}"/>
				</a>
			</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)

		}

		// Uploaded audio!
		
	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type


		// VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO 

		// Linked video!

		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			 // Generate random positions within the grid
			 const xPosition = Math.random() * 80; // Random position between 0 and 100%
			 const yPosition = Math.random() * 100; // Random position between 0 and 100%
			 const currentVideoButton = document.createElement('button');
			currentVideoButton.classList.add('video-button');
			currentVideoButton.classList.add('block')
			currentVideoButton.innerHTML = 
				`
				<li class="filtered block block-video"
				style="transform: translate(${xPosition}%, ${yPosition}%);">
					<img class="video-thumbnail" src="${ block.image.large.url}" alt="${block.title}"/>
					<img class="video-play" src="content/play button.png"/>
				</li>
				`

			channelBlocks.appendChild(currentVideoButton)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		
	
    
    // Assuming this code snippet is placed where it runs after the buttons have been added to the DOM
		currentVideoButton.addEventListener('click', function () {
			// Find the img element within the clicked button
			const youtubeBaseUrl = block.source.url;
			const trimmedUrl = youtubeBaseUrl.replace('https://www.youtube.com/watch?v=', '')
			const youtubeEmbedUrl = 'https://www.youtube.com/embed/' + trimmedUrl
			console.log(youtubeEmbedUrl)
	
			// Create a new div to hold the fullscreen image
			const fullscreenDiv = document.createElement('div');
			fullscreenDiv.classList.add('fullscreen-image-container');
			fullscreenDiv.classList.add('active');
			document.body.classList.add('no-scroll');

			// Create the new img element with the same src
			const fullscreenVideoWrapper= document.createElement('p');
			fullscreenVideoWrapper.innerHTML = `
			<iframe 
				class="active-video"
				width="560" 
				height="315" 
				src="${youtubeEmbedUrl}" 
				title="" 
				frameBorder="0"   
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen
			>
			</iframe>
			`;
	
			// Append the img to the fullscreen div
			fullscreenDiv.appendChild(fullscreenVideoWrapper);
	
			// Create a close button (X button) for the fullscreen div
			const closeButton = document.createElement('button');
			closeButton.classList.add('close-button');
			closeButton.textContent = 'X';
			fullscreenDiv.appendChild(closeButton);
			
			closeButton.addEventListener('click', function(event) {
				event.stopPropagation(); // Prevent any parent handlers from being executed
				console.log("Close button clicked!"); // Check if the event listener is triggered
				fullscreenDiv.classList.remove('active'); // Remove the active class to hide the fullscreenDiv
				document.body.classList.remove('no-scroll');
				
				document.body.removeChild(fullscreenDiv); // Optionally, remove the fullscreen div entirely
			});
			// Append the fullscreen div to the body
			document.body.appendChild(fullscreenDiv);
			const iframeBoundingRect = fullscreenVideoWrapper.getBoundingClientRect();
			closeButton.style.left = iframeBoundingRect.right + 20 +'px';
			closeButton.style.top = iframeBoundingRect.top - 30 + 'px';
			})

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
	});


	window.addEventListener('scroll', function() {
		var header = document.getElementById('pizzaheader');
		const bodyEl = document.getElementById('body')
		// Calculate the 90vh in pixels
		var triggerHeight = window.innerHeight * 0.9;
		if (window.scrollY >= triggerHeight) {
			header.classList.add('sticky');
			bodyEl.style.marginTop = `${header.offsetHeight}px`;
		} else {
			header.classList.remove('sticky');
			bodyEl.style.marginTop = '0vh';

		}
	});
	