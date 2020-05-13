{
	const body = document.body;
	const docEl = document.documentElement;

	const MathUtils = {
		lineEq: (y2, y1, x2, x1, currentVal) => {
			// y = mx + b
			var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
			return m * currentVal + b;
		},
		lerp: (a, b, n) =>  (1 - n) * a + n * b,
		distance: (x1, x2, y1, y2) => {
			var a = x1 - x2;
			var b = y1 - y2;
			return Math.hypot(a,b);
		}
	};

	let winsize;
	let container = document.querySelector('section.hero');
	let textContainer = document.querySelector('.hero__cover');
	const elem = document.querySelector('.content__text');
	const textEl = elem.querySelector('span.content__text-inner');
	const textContent = textEl;

	const calcWinsize = () => winsize = {width: (window.innerWidth - 48), height: (textContainer.getBoundingClientRect().height / 2)};
	const execute = () => {
		if(window.innerWidth > 1050) {
			const getMousePos = (ev) => {
				let posx = 0;
				let posy = 0;
				if (!ev) ev = window.event;
				if (ev.pageX || ev.pageY) {
					posx = ev.pageX;
					posy = ev.pageY;
				}
				else if (ev.clientX || ev.clientY) 	{
					posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
					posy = ev.clientY + body.scrollTop + docEl.scrollTop;
				}
				return {x: posx, y: posy};
			}

			let mousePos = {x: winsize.width/2, y: winsize.height/2};
			container.addEventListener('mousemove', ev => mousePos = getMousePos(ev));

			const createBlotterText = () => {
				const text = new Blotter.Text(textEl.innerHTML, {
					family : 'PlayFair Display',
					weight: 500,
					size : 120,
					paddingLeft: 100,
					paddingRight: 100,
					paddingTop: 200,
					paddingBottom: 0,
					fill : '#000000'
				});

				if(elem.querySelector('span.content__text-inner') !== null)
					elem.removeChild(textEl);

				const material = new Blotter.LiquidDistortMaterial();
				material.uniforms.uSpeed.value = 1;
				material.uniforms.uVolatility.value = 0.5;
				material.uniforms.uSeed.value = 0.1;
				const blotter = new Blotter(material, {texts: text});
				const scope = blotter.forText(text);

				let canvas = elem.querySelector('canvas');
				if(canvas !== null)
					elem.removeChild(canvas);

				scope.appendTo(elem);

				let lastMousePosition = {x: winsize.width/2, y: winsize.height/2};
				let volatility = 0;

				const render = () => {
					const docScrolls = {left : body.scrollLeft + docEl.scrollLeft, top : body.scrollTop + docEl.scrollTop};
					const relmousepos = {x : mousePos.x - docScrolls.left, y : mousePos.y - docScrolls.top };
					const mouseDistance = MathUtils.distance(lastMousePosition.x, relmousepos.x, lastMousePosition.y, relmousepos.y);

					volatility = MathUtils.lerp(volatility, Math.min(MathUtils.lineEq(0.9, 0, 100, 0, mouseDistance),0.9), 0.05);
					material.uniforms.uVolatility.value = volatility;

					lastMousePosition = {x: relmousepos.x, y: relmousepos.y};
					requestAnimationFrame(render);
				}
				requestAnimationFrame(render);
			}
			createBlotterText()
		} else {
			let canvas = elem.querySelector('canvas');
			if(canvas !== null) {
				elem.removeChild(canvas);
				elem.appendChild(textContent)
			}
		}
	}
	calcWinsize();
	execute();
	window.addEventListener('resize', () => {
		calcWinsize();
		execute()
	});


}