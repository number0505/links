// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)


	// Okay, Are.na stuff!   
let channelSlug = 'pizza-by-the-york' // The “slug” is just the end of the URL

// Code tutor Alex Silva assisted me in randomly placing all the pepperonis and putting variables according to the screen size in JS
const root = document.querySelector(':root');
const mobileXMultiplier = 20;
const mobileYMultiplier = 50;
const desktopXMultiplier = 90;
const desktopYMultiplier = 90;

const blockIdsList = [];

// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.getElementById('channel-title')
	let channelTitle2 = document.getElementById('channel-title-2');
	let channelDescription = document.getElementById('channel-description')
	// let channelCount = document.getElementById('channel-count') // 이거 시러
	let channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	const arenaTitle = data.title;
	const titleWordsArr = arenaTitle.trim().split(' ');
	const titleWordsMidPoint = Math.floor(titleWordsArr.length / 2);
	const firstHalf =  titleWordsArr.slice(0, titleWordsMidPoint);
	const secondHalf = titleWordsArr.slice(titleWordsMidPoint, titleWordsArr.length);
	channelTitle.innerHTML = firstHalf.join(' ');
	channelTitle2.innerHTML = secondHalf.join(' ');
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

		const mobileXPos = Math.random() * mobileXMultiplier - (mobileXMultiplier/2); // Random position between 0 and 100%
		const mobileYPos = Math.random() * mobileYMultiplier - (mobileYMultiplier/2); // Random position between 0 and 100%

		const desktopXPos = Math.random() * desktopXMultiplier - (desktopXMultiplier/2); // Random position between 0 and 100%
		const desktopYPos = Math.random() * desktopYMultiplier - (desktopYMultiplier/2); // Random position between 0 and 100%
		root.style.setProperty(`--${block.id}-mobile-transform`, `translate(${mobileXPos}%, ${mobileYPos}%)`);
		root.style.setProperty(`--${block.id}-desktop-transform`, `translate(${desktopXPos}%, ${desktopYPos}%)`);

		blockIdsList.push(block.id);

		let linkItem =
			`

			<li class="block block-link" id="${block.id}">
				<figcaption>
				 ARTICLE
				</figcaption>
				<h4>
				<a href="${block.source.url}">${block.title}</a>
				</h4>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE 
	else if (block.class == 'Image') {
    // Generate random positions within the grid
		const mobileXPos = Math.random() * mobileXMultiplier - (mobileXMultiplier/2); // Random position between 0 and 100%
		const mobileYPos = Math.random() * mobileYMultiplier - (mobileYMultiplier/2); // Random position between 0 and 100%

		const desktopXPos = Math.random() * desktopXMultiplier - (desktopXMultiplier/2); // Random position between 0 and 100%
		const desktopYPos = Math.random() * desktopYMultiplier - (desktopYMultiplier/2); // Random position between 0 and 100%
		root.style.setProperty(`--${block.id}-mobile-transform`, `translate(${mobileXPos}%, ${mobileYPos}%)`);
		root.style.setProperty(`--${block.id}-desktop-transform`, `translate(${desktopXPos}%, ${desktopYPos}%)`);

		blockIdsList.push(block.id);
    const currentImageButton = document.createElement('button');
		currentImageButton.classList.add('img-button');
		currentImageButton.classList.add('block')
		currentImageButton.innerHTML = 
		`
			<li id="${block.id}" class="filtered block block-image">
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

			const image = document.createElement('img');
			image.src = 'content/xbtn.png';
			image.alt = 'close';

			closeButton.appendChild(image);
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
			closeButton.style.left = iframeBoundingRect.right - 50 +'px';
			closeButton.style.top = iframeBoundingRect.top + 10 + 'px';
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
				<figcaption>
				Text
				</figcaption>
				<h4 class="text-title">
					${block.title}
				</h4>
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

			const image = document.createElement('img');
			image.src = 'content/xbtn.png';
			image.alt = 'close';

			// Code tutor Dhiriti assisted me in placing x button on the content detail page

			closeButton.appendChild(image);
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
			closeButton.style.left = iframeBoundingRect.right - 50 +'px';
			closeButton.style.top = iframeBoundingRect.top + 10 + 'px';

			})


	}


	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition


		
		// PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF PDF
		// Uploaded PDFs!
		 if (attachment.includes('pdf')) {
			// console.log(block)

			let pdfItem = 
			`
			<li class="filtered block block-pdf">
				<a href="${block.attachment.url}">
					<figcaption>
					PDF
					</figcaption>
					<img src="${block.image.large.url}" alt="${block.title}"/>
				</a>
			</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)

		}

	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type


		// VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO 

		// Linked video!

		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			 // Generate random positions within the grid
			 const mobileXPos = Math.random() * mobileXMultiplier - (mobileXMultiplier/2); // Random position between 0 and 100%
			 const mobileYPos = Math.random() * mobileYMultiplier - (mobileYMultiplier/2); // Random position between 0 and 100%
	 
			 const desktopXPos = Math.random() * desktopXMultiplier - (desktopXMultiplier/2); // Random position between 0 and 100%
			 const desktopYPos = Math.random() * desktopYMultiplier - (desktopYMultiplier/2); // Random position between 0 and 100%
	 
			 root.style.setProperty(`--${block.id}-mobile-transform`, `translate(${mobileXPos}%, ${mobileYPos}%)`);
			 root.style.setProperty(`--${block.id}-desktop-transform`, `translate(${desktopXPos}%, ${desktopYPos}%)`);
	 
			 blockIdsList.push(block.id);
			 const currentVideoButton = document.createElement('button');
			currentVideoButton.classList.add('video-button');
			currentVideoButton.classList.add('block')
			currentVideoButton.innerHTML = 
				`
				<li id="${block.id}" class="filtered block block-video">
					<img class="video-thumbnail" src="${ block.image.large.url}" alt="${block.title}"/>
					<img id="youtube-btn" class="video-play" src="content/play button.png"/>
				</li>
				`

			channelBlocks.appendChild(currentVideoButton)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		
	
    
    // Assuming this code snippet is placed where it runs after the buttons have been added to the DOM
		currentVideoButton.addEventListener('click', function () {
			// Find the img element within the clicked button

			// Create a new div to hold the fullscreen image
			const fullscreenDiv = document.createElement('div');
			fullscreenDiv.classList.add('fullscreen-image-container');
			fullscreenDiv.classList.add('active');
			document.body.classList.add('no-scroll');

			// Create the new img element with the same src
			const fullscreenVideoWrapper= document.createElement('p');
			fullscreenVideoWrapper.innerHTML = block.embed.html;
	
			// Append the img to the fullscreen div
			fullscreenDiv.appendChild(fullscreenVideoWrapper);
	
			// Create a close button (X button) for the fullscreen div
		




			const closeButton = document.createElement('button');
			closeButton.classList.add('close-button');

			const image = document.createElement('img');
			image.src = 'content/xbtn.png';
			image.alt = 'close';

			closeButton.appendChild(image);
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
			closeButton.style.left = iframeBoundingRect.right - 50 +'px';
			closeButton.style.top = iframeBoundingRect.top +10 + 'px';
			})

		} 

		// Linked audio!
		else if (embed.includes('rich')) {
					// …still up to you, but here’s an example `iframe` element:
			 // Generate random positions within the grid
			 const mobileXPos = Math.random() * mobileXMultiplier - (mobileXMultiplier/2); // Random position between 0 and 100%
			 const mobileYPos = Math.random() * mobileYMultiplier - (mobileYMultiplier/2); // Random position between 0 and 100%
	 
			 const desktopXPos = Math.random() * desktopXMultiplier - (desktopXMultiplier/2); // Random position between 0 and 100%
			 const desktopYPos = Math.random() * desktopYMultiplier - (desktopYMultiplier/2); // Random position between 0 and 100%
			root.style.setProperty(`--${block.id}-mobile-transform`, `translate(${mobileXPos}%, ${mobileYPos}%)`);
			root.style.setProperty(`--${block.id}-desktop-transform`, `translate(${desktopXPos}%, ${desktopYPos}%)`);
			const currentAudioButton = document.createElement('button');
			console.log(currentAudioButton)
			currentAudioButton.classList.add('video-button');
			currentAudioButton.classList.add('block')
			currentAudioButton.innerHTML = 
				`
				<li id="${block.id}" class="filtered block block-video">
					<img class="video-thumbnail" src="${ block.image.large.url}" alt="${block.title}"/>
					<img class="video-play" src="content/play button_spotify.png"/>
				</li>
				`

			channelBlocks.appendChild(currentAudioButton)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		
	
    
    // Assuming this code snippet is placed where it runs after the buttons have been added to the DOM
		currentAudioButton.addEventListener('click', function () {
			// Find the img element within the clicked button


	
			// Create a new div to hold the fullscreen image
			const fullscreenDiv = document.createElement('div');
			fullscreenDiv.classList.add('fullscreen-image-container');
			fullscreenDiv.classList.add('active');
			document.body.classList.add('no-scroll');

			// Create the new img element with the same src
			const fullscreenVideoWrapper= document.createElement('p');
			fullscreenVideoWrapper.innerHTML = block.embed.html;
	
			// Append the img to the fullscreen div
			fullscreenDiv.appendChild(fullscreenVideoWrapper);
	
			// Create a close button (X button) for the fullscreen div
			const closeButton = document.createElement('button');
			closeButton.classList.add('close-button');

			const image = document.createElement('img');
			image.src = 'content/xbtn.png';
			image.alt = 'close';

			closeButton.appendChild(image);
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
			closeButton.style.left = iframeBoundingRect.right - 50 +'px';
			closeButton.style.top = iframeBoundingRect.top + 10 + 'px';
			})
		}
	}
}


window.addEventListener('resize', () => {
	setBlockElsTransformValue();
})

function setBlockElsTransformValue () {
	blockIdsList.forEach((id) => {
		const currentBlockEl = document.getElementById(id);
		if (window.innerWidth <= 768) {
			// MOBILE SCREEN SIZES
			currentBlockEl.style.transform = `var(--${id}-mobile-transform)`
		} else {
			// DESKTOP SCREEN SIZES
			currentBlockEl.style.transform = `var(--${id}-desktop-transform)`
		}
	})
}

setTimeout(() => {
	setBlockElsTransformValue();

}, 500);

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
	