const navLinks = document.querySelectorAll('#topNav a');
const sideLinks = document.querySelectorAll('.side-menu-content a');
const sections = document.querySelectorAll('main section');
const line = document.getElementById('sideMenuLine');
const content = document.getElementById('sideMenuContent');

function showSection(id) {
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

sideLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.dataset.section);
    hideSideMenu();
  });
});

let isDragging = false;
let startX;

line.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  document.body.style.cursor = "grabbing";
});

document.addEventListener('mousemove', e => {
  if (isDragging) {
    let diff = startX - e.clientX;
    if (diff > 0) {
      let moveX = Math.min(diff, 200);
      content.style.transform = `translateY(-50%) translateX(${100 - moveX}px)`;
      line.style.opacity = 0;
    } else {
      content.style.transform = `translateY(-50%) translateX(100%)`;
      line.style.opacity = 1;
    }
  }
});

document.addEventListener('mouseup', e => {
  if (isDragging) {
    isDragging = false;
    document.body.style.cursor = "default";
    let diff = startX - e.clientX;
    if (diff > 50) {
      content.style.transform = `translateY(-50%) translateX(-40px)`;
      line.style.opacity = 0;
    } else {
      content.style.transform = `translateY(-50%) translateX(100%)`;
      line.style.opacity = 1;
    }
  }
});

function hideSideMenu() {
  content.style.transform = `translateY(-50%) translateX(100%)`;
  line.style.opacity = 1;
}
