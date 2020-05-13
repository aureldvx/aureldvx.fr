let sketch = new Sketch({
	clickerPrev: '#prev',
	clickerNext: '#next',
	container: '#slider-thumbnail'
});

document.addEventListener('DOMContentLoaded', resize);
window.addEventListener('resize', resize);

let date = document.querySelectorAll('time');
let client = document.querySelectorAll('.slider-item__tags span');
let title = document.querySelectorAll('.slider-item__title h2');
let mission = document.querySelectorAll('.slider-item__mission h3');
let links = document.querySelectorAll('.slider-item__link');
let carouselLength = date.length;

let prev = document.querySelector('#prev');
let next = document.querySelector('#next');

prev.addEventListener('click', (e) => {
	prev.setAttribute('disabled', 'true')
	movePrev()
	setTimeout(() => {
		prev.removeAttribute('disabled')
	}, 1000);
});
next.addEventListener('click', (e) => {
	next.setAttribute('disabled', 'true')
	moveNext()
	setTimeout(() => {
		next.removeAttribute('disabled')
	}, 1000);
});

function resize() {
	let dateHeight = 0;
	let clientHeight = 0;
	let titleHeight = 0;
	let missionHeight = 0;
	let LinkHeight = 0;

	date.forEach(elem => {
		if (elem.getBoundingClientRect().height > dateHeight)
			dateHeight = elem.getBoundingClientRect().height
	});

	client.forEach(elem => {
		if (elem.getBoundingClientRect().height > clientHeight)
			clientHeight = elem.getBoundingClientRect().height
	});

	title.forEach(elem => {
		if (elem.getBoundingClientRect().height > titleHeight)
			titleHeight = elem.getBoundingClientRect().height
	});

	mission.forEach(elem => {
		if (elem.getBoundingClientRect().height > missionHeight)
			missionHeight = elem.getBoundingClientRect().height
	});

	links.forEach(elem => {
		if (elem.getBoundingClientRect().height > LinkHeight)
			LinkHeight = elem.getBoundingClientRect().height
	});

	document.querySelector('.slider-item__date').style.height = dateHeight + 'px';
	document.querySelector('.slider-item__tags').style.height = clientHeight + 'px';
	document.querySelector('.slider-item__title').style.height = titleHeight + 'px';
	document.querySelector('.slider-item__mission').style.height = missionHeight + 'px';
	document.querySelector('.slider-item footer').style.height = LinkHeight + 'px';
}

function moveNext() {
	let number = this.getSlideNumber();

	if (number == carouselLength) {
		date[carouselLength - 1].classList.remove('active');
		client[carouselLength - 1].classList.remove('active');
		title[carouselLength - 1].classList.remove('active');
		mission[carouselLength - 1].classList.remove('active');
		links[carouselLength - 1].classList.remove('active');
		date[0].classList.add('active');
		client[0].classList.add('active');
		title[0].classList.add('active');
		mission[0].classList.add('active');
		links[0].classList.add('active');
	} else {
		date[number - 1].classList.remove('active');
		client[number - 1].classList.remove('active');
		title[number - 1].classList.remove('active');
		mission[number - 1].classList.remove('active');
		links[number - 1].classList.remove('active');
		date[number].classList.add('active');
		client[number].classList.add('active');
		title[number].classList.add('active');
		mission[number].classList.add('active');
		links[number].classList.add('active');
	}
}

function movePrev() {
	let number = this.getSlideNumber();

	if (number == 1) {
		date[0].classList.remove('active');
		client[0].classList.remove('active');
		title[0].classList.remove('active');
		mission[0].classList.remove('active');
		links[0].classList.remove('active');
		date[carouselLength - 1].classList.add('active');
		client[carouselLength - 1].classList.add('active');
		title[carouselLength - 1].classList.add('active');
		mission[carouselLength - 1].classList.add('active');
		links[carouselLength - 1].classList.add('active');
	} else {
		date[number - 1].classList.remove('active');
		client[number - 1].classList.remove('active');
		title[number - 1].classList.remove('active');
		mission[number - 1].classList.remove('active');
		links[number - 1].classList.remove('active');
		date[number - 2].classList.add('active');
		client[number - 2].classList.add('active');
		title[number - 2].classList.add('active');
		mission[number - 2].classList.add('active');
		links[number - 2].classList.add('active');
	}
}

function getSlideNumber() {
	return document.querySelector('.slider-item__title h2.active').getAttribute('data-slider');
}