makeSameDimensions('.equal');

window.addEventListener('resize', function() {
	makeSameDimensions('.equal')
});

function makeSameDimensions(elems) {
	[...document.querySelectorAll(elems)].forEach((el) => {
		let width = el.getBoundingClientRect().width;
		el.style.height = width + 'px';
	});
}