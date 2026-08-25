(() => {
'use strict';
const names=["virginia", "gregory", "aaron", "liv", "danny", "kristin", "doug", "ruth", "judy", "brandon", "emily", "jaclyne", "alex"];
const coords={"virginia": {"col": 0, "row": 0}, "gregory": {"col": 1, "row": 0}, "aaron": {"col": 2, "row": 0}, "liv": {"col": 3, "row": 0}, "danny": {"col": 0, "row": 1}, "kristin": {"col": 1, "row": 1}, "doug": {"col": 2, "row": 1}, "ruth": {"col": 3, "row": 1}, "judy": {"col": 0, "row": 2}, "brandon": {"col": 1, "row": 2}, "emily": {"col": 2, "row": 2}, "jaclyne": {"col": 3, "row": 2}, "alex": {"col": 0, "row": 3}};
const bodySources={"floral-summer": "virginia", "broad-blue": "gregory", "casual-gray": "aaron", "dark-utility": "liv", "tropical-blue": "danny", "black-outdoor": "kristin", "hiking-gray": "doug", "graphic-dress": "ruth", "blue-plaid": "judy", "formal-suit": "brandon", "red-dress": "emily", "adventure-green": "jaclyne", "sport-hoodie": "alex"};
const defaults={"virginia": "floral-summer", "gregory": "broad-blue", "aaron": "casual-gray", "liv": "dark-utility", "danny": "tropical-blue", "kristin": "black-outdoor", "doug": "hiking-gray", "ruth": "graphic-dress", "judy": "blue-plaid", "brandon": "formal-suit", "emily": "red-dress", "jaclyne": "adventure-green", "alex": "sport-hoodie"};
const animations=[['idle','Idle','🙂'],['wave','Wave','👋'],['think','Think','🤔'],['laugh','Laugh','😂'],['shock','Shock','😲'],['sad','Sad','😔'],['point','Point','👉'],['cheer','Cheer','🙌'],['dance','Dance','💃'],['victory','Victory','🏆']];
const themes=['cream','cyan','purple','navy'];
const A=window.CallbackHybridAssets;
const state={name:'virginia',mode:'preset',head:'virginia',body:defaults.virginia,headSize:82,headX:0,headY:0,theme:'cream',anim:'idle'};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const title=s=>s.replace(/-/g,' ').replace(/\b\w/g,m=>m.toUpperCase());
function pos(name){const p=coords[name];return `${(p.col/3)*100}% ${(p.row/3)*100}%`;}
function setFamilySprite(el,name){el.style.backgroundImage=`url(${A.family})`;el.style.backgroundPosition=pos(name);}
function setHeadSprite(el,name){el.style.backgroundImage=`url(${A.heads})`;el.style.backgroundPosition=pos(name);}
function renderMain(){
  $('#avatarName').textContent=title(state.name);$('#animStatus').textContent=title(state.anim);
  const stage=$('#stage'), full=$('#fullLayer'), body=$('#bodyLayer'), headW=$('#headWindow'), head=$('#headLayer');
  full.hidden=state.mode!=='preset';body.hidden=state.mode!=='hybrid';headW.hidden=state.mode!=='hybrid';
  if(state.mode==='preset') setFamilySprite(full,state.name); else {setFamilySprite(body,bodySources[state.body]);setHeadSprite(head,state.head);headW.style.width=state.headSize+'%';headW.style.left=`calc(50% + ${state.headX}px)`;headW.style.top=`calc(1% + ${state.headY}px)`;}
  stage.className=`stage theme-${state.theme} anim-${state.anim}`;
  $('#headSize').value=state.headSize;$('#headSizeOut').textContent=state.headSize+'%';$('#headX').value=state.headX;$('#headXOut').textContent=(state.headX>0?'+':'')+state.headX+'px';$('#headY').value=state.headY;$('#headYOut').textContent=(state.headY>0?'+':'')+state.headY+'px';
  $('#payload').textContent=JSON.stringify({type:'callbackHybridAvatar',preset:state.mode==='preset'?state.name:null,head:state.mode==='hybrid'?state.head:null,body:state.mode==='hybrid'?state.body:null,headSize:state.headSize,headX:state.headX,headY:state.headY,theme:state.theme},null,2);
}
function fullCard(name){return `<button type="button" class="card ${state.mode==='preset'&&state.name===name?'active':''}" data-family="${name}"><span class="card-art"><i class="sprite-cell" data-family-art="${name}"></i></span><span class="card-label">${title(name)}</span></button>`;}
function headCard(name){return `<button type="button" class="card ${state.mode==='hybrid'&&state.head===name?'active':''}" data-head="${name}"><span class="card-art"><i class="head-sprite" data-head-art="${name}"></i></span><span class="card-label">${title(name)}</span></button>`;}
function bodyCard(body){return `<button type="button" class="card ${state.mode==='hybrid'&&state.body===body?'active':''}" data-body="${body}"><span class="card-art"><i class="sprite-cell" data-body-art="${body}"></i></span><span class="card-label">${title(body)}</span></button>`;}
function renderCards(){
  $('#familyGrid').innerHTML=names.map(fullCard).join('');$('#headGrid').innerHTML=names.map(headCard).join('');$('#bodyGrid').innerHTML=Object.keys(bodySources).map(bodyCard).join('');
  $$('[data-family-art]').forEach(el=>setFamilySprite(el,el.dataset.familyArt));$$('[data-head-art]').forEach(el=>setHeadSprite(el,el.dataset.headArt));$$('[data-body-art]').forEach(el=>setFamilySprite(el,bodySources[el.dataset.bodyArt]));
  $$('[data-family]').forEach(b=>b.onclick=()=>{state.name=b.dataset.family;state.head=state.name;state.body=defaults[state.name];state.mode='preset';state.anim='idle';render();});
  $$('[data-head]').forEach(b=>b.onclick=()=>{state.head=b.dataset.head;state.name=state.head;state.mode='hybrid';render();});
  $$('[data-body]').forEach(b=>b.onclick=()=>{state.body=b.dataset.body;state.mode='hybrid';render();});
}
function renderControls(){
  $('#reactions').innerHTML=animations.map(([id,label,emoji])=>`<button type="button" class="reaction ${state.anim===id?'active':''}" data-anim="${id}" title="${label}" aria-label="${label}">${emoji}</button>`).join('');
  $$('[data-anim]').forEach(b=>b.onclick=()=>{state.anim=b.dataset.anim;renderMain();renderControls();});
  $('#themes').innerHTML=themes.map(t=>`<button type="button" class="theme-btn ${state.theme===t?'active':''}" data-theme="${t}">${title(t)}</button>`).join('');
  $$('[data-theme]').forEach(b=>b.onclick=()=>{state.theme=b.dataset.theme;renderMain();renderControls();});
}
function render(){renderMain();renderCards();renderControls();}
$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab').forEach(x=>x.classList.toggle('active',x===b));$$('.panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===b.dataset.tab));});
$('#headSize').oninput=e=>{state.headSize=+e.target.value;state.mode='hybrid';renderMain();};$('#headX').oninput=e=>{state.headX=+e.target.value;state.mode='hybrid';renderMain();};$('#headY').oninput=e=>{state.headY=+e.target.value;state.mode='hybrid';renderMain();};
$('#saveBtn').onclick=()=>{const b=$('#saveBtn');b.textContent='Avatar ready ✓';setTimeout(()=>b.textContent='Use this avatar',1300);};
window.CallbackHybridAvatar={presets:names,bodySources,defaults,create:(config={})=>({type:'callbackHybridAvatar',...config})};
render();
})();
