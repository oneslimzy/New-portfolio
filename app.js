const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const projectLink = project => `project.html?project=${encodeURIComponent(project.id)}`;
const icon = (name, className = 'arrow-icon') => `<svg class="ui-icon ${className}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;

function updateClock(){
  document.querySelectorAll('.clock time').forEach(element => {
    element.textContent = new Intl.DateTimeFormat('en-GB', {timeZone:'Africa/Lagos',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());
  });
}
updateClock();
setInterval(updateClock, 1000);
document.querySelectorAll('[data-year]').forEach(element => element.textContent = new Date().getFullYear());

function card(project){
  if(project.video){
    return `<article class="project-card video-card">
      <div class="card-image inline-player">
        <video playsinline preload="none" poster="${escapeHTML(project.cover)}" aria-label="${escapeHTML(project.title)} video"><source src="${escapeHTML(project.video)}" type="video/mp4"></video>
        <button class="inline-play" type="button" aria-label="Play ${escapeHTML(project.title)}"><span class="play-disc" aria-hidden="true">${icon('play','play-icon')}</span><span>PLAY VIDEO</span></button>
      </div>
      <div class="card-meta"><div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.type)}</p></div><a class="case-study-link" href="${projectLink(project)}" aria-label="View ${escapeHTML(project.title)} case study">VIEW CASE STUDY ${icon('arrow-up-right')}</a></div>
      <p class="playback-status" role="status" hidden></p>
    </article>`;
  }
  return `<a class="project-card" href="${escapeHTML(project.behance)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHTML(project.title)} on Behance">
    <div class="card-image"><img src="${escapeHTML(project.cover)}" alt="${escapeHTML(project.title)} — ${escapeHTML(project.type)}" loading="lazy" width="808" height="505"><span class="card-arrow" aria-hidden="true">${icon('arrow-up-right')}</span></div>
    <div class="card-meta"><div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.type)}</p></div><span>VIEW ON BEHANCE ${icon('arrow-up-right')}</span></div>
  </a>`;
}

document.querySelectorAll('[role=tabpanel]').forEach(panel => {
  panel.innerHTML = projects.filter(project => `${project.category}-panel` === panel.id).map(card).join('');
});

document.querySelectorAll('.video-card').forEach(cardElement => {
  const video = cardElement.querySelector('video');
  const button = cardElement.querySelector('.inline-play');
  const status = cardElement.querySelector('.playback-status');
  button.addEventListener('click', async () => {
    button.hidden = true;
    video.controls = true;
    status.hidden = true;
    try { await video.play(); }
    catch(error){
      if(error.name === 'AbortError') return;
      status.textContent = 'Playback could not start. Try the video controls or open the case study.';
      status.hidden = false;
    }
  });
  video.addEventListener('play', () => {
    button.hidden = true;
    status.hidden = true;
    document.querySelectorAll('.inline-player video').forEach(other => { if(other !== video) other.pause(); });
  });
  video.addEventListener('error', () => {
    status.textContent = 'This video could not load. Please refresh the page and try again.';
    status.hidden = false;
  });
});

const tabs = [...document.querySelectorAll('[role=tab]')];
const faqItems = [...document.querySelectorAll('.questions details')];
faqItems.forEach(item => item.addEventListener('toggle', () => {
  if(item.open) faqItems.forEach(other => { if(other !== item) other.open = false; });
}));

function selectTab(tab){
  tabs.forEach(tabItem => {
    const selected = tabItem === tab;
    tabItem.setAttribute('aria-selected', String(selected));
    tabItem.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(tabItem.getAttribute('aria-controls'));
    panel.hidden = !selected;
    if(!selected) panel.querySelectorAll('video').forEach(video => video.pause());
  });
  try { sessionStorage.setItem('slimzy-new-work', tab.dataset.category); } catch {}
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if(event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
    if(event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
    if(event.key === 'Home') next = tabs[0];
    if(event.key === 'End') next = tabs[tabs.length - 1];
    if(next){ event.preventDefault(); selectTab(next); next.focus(); }
  });
});
try {
  const saved = sessionStorage.getItem('slimzy-new-work');
  const savedTab = tabs.find(tab => tab.dataset.category === saved);
  if(savedTab) selectTab(savedTab);
} catch {}

const caseRoot = document.getElementById('case');
if(caseRoot){
  const id = new URLSearchParams(location.search).get('project');
  const project = projects.find(item => item.id === id);
  if(!project){
    caseRoot.innerHTML = `<h1>Project not found.</h1><p>Explore the portfolio to find a project.</p><a class="button" href="index.html#work">BACK TO SELECTED WORK ${icon('arrow-up-right')}</a>`;
  } else {
    document.title = `${project.title} — Slimzy Concept`;
    const videoProjects = projects.filter(item => item.video);
    const currentVideoIndex = videoProjects.findIndex(item => item.id === project.id);
    const next = currentVideoIndex >= 0 ? videoProjects[(currentVideoIndex + 1) % videoProjects.length] : projects[(projects.indexOf(project) + 1) % projects.length];
    const sections = (project.sections || []).map(section => `<section class="case-text"><h2>${escapeHTML(section.title)}</h2><p>${escapeHTML(section.copy)}</p></section>`).join('');
    caseRoot.innerHTML = `
      <a class="back-link" href="index.html#work">${icon('arrow-left')} ALL SELECTED WORK</a>
      <div class="case-heading"><p class="eyebrow">${escapeHTML(project.category.toUpperCase())} / PROJECT NOTES</p><h1>${escapeHTML(project.title)}</h1><p class="case-intro">${escapeHTML(project.intro)}</p></div>
      <div class="case-meta"><div><span>DISCIPLINE</span>${escapeHTML(project.type)}</div><div><span>DESIGNER</span>Slimzy Concept</div>${project.duration ? `<div><span>RUN TIME</span>${escapeHTML(project.duration)}</div>` : ''}</div>
      <div class="case-media">${project.video ? `<video controls playsinline preload="metadata" poster="${escapeHTML(project.cover)}"><source src="${escapeHTML(project.video)}" type="video/mp4">Your browser cannot play this video. <a href="${escapeHTML(project.video)}">Open the video</a>.</video>` : `<img src="${escapeHTML(project.cover)}" alt="${escapeHTML(project.title)} identity project" width="808" height="632">`}</div>
      <div class="case-notes">${sections}</div>
      <div class="case-actions">${project.behance ? `<a class="button primary" href="${escapeHTML(project.behance)}" target="_blank" rel="noopener noreferrer">FULL PROJECT ON BEHANCE ${icon('arrow-up-right')}</a>` : ''}<a class="button" href="index.html#contact">HAVE A SIMILAR PROJECT? ${icon('arrow-up-right')}</a></div>
      <a class="next-project" href="${projectLink(next)}"><div><span>NEXT VIDEO</span><strong>${escapeHTML(next.title)}</strong></div>${icon('arrow-up-right','next-icon')}</a>`;
  }
}
