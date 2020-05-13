document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight - 200;
    const scrollTop = document.getElementById('scroll-appeal--top');
    const scrollBottom = document.getElementById('scroll-appeal--bottom');
    let prevScroll = 0;

    if(scrollPosition < windowHeight) {
        let radius = getDegrees(scrollPosition, windowHeight)
        if(scrollPosition > prevScroll) {
            scrollTop.style.transform = 'translate(-50%, 50%) rotate(' + radius + 'deg)';
            scrollBottom.style.transform = 'translate(-50%, -50%) rotate(' + (180 + radius) + 'deg)';
        } else if (scrollPosition < prevScroll) {
            scrollTop.style.transform = 'translate(-50%, 50%) rotate(-' + radius + 'deg)';
            scrollBottom.style.transform = 'translate(-50%, -50%) rotate(-' + (180 + radius) + 'deg)';
        }
        prevScroll = scrollPosition
    }

    function getDegrees (y, height) {
        let heightDeg = (y * 100) / height;
        return (heightDeg * 180) / 100
    }
});