document.addEventListener('DOMContentLoaded', () => {
	const filters = document.querySelectorAll('#filters button');
	let currentFilter = 'all';

	filters.forEach(filter => {
		filter.addEventListener('click', () => { filtering(filter.dataset.filter) })
	})

	function filtering(id) {
		if(id !== currentFilter) {
			document.querySelector('#filters button.active').classList.remove('active');
			document.querySelector('#filters button[data-filter="' + id + '"]').classList.add('active');
			if(id === 'all') {
				document.querySelectorAll('.skill-item').forEach(elem => {
					elem.style.display = 'flex'
				});
				currentFilter = id;
			} else {
				if(currentFilter === 'all') {
					document.querySelectorAll('.skill-item:not([data-category="' + id + '"])').forEach(elem => {
						elem.style.display = 'none'
					});
					currentFilter = id;
				} else {
					document.querySelectorAll('.skill-item[data-category="' + currentFilter + '"]').forEach(elem => {
						elem.style.display = 'none'
					});
					document.querySelectorAll('.skill-item[data-category="' + id + '"]').forEach(elem => {
						elem.style.display = 'flex'
					});
					currentFilter = id;
				}
			}
		}
	}

// images setup
	const images = [
		"/images/pages/universe.jpg"
	];

// content setup
	const texts = [
		["Compétences"]
	]

	rgbKineticSlider = new rgbKineticSlider({

		slideImages: images, // array of images > must be 1920 x 1080
		itemsTitles: texts, // array of titles / subtitles

		backgroundDisplacementSprite: '/img/map-9.jpg', // slide displacement image
		cursorDisplacementSprite: '/img/displace-circle.png', // cursor displacement image

		cursorImgEffect : true, // enable cursor effect
		cursorTextEffect : false, // enable cursor text effect
		cursorScaleIntensity : 0.65, // cursor effect intensity
		cursorMomentum : 0.14, // lower is slower

		swipe: true, // enable swipe
		swipeDistance : window.innerWidth * 0.4, // swipe distance - ex : 580
		swipeScaleIntensity: 2, // scale intensity during swipping

		slideTransitionDuration : 1, // transition duration
		transitionScaleIntensity : 30, // scale intensity during transition
		transitionScaleAmplitude : 160, // scale amplitude during transition

		nav: true, // enable navigation
		navElement: '.main-nav', // set nav class

		imagesRgbEffect : false, // enable img rgb effect
		imagesRgbIntensity : 0.9, // set img rgb intensity
		navImagesRgbIntensity : 80, // set img rgb intensity for regular nav

		textsDisplay : true, // show title
		textsSubTitleDisplay : false, // show subtitles
		textsTiltEffect : true, // enable text tilt
		textFontFamily: '"Camila", serif',
		//googleFonts : ['Playfair Display:700', 'Roboto:400'], // select google font to use
		buttonMode : false, // enable button mode for title
		textsRgbEffect : true, // enable text rgb effect
		textsRgbIntensity : 0.03, // set text rgb intensity
		navTextsRgbIntensity : 15, // set text rgb intensity for regular nav

		textTitleColor : 'white', // title color
		textTitleSize : 150, // title size
		mobileTextTitleSize : 100, // title size
		textTitleLetterspacing : 3, // title letterspacing
	});
})