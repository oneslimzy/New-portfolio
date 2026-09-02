// EDIT HERE: Upload an MP4 video and its cover image to your GitHub project,
// then use paths like 'videos/launch-film.mp4' and 'images/launch-cover.jpg'.
// This uses the browser's built-in video player, so visitors play the film on
// your website without going to YouTube.
const motionProjects = [
  { number: '01', title: 'Zidi AI Assistant', type: 'Explainer video', description: 'A clear, engaging product story that makes the Zidi AI experience easy to understand.', year: '2026', color: '#5f78d4', category: 'motion', videoUrl: 'videos/zidi-ai-assistant.mp4', posterUrl: 'images/zidi-ai-assistant-poster.jpg' },
  { number: '02', title: 'Axentra', type: 'Product promo video', description: 'A cinematic product promo that brings the Axentra trading platform to life through dynamic interface motion and focused visual pacing.', year: '2026', color: '#cc6de4', category: 'motion', videoUrl: 'videos/axentra.mp4', posterUrl: 'images/axentra-poster.jpg' },
  { number: '03', title: 'SAG USSD', type: 'Product walkthrough', description: 'A guided feature video showing users how to access and use the SAG USSD service with ease.', year: '2026', color: '#e4b93d', category: 'motion', videoUrl: 'videos/sag-ussd.mp4', posterUrl: 'images/sag-ussd-poster.jpg' }
];

