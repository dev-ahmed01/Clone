/* WE gallery controller port: original Workspace by Emlen thumbnail/dock/transitions logic.
 * Accom adapter uses existing illustrative Kingston images and preserves video disclaimers.
 * Source: dev-ahmed01/WE public/assets/js/workspaces-1.04e742d747.js
 */
(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const esc=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const assets=typeof embeddedAssets!=='undefined'?embeddedAssets:{};
const photo=(name)=>assets['assets/'+name]||'';
const gallery={
  'All Photos':[
   [photo('hero-bedroom.webp'),'En suite bedroom · illustrative'],
   [photo('lounge-room.webp'),'Resident lounge · illustrative'],
   [photo('studio-room.webp'),'Studio room · illustrative'],
   [photo('study-space.webp'),'Study spaces · illustrative'],
   [photo('building.webp'),'Building exterior · illustrative'],
   [photo('hero-suite.webp'),'Studio interior · illustrative'],
   [photo('ensuite-second.webp'),'En suite room details · illustrative']
  ],
  'En suites':[
   [photo('hero-bedroom.webp'),'En suite bedroom · illustrative'],
   [photo('ensuite-second.webp'),'En suite room details · illustrative']
  ],
  'Studios':[
   [photo('studio-room.webp'),'Studio room · illustrative'],
   [photo('hero-suite.webp'),'Studio interior · illustrative']
  ],
  'Shared spaces':[
   [photo('lounge-room.webp'),'Resident lounge · illustrative'],
   [photo('study-space.webp'),'Study spaces · illustrative']
  ],
  'Exterior':[[photo('building.webp'),'Building exterior · illustrative']]
};
let galleryCategory='All Photos';
{ /* ===== Section 2 — Photos: grid + categorized lightbox ===== */
const reduceG=matchMedia('(prefers-reduced-motion: reduce)');
const CATS=[['All Photos','All photos'],['En suites','En suites'],['Studios','Studios'],['Shared spaces','Shared spaces'],['Exterior','Exterior'],['Videos & 3D','Videos & 3D']];
const SHORT=Object.fromEntries(CATS);
const EASE='cubic-bezier(.22,1,.36,1)';
let cat='All Photos',idx=0,isOpen=false,token=0,lastFocus=null,hideTimer=0,bgFlip=false,bgSrc='';
const root=$('#weGal'),grid=$('#weGalGrid'),lb=$('#lightbox'),gDock=$('#gDock'),lbDock=$('#lbDock');
const img=$('#lbImg'),frame=$('#lbFrame'),stage=$('#lbStage'),thumbs=$('#lbThumbs');
const bgs=[$('#lbBgA'),$('#lbBgB')];
const pad=n=>String(n).padStart(2,'0');

/* ---- category dock (one component, two places) ---- */
const docks=[gDock,lbDock];
docks.forEach(el=>{
  el.innerHTML='<span class="we-dock__thumb" aria-hidden="true"></span>'+CATS.map(([k,l])=>`<button type="button" data-cat="${esc(k)}" aria-pressed="false"><span>${esc(l)}</span></button>`).join('');
  el.addEventListener('click',e=>{const b=e.target.closest('button[data-cat]');if(b)setCat(b.dataset.cat);});
});
function syncDock(el,smooth){
  const thumb=el.firstElementChild;
  el.querySelectorAll('button').forEach(b=>{
    const on=b.dataset.cat===cat;b.setAttribute('aria-pressed',on?'true':'false');b.classList.toggle('is-on',on);
    if(on&&b.offsetWidth){
      thumb.style.setProperty('--tx',b.offsetLeft+'px');thumb.style.setProperty('--tw',b.offsetWidth+'px');
      if(el.scrollWidth>el.clientWidth+2)el.scrollTo({left:b.offsetLeft-(el.clientWidth-b.offsetWidth)/2,behavior:smooth&&!reduceG.matches?'smooth':'auto'});
    }
  });
}
const syncDocks=smooth=>docks.forEach(d=>syncDock(d,smooth));

/* ---- grid ---- */
grid.innerHTML=[0,1,2,3,4].map(i=>`<button type="button" class="we-tile" style="--i:${i}" data-i="${i}"><img decoding="async" alt=""></button>`).join('');
const tiles=[...grid.children];
function paintTile(t,i){
  const list=gallery[cat],p=list[i],im=t.firstElementChild;
  if(!p){t.hidden=true;im.removeAttribute('src');t.removeAttribute('aria-label');return;}
  t.hidden=false;im.src=p[0];im.alt='';
  t.setAttribute('aria-label',`Open ${p[1]} in the gallery (${SHORT[cat]}, photo ${i+1} of ${list.length})`);
}
function swapTiles(){
  tiles.forEach((t,i)=>{
    const im=t.firstElementChild;im.getAnimations().forEach(a=>a.cancel());
    if(reduceG.matches||!gallery[cat][i]){paintTile(t,i);return;}
    const out=im.animate([{opacity:1},{opacity:0}],{duration:130,easing:'ease-in',fill:'forwards'});
    out.onfinish=()=>{paintTile(t,i);im.animate([{opacity:0,transform:'scale(1.05)'},{opacity:1,transform:'scale(1)'}],{duration:420,delay:i*45,easing:EASE,fill:'backwards'});out.cancel();};
  });
}
tiles.forEach((t,i)=>{paintTile(t,i);t.addEventListener('click',()=>openLB(i,t));});

function setCat(k){
  if(k==='Videos & 3D'){
    // Use Accom's existing honest video/virtual-tour information viewer.
    if(isOpen)closeLB();
    setTimeout(()=>document.querySelector('#scrollNav [data-gallery-category="videos"]')?.click(),isOpen?360:0);
    return;
  }
  if(k===cat||!gallery[k]||!gallery[k].length)return;
  cat=k;galleryCategory=k;idx=0;
  grid.dataset.count=String(Math.min(5,gallery[cat].length));
  syncDocks(true);swapTiles();
  if(isOpen){buildThumbs();show(0,0);}
}

/* reveal on scroll */
if('IntersectionObserver' in window&&!reduceG.matches){
  const io=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;io.disconnect();root.classList.add('is-in');setTimeout(()=>root.classList.add('is-done'),1500);},{threshold:.12});
  io.observe(root);
}else root.classList.add('is-in','is-done');

