// EDIT HERE: replace each embedUrl with your YouTube, Vimeo or Drive embed URL.
// Example YouTube: https://www.youtube.com/embed/VIDEO_ID?autoplay=1
// Example Vimeo: https://player.vimeo.com/video/VIDEO_ID?autoplay=1
const motionProjects = [
  { number: '01', title: 'Launch Film', type: 'Product launch / 2025', color: '#e94924', embedUrl: '' },
  { number: '02', title: 'Promo Energy', type: 'Promotional video / 2025', color: '#3577db', embedUrl: '' },
  { number: '03', title: 'Social Motion', type: 'Campaign content / 2025', color: '#ebbf28', embedUrl: '' },
  { number: '04', title: 'Brand in Motion', type: 'Motion system / 2025', color: '#9e8be5', embedUrl: '' }
];

const brandProjects = [
  { title: 'Project One', type: 'Identity / Art direction', color: '#cf4427', ink: '#1b1a19', mark: 'O' },
  { title: 'Project Two', type: 'Packaging / Identity', color: '#123f34', ink: '#e9e5dc', mark: '2' },
  { title: 'Project Three', type: 'Campaign / Digital', color: '#e7ca24', ink: '#151614', mark: 'S' },
  { title: 'Project Four', type: 'Visual identity', color: '#7e63c9', ink: '#ffffff', mark: '4' },
  { title: 'Project Five', type: 'Editorial design', color: '#e9e5dc', ink: '#151614', mark: 'V' },
  { title: 'Project Six', type: 'Art direction', color: '#f05b36', ink: '#151614', mark: '6' }
];

document.documentElement.classList.add('js');
const motionGrid = document.querySelector('#motion-grid');
const motionTemplate = document.querySelector('#motion-card-template');
motionProjects.forEach((project) => {
  const card = motionTemplate.content.cloneNode(true);
  const button = card.querySelector('.video-button');
  card.querySelector('.video-poster').style.setProperty('--card-color', project.color);
  card.querySelector('.work-index').textContent = project.number;
  card.querySelector('h3').textContent = project.title;
  card.querySelector('p').textContent = project.type;
  card.querySelector('.work-details span').textContent = project.embedUrl ? 'Watch ↗' : 'Add link';
  button.addEventListener('click', () => openVideo(project));
  motionGrid.appendChild(card);
});

const brandGrid = document.querySelector('#brand-grid');
const brandTemplate = document.querySelector('#brand-card-template');
brandProjects.forEach((project) => {
  const card = brandTemplate.content.cloneNode(true);
  const art = card.querySelector('.brand-art');
  art.style.setProperty('--brand-color', project.color); art.style.setProperty('--brand-ink', project.ink); art.dataset.mark = project.mark;
  art.querySelector('span').textContent = project.type;
  card.querySelector('h3').textContent = project.title;
  card.querySelector('p').textContent = project.type;
  brandGrid.appendChild(card);
});
// A duplicate sequence makes the frame wall loop continuously without a visible jump.
brandGrid.innerHTML += brandGrid.innerHTML;

const modal = document.querySelector('#video-modal');
const frame = modal.querySelector('.video-frame');
function openVideo(project) {
  if (!project.embedUrl) { alert(`Add the embed link for “${project.title}” in script.js to play it here.`); return; }
  frame.innerHTML = `<iframe src="${project.embedUrl}" title="${project.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  modal.showModal();
}
function closeVideo() { modal.close(); frame.innerHTML = ''; }
document.querySelector('.close-modal').addEventListener('click', closeVideo);
modal.addEventListener('click', (event) => { if (event.target === modal) closeVideo(); });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: .08 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('.menu-toggle').addEventListener('click', (event) => { const nav = document.querySelector('.site-nav'); const open = nav.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', open); });
document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => document.querySelector('.site-nav').classList.remove('open')));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#project-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`${data.get('type')} project enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject type: ${data.get('type')}\nTimeline: ${data.get('timeline')}\n\nProject details:\n${data.get('details')}`);
  window.location.href = `mailto:slimzyconcept@gmail.com?subject=${subject}&body=${body}`;
});
