/* ═══════════════════════════════════════════════
   PERE LLUÍS LEÓN — main.js
═══════════════════════════════════════════════ */
'use strict';

/* ── LOADER ── */
function initLoader() {
  const el = document.getElementById('loader');
  if (!el) return;
  window.addEventListener('load', () => {
    setTimeout(() => { el.classList.add('gone'); setTimeout(() => el.remove(), 900); }, 900);
  });
}

/* ── CURSOR ── */
function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  });
  (function loop(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,.work-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));
  });
}

/* ── PAGE TRANSITIONS ── */
function initTransitions() {
  const veil = document.querySelector('.page-veil');
  if (!veil) return;
  // Reveal on load
  requestAnimationFrame(()=>{ veil.classList.add('out'); setTimeout(()=>veil.classList.remove('out'),600); });
  document.querySelectorAll('a[href]').forEach(a=>{
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http')) return;
    a.addEventListener('click', e=>{
      e.preventDefault();
      veil.classList.remove('out');
      veil.classList.add('in');
      setTimeout(()=>{ window.location=href; }, 520);
    });
  });
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('on'); obs.unobserve(en.target); } });
  }, { threshold:.1, rootMargin:'0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

/* ── NAV ── */
function initNav() {
  // Active link
  const page = location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if((a.getAttribute('href')||'').includes(page)) a.classList.add('active');
  });
  // Hamburger
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if(!toggle||!links) return;
  toggle.addEventListener('click',()=>{
    const open = links.classList.toggle('open');
    const [s1,,s3] = toggle.querySelectorAll('span');
    toggle.querySelector('span:nth-child(1)').style.transform = open?'translateY(6px) rotate(45deg)':'';
    toggle.querySelector('span:nth-child(2)').style.opacity   = open?'0':'1';
    toggle.querySelector('span:nth-child(3)').style.transform = open?'translateY(-6px) rotate(-45deg)':'';
  });
}

/* ── SLIDESHOW ── */
function initSlideshow() {
  const slides  = [...document.querySelectorAll('.slide')];
  const dots    = [...document.querySelectorAll('.dot')];
  const counter = document.querySelector('.slide-counter');
  if(!slides.length) return;
  let cur=0, timer;

  function go(n){
    slides[cur].classList.remove('active');
    dots[cur]?.classList.remove('active');
    cur=(n+slides.length)%slides.length;
    slides[cur].classList.add('active');
    dots[cur]?.classList.add('active');
    if(counter) counter.innerHTML=`<strong>${String(cur+1).padStart(2,'0')}</strong> / ${String(slides.length).padStart(2,'0')}`;
  }
  const next=()=>go(cur+1);
  const prev=()=>go(cur-1);
  function start(){ clearInterval(timer); timer=setInterval(next,5500); }

  document.querySelector('.arrow-next')?.addEventListener('click',()=>{next();start();});
  document.querySelector('.arrow-prev')?.addEventListener('click',()=>{prev();start();});
  dots.forEach((d,i)=>d.addEventListener('click',()=>{go(i);start();}));
  document.addEventListener('keydown',e=>{ if(e.key==='ArrowRight'){next();start();} if(e.key==='ArrowLeft'){prev();start();} });

  let tx=0;
  const ss=document.querySelector('.slideshow');
  ss?.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
  ss?.addEventListener('touchend',e=>{ const dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>50){dx<0?next():prev();start();} },{passive:true});

  go(0); start();
}

/* ── GALLERY FILTER ── */
function initFilter() {
  const btns  = [...document.querySelectorAll('.filter-btn')];
  const cards = [...document.querySelectorAll('.work-card')];
  if(!btns.length) return;
  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;
      cards.forEach(c=>{ c.style.display=(f==='all'||c.dataset.status===f)?'':'none'; });
    });
  });
}

/* ── LIGHTBOX ── */
let lbIdx=0;

function initLightbox(){
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  if(!lb) return;

  function allCards(){ return [...document.querySelectorAll('.work-card')]; }
  function visible(){ return allCards().filter(c=>c.style.display!=='none'); }

  function open(i){
    lbIdx = i;
    const cards = visible();
    const card  = cards[i];
    if(!card) return;

    // Read data directly from the card's own img and data attributes
    const img   = card.querySelector('img');
    const src   = img ? img.src : '';
    const title = card.dataset.title  || img?.alt || '';
    const dims  = card.dataset.dims   || '';
    const price = card.dataset.price  || '';
    const sold  = card.dataset.status === 'sold';

    lbImg.src = src;
    lbImg.alt = title;

    const set = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
    set('lb-htitle', title);
    set('lb-title',  title);
    set('lb-dims',   dims);
    set('lb-price',  sold ? '—' : price);

    const cta = document.getElementById('lb-cta');
    if(cta) cta.style.display = sold ? 'none' : 'block';

    const cnt = document.getElementById('lb-counter');
    if(cnt) cnt.textContent = `${i+1} / ${cards.length}`;

    lb.classList.add('open');
    requestAnimationFrame(()=>lb.classList.add('vis'));
  }

  function close(){ lb.classList.remove('vis'); setTimeout(()=>lb.classList.remove('open'),380); }
  function nav(d){ const c=visible(); lbIdx=(lbIdx+d+c.length)%c.length; open(lbIdx); }

  // Bind each card — store its index among visible cards at click time
  allCards().forEach(card=>{
    card.addEventListener('click', ()=>{
      const idx = visible().indexOf(card);
      if(idx !== -1) open(idx);
    });
  });

  document.getElementById('lb-close')?.addEventListener('click', close);
  document.getElementById('lb-prev')?.addEventListener('click', ()=>nav(-1));
  document.getElementById('lb-next')?.addEventListener('click', ()=>nav(1));
  lb.addEventListener('click', e=>{ if(e.target===lb) close(); });
  document.addEventListener('keydown', e=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape')     close();
    if(e.key==='ArrowRight') nav(1);
    if(e.key==='ArrowLeft')  nav(-1);
  });
}

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded',()=>{
  initLoader();
  initCursor();
  initTransitions();
  initReveal();
  initNav();
  initSlideshow();
  initFilter();
  initLightbox();
});
