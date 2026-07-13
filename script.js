// EDIT HERE: replace each embedUrl with your YouTube, Vimeo or Drive embed URL.
// Example YouTube: https://www.youtube.com/embed/VIDEO_ID?autoplay=1
// Example Vimeo: https://player.vimeo.com/video/VIDEO_ID?autoplay=1
// YouTube covers are selected automatically. For Vimeo or a self-hosted video,
// add thumbnailUrl: 'images/your-cover.webp' to that project.

const motionProjects = [
  {
    number: '01',
    title: 'Zidi AI Assitant',
    type: 'Explainer Video / 2026',
    color: '#e94924',
    embedUrl: 'https://www.youtube.com/embed/lbR9eU14EFk?autoplay=1'
  },
  {
    number: '02',
    title: 'Promo Energy',
    type: 'Promotional video / 2026',
    color: '#3577db',
    embedUrl: ''
  },
  {
    number: '03',
    title: 'Social Motion',
    type: 'Launch Video / 2026',
    color: '#ebbf28',
    embedUrl: ''
  },
  {
    number: '04',
    title: 'Brand in Motion',
    type: 'Motion system / 2025',
    color: '#9e8be5',
    embedUrl: ''
  }
];

const brandProjects = [
  {
    title: 'Aestus Relay',
    type: 'Brand Identity / direction',
    color: '#cf4427',
    ink: '#1b1a19',
    mark: 'O',
    imageUrl: 'image/Artboard 25.jpg'
  },
  {
    title: 'Ziba Cafe',
    type: 'Logo Identity / Packaging',
    color: '#123f34',
    ink: '#e9e5dc',
    mark: '2',
    imageUrl: 'image/Ziba Menu Mockup.png'
  },
  {
    title: 'Bofal Business Hub',
    type: 'Logo Identity',
    color: '#e7ca24',
    ink: '#151614',
    mark: 'S',
    imageUrl: 'image/Bofal Colored.png'
  },
  {
    title: 'Hevm',
    type: 'Brand identity',
    color: '#7e63c9',
    ink: '#ffffff',
    mark: '4',
    imageUrl: 'image/Hevm.jpg'
  },
  {
    title: 'Paiflo Fintech',
    type: 'Brand Identity',
    color: '#e9e5dc',
    ink: '#151614',
    mark: 'V',
    imageUrl: 'image/manique tshirt'
  },
  {
    title: 'Defiscan',
    type: 'Art direction',
    color: '#f05b36',
    ink: '#151614',
    mark: '6',
    imageUrl: 'image/Defiscan.jpg'
  }
];

document.documentElement.classList.add('js');

const motionGrid = document.querySelector('#motion-grid');
const motionTemplate = document.querySelector('#motion-card-template');

function getYouTubeThumbnail(url) {
  if (!url) return '';

  const match = url.match(
    /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/
  );

  return match
    ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
    : '';
}

motionProjects.forEach((project) => {
  const card = motionTemplate.content.cloneNode(true);
  const button = card.querySelector('.video-button');
  const poster = card.querySelector('.video-poster');

  const thumbnail = project.thumbnailUrl || getYouTubeThumbnail(project.embedUrl);

  poster.style.setProperty('--card-color', project.color);

  if (thumbnail) {
    poster.style.backgroundImage = `url("${thumbnail}")`;
    poster.classList.add('has-thumbnail');
  }

  card.querySelector('.work-index').textContent = project.number;
  card.querySelector('h3').textContent = project.title;
  card.querySelector('p').textContent = project.type;
  card.querySelector('.work-details span').textContent =
    project.embedUrl ? 'Watch →' : 'Add link';

  button.addEventListener('click', () => openVideo(project));
  motionGrid.appendChild(card);
});

const brandGrid = document.querySelector('#brand-grid');
const brandTemplate = document.querySelector('#brand-card-template');

brandProjects.forEach((project) => {
  const card = brandTemplate.content.cloneNode(true);
  const art = card.querySelector('.brand-art');

  art.style.setProperty('--brand-color', project.color);
  art.style.setProperty('--brand-ink', project.ink);
  art.dataset.mark = project.mark;

  if (project.imageUrl) {
    art.style.backgroundImage = `url("${project.imageUrl}")`;
    art.classList.add('has-brand-image');
  }

  art.querySelector('span').textContent = project.type;
  card.querySelector('h3').textContent = project.title;
  card.querySelector('p').textContent = project.type;

  brandGrid.appendChild(card);
});

// Duplicate frames so the wall loops smoothly.
brandGrid.innerHTML += brandGrid.innerHTML;

const modal = document.querySelector('#video-modal');
const frame = modal.querySelector('.video-frame');

function openVideo(project) {
  if (!project.embedUrl) {
    alert(`Add the embed link for "${project.title}" in script.js to play it here.`);
    return;
  }

  frame.innerHTML = `
    <iframe
      src="${project.embedUrl}"
      title="${project.title}"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen>
    </iframe>
  `;

  modal.showModal();
}

function closeVideo() {
  modal.close();
  frame.innerHTML = '';
}

document.querySelector('.close-modal').addEventListener('click', closeVideo);

modal.addEventListener('click', (event) => {
  if (event.target === modal) closeVideo();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const nav = document.querySelector('.site-nav');
  const open = nav.classList.toggle('open');

  event.currentTarget.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.site-nav').classList.remove('open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#project-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  const subject = encodeURIComponent(
    `${data.get('type')} project enquiry from ${data.get('name')}`
  );

  const body = encodeURIComponent(
    `Name: ${data.get('name')}
Email: ${data.get('email')}
Project type: ${data.get('type')}
Timeline: ${data.get('timeline')}

Project details:
${data.get('details')}`
  );

  window.location.href =
    `mailto:slimzyconcept@gmail.com?subject=${subject}&body=${body}`;
});