/* ---- lightbox ---- */
function buildThumbs(){
  thumbs.innerHTML=gallery[cat].map((p,i)=>`<button type="button" class="we-lb__thumb" data-i="${i}" aria-label="Photo ${i+1}: ${esc(p[1])}"><img src="${p[0]}" alt=""></button>`).join('');
}
thumbs.addEventListener('click',e=>{const b=e.target.closest('.we-lb__thumb');if(!b)return;const i=+b.dataset.i;if(i!==idx)show(i,i>idx?1:-1);});
const CAP=2.4;
function fit(src){
  const w=src.naturalWidth,h=src.naturalHeight;if(!w||!h)return;
  const s=Math.min(frame.clientWidth/w,frame.clientHeight/h,CAP);
  img.style.width=Math.round(w*s)+'px';img.style.height=Math.round(h*s)+'px';
}
function setBg(src){
  if(src===bgSrc)return;bgSrc=src;
  const nxt=bgs[bgFlip?0:1],cur=bgs[bgFlip?1:0];bgFlip=!bgFlip;
  nxt.src=src;nxt.classList.add('is-on');cur.classList.remove('is-on');
}
async function show(i,dir,instant){
  const list=gallery[cat],n=list.length;idx=((i%n)+n)%n;
  const [src,label]=list[idx],my=++token;
  $('#lbKicker').textContent=SHORT[cat];$('#lbTitle').textContent=label;
  $('#lbCount').textContent=pad(idx+1)+' / '+pad(n);$('#lbBar').style.transform=`scaleX(${(idx+1)/n})`;
  [...thumbs.children].forEach((b,k)=>{b.classList.toggle('is-on',k===idx);if(k===idx)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
  const on=thumbs.children[idx];
  if(on)thumbs.scrollTo({left:on.offsetLeft-(thumbs.clientWidth-on.offsetWidth)/2,behavior:instant||reduceG.matches?'auto':'smooth'});
  setBg(src);
  const pre=new Image();pre.src=src;try{await pre.decode();}catch(e){}
  if(my!==token)return;
  const swap=()=>{img.src=src;img.alt=label;fit(pre);};
  if(instant||reduceG.matches||!isOpen){swap();img.getAnimations().forEach(a=>a.cancel());}
  else{
    const cur=+getComputedStyle(img).opacity||1,old=img.getAnimations();
    const out=img.animate([{opacity:cur},{opacity:0,transform:`translateX(${-dir*40}px) scale(.985)`}],{duration:150,easing:'ease-in',fill:'forwards'});
    old.forEach(a=>a.cancel());
    try{await out.finished;}catch(e){return;}
    if(my!==token)return;
    swap();
    img.animate([{opacity:0,transform:`translateX(${dir*52}px) scale(.985)`},{opacity:1,transform:'none'}],{duration:420,easing:EASE});
    out.cancel();
  }
  [idx+1,idx-1].forEach(k=>{const p=list[((k%n)+n)%n];const im=new Image();im.src=p[0];});
}
const step=d=>show(idx+d,d);

function setBackdropInert(on){
  [...document.body.children].forEach(c=>{
    if(c===lb||c.tagName==='SCRIPT'||c.tagName==='STYLE')return;
    if(on){if(!c.inert){c.inert=true;c.dataset.weInert='1';}}
    else if(c.dataset.weInert){c.inert=false;delete c.dataset.weInert;}
  });
}
function openLB(i,trigger){
  if(isOpen)return;
  clearTimeout(hideTimer);isOpen=true;lastFocus=trigger||document.activeElement;
  const sbw=innerWidth-document.documentElement.clientWidth;
  document.documentElement.style.overflow='hidden';if(sbw>0)document.body.style.paddingRight=sbw+'px';
  lb.hidden=false;lb.setAttribute('aria-hidden','false');
  lbDock.classList.remove('is-ready');syncDock(lbDock);buildThumbs();idx=i;bgSrc='';
  show(i,0,true);
  void lb.offsetWidth;lb.classList.add('is-open');
  requestAnimationFrame(()=>lbDock.classList.add('is-ready'));
  setBackdropInert(true);
  $('#lbClose').focus({preventScroll:true});
}
function closeLB(){
  if(!isOpen)return;
  isOpen=false;token++;lb.classList.remove('is-open');lb.setAttribute('aria-hidden','true');
  setBackdropInert(false);
  document.documentElement.style.overflow='';document.body.style.paddingRight='';
  if(lastFocus&&lastFocus.isConnected)lastFocus.focus({preventScroll:true});
  hideTimer=setTimeout(()=>{lb.hidden=true;},reduceG.matches?0:340);
}
$('#lbClose').addEventListener('click',closeLB);
$('#lbPrev').addEventListener('click',()=>step(-1));
$('#lbNext').addEventListener('click',()=>step(1));
stage.addEventListener('click',e=>{if(e.target===stage||e.target===frame)closeLB();});

document.addEventListener('keydown',e=>{
  if(!isOpen)return;
  if(e.key==='Escape'){e.preventDefault();closeLB();}
  else if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}
  else if(e.key==='ArrowRight'){e.preventDefault();step(1);}
  else if(e.key==='Home'){e.preventDefault();show(0,-1);}
  else if(e.key==='End'){e.preventDefault();show(gallery[cat].length-1,1);}
  else if(e.key==='Tab'){
    const f=$$('button',lb).filter(b=>b.offsetParent!==null);if(!f.length)return;
    const first=f[0],last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    else if(!lb.contains(document.activeElement)){e.preventDefault();first.focus();}
  }
});

/* swipe (touch / pen) */
let sx=0,sy=0,sid=null;
stage.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'||e.target.closest('button'))return;sid=e.pointerId;sx=e.clientX;sy=e.clientY;});
stage.addEventListener('pointerup',e=>{if(e.pointerId!==sid)return;sid=null;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.3)step(dx<0?1:-1);});
stage.addEventListener('pointercancel',()=>{sid=null;});

/* layout */
let rz=0;
addEventListener('resize',()=>{cancelAnimationFrame(rz);rz=requestAnimationFrame(()=>{if(isOpen&&img.naturalWidth)fit(img);syncDocks(false);});});
syncDocks(false);requestAnimationFrame(()=>docks[0].classList.add('is-ready'));
document.fonts&&document.fonts.ready.then(()=>syncDocks(false));
}

})();
