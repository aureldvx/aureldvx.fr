let players = document.getElementsByClassName('video-player');
resize();
window.addEventListener('resize', resize)

function resize() {
	if(players.length > 0) {
		Array.from(players).forEach(player => {
			let width = player.getBoundingClientRect().width;
			let height = (width / 16) * 9;
			let iframe = player.querySelector('iframe');
			let video = player.querySelector('video');
			if (iframe)
				iframe.style.height = height + 'px';
			if(video)
				video.style.height = height + 'px';
		})
	}
}