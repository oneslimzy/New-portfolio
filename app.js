const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const projectLink = p => `project.html?project=${encodeURIComponent(p.id)}`;
function updateClock(){document.querySelectorAll('.clock time').forEach(el=>{el.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());});}
updateClock();setInterval(updateClock,1000);
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
function card(p){
  if(p.video) return `<article class="project-card video-card"><div class="card-image inline-player"><video playsinline preload="none" poster="${escapeHTML(p.cover)}" aria-label="${escapeHTML(p.title)} video"><source src="${escapeHTML(p.video)}" type="video/mp4"></video><button class="inline-play" type="button" aria-label="Play ${escapeHTML(p.title)}"><span aria-hidden="true">▶</span><span>PLAY FILM</span></button></div><div class="card-meta"><div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.type)}</p></div><a class="case-study-link" href="${projectLink(p)}" aria-label="View ${escapeHTML(p.title)} case study">VIEW CASE STUDY ↗</a></div><p class="playback-status" role="status" hidden></p></article>`;
  return `<a class="project-card" href="${escapeHTML(p.behance)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHTML(p.title)} on Behance"><div class="card-image"><img src="${escapeHTML(p.cover)}" alt="${escapeHTML(p.title)} — ${escapeHTML(p.type)}" loading="lazy" width="808" height="505"><span class="card-arrow" aria-hidden="true">↗</span></div><div class="card-meta"><div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.type)}</p></div><span>VIEW ON BEHANCE ↗</span></div></a>`;
}
document.querySelectorAll('[role=tabpanel]').forEach(panel=>{panel.innerHTML=projects.filter(p=>`${p.category}-panel`===panel.id).map(card).join('');});
document.querySelectorAll('.video-card').forEach(card=>{
  const video=card.querySelector('video');
  const button=card.querySelector('.inline-play');
  const status=card.querySelector('.playback-status');
  button.addEventListener('click',async()=>{
    button.hidden=true;
    video.controls=true;
    status.hidden=true;
    try{await video.play();}catch(error){
      if(error.name==='AbortError')return;
      status.textContent='Playback could not start. Try the video controls or open the case study.';
      status.hidden=false;
    }
  });
  video.addEventListener('play',()=>{
    button.hidden=true;
    status.hidden=true;
    document.querySelectorAll('.inline-player video').forEach(other=>{if(other!==video)other.pause();});
  });
  video.addEventListener('error',()=>{status.textContent='This video could not load. Please refresh the page and try again.';status.hidden=false;});
});
const tabs=[...document.querySelectorAll('[role=tab]')];
// Also support exclusive FAQs in browsers without native details grouping.
const faqItems=[...document.querySelectorAll('.questions details')];
faqItems.forEach(item=>item.addEventListener('toggle',()=>{
  if(item.open) faqItems.forEach(other=>{if(other!==item)other.open=false;});
}));
function selectTab(tab){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;const panel=document.getElementById(t.getAttribute('aria-controls'));panel.hidden=!selected;if(!selected)panel.querySelectorAll('video').forEach(video=>video.pause());});try{sessionStorage.setItem('slimzy-new-work',tab.dataset.category);}catch{}}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=tabs[(index+1)%tabs.length];if(event.key==='ArrowLeft')next=tabs[(index-1+tabs.length)%tabs.length];if(event.key==='Home')next=tabs[0];if(event.key==='End')next=tabs[tabs.length-1];if(next){event.preventDefault();selectTab(next);next.focus();}});});
try{const saved=sessionStorage.getItem('slimzy-new-work');const tab=tabs.find(t=>t.dataset.category===saved);if(tab)selectTab(tab);}catch{}
const caseRoot=document.getElementById('case');
if(caseRoot){const id=new URLSearchParams(location.search).get('project');const p=projects.find(p=>p.id===id);if(!p){caseRoot.innerHTML='<h1>Project not found.</h1><p>Explore the portfolio to find a project.</p><a class="button" href="index.html#work">BACK TO SELECTED WORK ↗</a>';}else{document.title=`${p.title} — Slimzy Concept`;const next=projects[(projects.indexOf(p)+1)%projects.length];caseRoot.innerHTML=`<a class="back-link" href="index.html#work">← ALL SELECTED WORK</a><div class="case-heading"><p class="eyebrow">${escapeHTML(p.category.toUpperCase())} / PROJECT NOTES</p><h1>${escapeHTML(p.title)}</h1><p class="case-intro">${escapeHTML(p.intro)}</p></div><div class="case-meta"><div><span>DISCIPLINE</span>${escapeHTML(p.type)}</div><div><span>DESIGNER</span>Slimzy Concept</div></div><div class="case-media">${p.video?`<video controls playsinline preload="metadata" poster="${escapeHTML(p.cover)}"><source src="${escapeHTML(p.video)}" type="video/mp4">Your browser cannot play this video. <a href="${escapeHTML(p.video)}">Open the film</a>.</video>`:`<img src="${escapeHTML(p.cover)}" alt="${escapeHTML(p.title)} identity project" width="808" height="632">`}</div><section class="case-text"><h2>The project.</h2><p>${escapeHTML(p.overview)}</p></section><section class="case-text"><h2>The design focus.</h2><p>${escapeHTML(p.focus)}</p></section><section class="case-text"><h2>The work.</h2><p>${escapeHTML(p.format)}.${p.behance?' Explore the complete visual presentation and brand applications on Behance.':' Watch the finished film above to explore the visual direction, pacing and product story.'}</p></section><div class="case-actions">${p.behance?`<a class="button primary" href="${escapeHTML(p.behance)}" target="_blank" rel="noopener noreferrer">FULL PROJECT ON BEHANCE ↗</a>`:''}<a class="button" href="index.html#contact">HAVE A SIMILAR PROJECT? ↗</a></div><a class="next-project" href="${projectLink(next)}"><div><span>NEXT PROJECT</span><strong>${escapeHTML(next.title)}</strong></div><i aria-hidden="true">↗</i></a>`;}}
