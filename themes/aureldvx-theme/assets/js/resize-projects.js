let items = document.getElementsByClassName('project-item');
resizeProjects();
window.addEventListener('resize', resizeProjects)

function resizeProjects() {
  if (items.length > 0) {
    Array.from(items).forEach(item => {
      let width = item.getBoundingClientRect().width;
      let height = (width / 4) * 3;
      item.style.height = height + 'px';
    })
  }
}