// Featured branding work. Each card uses its real Behance cover image and
// opens the matching project page, not just your Behance profile.
const brandProjects = [
  { number: '05', title: 'Paiflo Brand Identity', type: 'Brand identity', description: 'A considered brand identity designed to make Paiflo feel clear, credible and approachable.', year: '2026', color: '#dae0f0', ink: '#283866', mark: 'P', category: 'brand', imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/af4bb5252721867.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png', behanceUrl: 'https://www.behance.net/gallery/252721867/Paiflo-Brand-Identity' },
  { number: '06', title: 'Bofal Business Hub', type: 'Logo identity', description: 'A clear logo identity created for a capable, business-focused brand with room to grow.', year: '2026', color: '#688e68', ink: '#f3f5e7', mark: 'B', category: 'brand', imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/6e7065252708315.Y3JvcCwxMjg4LDEwMDgsMTIxLDA.png', behanceUrl: 'https://www.behance.net/gallery/252708315/Bofal-Business-Hub-Logo-Identity' },
  { number: '07', title: 'Hevm Branding', type: 'Brand identity', description: 'A distinctive brand system with bold visual cues and a confident, flexible digital presence.', year: '2026', color: '#775ec7', ink: '#ffffff', mark: 'H', category: 'brand', imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/d0bc35229475243.Y3JvcCwyODEwLDIxOTgsMzQ3LDA.jpg', behanceUrl: 'https://www.behance.net/gallery/229475243/Hevm-Branding' },
  { number: '08', title: 'Defiscan Brand Design', type: 'Brand identity', description: 'A focused visual identity created to make Defiscan stand out with clarity and energy.', year: '2026', color: '#e5b726', ink: '#211e14', mark: 'D', category: 'brand', imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/541e79229474823.Y3JvcCwxMTIxLDg3NiwxMzgsMA.jpg', behanceUrl: 'https://www.behance.net/gallery/229474823/Defiscan-Brand-Design' },
  { number: '09', title: 'Web3 Designs', type: 'Campaign / Digital design', description: 'A bold set of Web3 visuals designed to make complex ideas feel engaging across digital touchpoints.', year: '2026', color: '#4f6fc6', ink: '#ffffff', mark: 'W', category: 'campaign', imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/4f04e0237302517.Y3JvcCw4MDgsNjMyLDAsMA.png', behanceUrl: 'https://www.behance.net/gallery/237302517/Web3-Designs' },
  { number: '10', title: 'Social Media Design', type: 'Campaign / Social design', description: 'A versatile social media design system built for quick recognition, clear messaging and consistent content.', year: '2026', color: '#de5d64', ink: '#ffffff', mark: 'S', category: 'campaign', imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/b94c99235236261.Y3JvcCw4MDgsNjMyLDAsMA.png', behanceUrl: 'https://www.behance.net/gallery/235236261/Social-Media-design' }
];

document.documentElement.classList.add('js');
const workGrid = document.querySelector('#work-grid');
const motionTemplate = document.querySelector('#motion-card-template');
motionProjects.forEach((project) => {
  const card = motionTemplate.content.cloneNode(true);
  const visual = card.querySelector('.video-visual');
  const video = card.querySelector('video');
  const startButton = card.querySelector('.video-start');
  card.querySelector('.motion-project').dataset.category = project.category;
  visual.style.setProperty('--project-color', project.color);
  if (project.posterUrl) video.poster = project.posterUrl;
  if (project.videoUrl) {
    video.src = project.videoUrl;
    if (!project.posterUrl) {
      video.addEventListener('loadeddata', () => {
        video.currentTime = Math.min(.1, Math.max(0, video.duration - .1));
      }, { once: true });
    }
  } else {
    visual.classList.add('video-not-ready');
    video.hidden = true;
    startButton.hidden = true;
  }
  card.querySelector('.project-number').textContent = project.number;
  card.querySelector('h3').textContent = project.title;
  card.querySelector('p').textContent = project.type;
  card.querySelector('.project-description').textContent = project.description;
  card.querySelector('.project-year').textContent = project.year;
  startButton.addEventListener('click', () => {
    video.play();
    startButton.hidden = true;
  });
  video.addEventListener('play', () => { startButton.hidden = true; });
  video.addEventListener('pause', () => { if (!video.ended) startButton.hidden = false; });
  workGrid.appendChild(card);
});

const brandTemplate = document.querySelector('#brand-card-template');
brandProjects.forEach((project) => {
  const card = brandTemplate.content.cloneNode(true);
  const art = card.querySelector('.brand-visual');
  const link = card.querySelector('.brand-project-link');
  card.querySelector('.brand-project').dataset.category = project.category;
  art.style.setProperty('--brand-color', project.color); art.style.setProperty('--brand-ink', project.ink); art.dataset.mark = project.mark;
  if (project.imageUrl) {
    art.style.backgroundImage = `url("${project.imageUrl}")`;
    art.classList.add('has-brand-image');
  }
  link.href = project.behanceUrl;
  art.querySelector('span').textContent = project.type;
  card.querySelector('.project-number').textContent = project.number;
  card.querySelector('h3').textContent = project.title;
  card.querySelector('p').textContent = project.type;
  card.querySelector('.project-description').textContent = project.description;
  card.querySelector('.project-year').textContent = project.year;
  workGrid.appendChild(card);
});

document.querySelectorAll('.work-filters button').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleProjects = 0;
    document.querySelectorAll('.work-filters button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', active);
    });
    document.querySelectorAll('.portfolio-card').forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleProjects += 1;
    });
    document.querySelector('#filter-empty').hidden = visibleProjects !== 0;
  });
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: .08 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('.menu-toggle').addEventListener('click', (event) => { const nav = document.querySelector('.site-nav'); const open = nav.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', open); });
document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => document.querySelector('.site-nav').classList.remove('open')));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#project-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('.send-button');
  const originalLabel = button.innerHTML;
  const formspreeEndpoint = 'https://formspree.io/f/mykrzzja';

  button.disabled = true;
  button.textContent = 'Sending...';

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Form submission failed');
    form.reset();
    button.textContent = 'Enquiry sent ✓';
  } catch (error) {
    button.textContent = 'Try again';
  }

  window.setTimeout(() => {
    button.disabled = false;
    button.innerHTML = originalLabel;
  }, 3000);
});
