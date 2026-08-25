(() => {
  'use strict';
  const { OPTIONS, FEATURE_CATEGORIES, DEFAULT_AVATAR, FAMILY_PRESETS, ANIMATIONS, COLORS } = window.CallbackAvatarData;
  const { clone, esc, title, color, renderAvatar } = window.CallbackAvatarCore;
  const state = {
    name:'Custom Player', avatar: clone(DEFAULT_AVATAR), preset:null, feature:'face', animation:'idle',
    lobby:Object.keys(FAMILY_PRESETS).map(name => ({ name, avatar:clone(FAMILY_PRESETS[name].avatar), preset:name }))
  };

  const dom = {
    avatarStage:document.getElementById('avatarStage'), avatarName:document.getElementById('avatarName'), presetNote:document.getElementById('presetNote'), statusPill:document.getElementById('statusPill'),
    playerName:document.getElementById('playerName'), featureNav:document.getElementById('featureNav'), editorWorkspace:document.getElementById('editorWorkspace'), presetGrid:document.getElementById('presetGrid'),
    animationGrid:document.getElementById('animationGrid'), payloadPreview:document.getElementById('payloadPreview'), lobbyGrid:document.getElementById('lobbyGrid'), savedBanner:document.getElementById('savedBanner'),
    randomizeBtn:document.getElementById('randomizeBtn'), resetBtn:document.getElementById('resetBtn'), doneBtn:document.getElementById('doneBtn'), addToLobbyBtn:document.getElementById('addToLobbyBtn'), quickReactions:document.getElementById('quickReactions')
  };

  function renderMain(){
    dom.avatarStage.innerHTML=renderAvatar(state.avatar,{animation:state.animation,label:state.name});
    dom.avatarName.textContent=state.name;
    dom.statusPill.textContent=title(state.animation);
    dom.presetNote.textContent=state.preset && FAMILY_PRESETS[state.preset] ? FAMILY_PRESETS[state.preset].note : 'Custom avatar — every feature can be fine-tuned.';
    dom.payloadPreview.textContent=JSON.stringify(createPlayerPayload(),null,2);
    updateQuickReactionState();
    scheduleBlink();
  }

  let blinkTimer;
  function scheduleBlink(){
    clearTimeout(blinkTimer);
    blinkTimer=setTimeout(()=>{
      const svg=dom.avatarStage.querySelector('.avatar-svg');
      if(svg){ svg.classList.add('is-blinking'); setTimeout(()=>svg.classList.remove('is-blinking'),250); }
      scheduleBlink();
    }, 2600+Math.random()*2800);
  }

  function createPlayerPayload(){ return { name:state.name, preset:state.preset, avatar:clone(state.avatar) }; }

  function makeOptionCard(key,value,active,baseAvatar=state.avatar){
    const temp={...clone(baseAvatar),[key]:value};
    return `<button type="button" class="option-card ${active?'active':''}" data-option-key="${key}" data-option-value="${esc(value)}" aria-pressed="${active}"><span class="option-thumb">${renderAvatar(temp,{animation:'idle',label:title(value)})}</span><span class="option-label">${esc(title(value))}</span></button>`;
  }
  function makeColorGrid(key,kind){
    return `<div class="color-grid">${OPTIONS[key].map(v=>`<button type="button" class="color-chip ${state.avatar[key]===v?'active':''}" data-option-key="${key}" data-option-value="${v}" title="${esc(title(v))}"><span class="swatch" style="background:${color(kind,v)}"></span></button>`).join('')}</div>`;
  }
  function slider(label,key,min,max,step=1,display=v=>v){
    const v=state.avatar[key]; return `<div class="slider-row"><label for="slider-${key}">${label}</label><input id="slider-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${v}" data-slider-key="${key}"><span class="slider-value" data-slider-value="${key}">${display(v)}</span></div>`;
  }
  function optionGrid(key){ return `<div class="option-grid">${OPTIONS[key].map(v=>makeOptionCard(key,v,state.avatar[key]===v)).join('')}</div>`; }

  function renderEditor(){
    dom.featureNav.innerHTML=FEATURE_CATEGORIES.map(f=>`<button type="button" class="feature-tab ${state.feature===f.id?'active':''}" data-feature="${f.id}"><span aria-hidden="true">${f.icon}</span> ${f.label}</button>`).join('');
    let html='';
    const a=state.avatar;
    if(state.feature==='face') html=`<div class="editor-title"><h3>Face</h3><span>Shape + proportions + age detail</span></div>${optionGrid('faceShape')}<div class="tune-panel"><h4>Fine tune</h4>${makeColorGrid('skin','skin')}${slider('Face width','faceWidth',.86,1.14,.01,v=>Math.round(v*100)+'%')}${slider('Face length','faceHeight',.9,1.12,.01,v=>Math.round(v*100)+'%')}<div><div class="field-label">Face detail</div>${optionGrid('ageDetail')}</div></div>`;
    else if(state.feature==='hair') html=`<div class="editor-title"><h3>Hair</h3><span>Style, colour and hairline</span></div>${optionGrid('hairStyle')}<div class="tune-panel"><h4>Colour & placement</h4>${makeColorGrid('hairColor','hair')}${slider('Hairline','hairline',-6,8,1,v=>(v>0?'+':'')+v)}<div class="toggle-row"><button type="button" class="toggle-chip ${a.hairFlip?'active':''}" data-boolean-key="hairFlip">Flip hairstyle</button></div></div>`;
    else if(state.feature==='brows') html=`<div class="editor-title"><h3>Eyebrows</h3><span>Small changes strongly affect likeness</span></div>${optionGrid('browStyle')}<div class="tune-panel"><h4>Fine tune</h4>${makeColorGrid('browColor','hair')}${slider('Height','browHeight',-8,8,1,v=>(v>0?'+':'')+v)}${slider('Angle','browAngle',-18,18,1,v=>v+'°')}${slider('Spacing','browSpacing',-8,10,1,v=>(v>0?'+':'')+v)}</div>`;
    else if(state.feature==='eyes') html=`<div class="editor-title"><h3>Eyes</h3><span>Shape, colour, size and spacing</span></div>${optionGrid('eyeStyle')}<div class="tune-panel"><h4>Fine tune</h4>${makeColorGrid('eyeColor','eyes')}${slider('Size','eyeSize',.78,1.24,.01,v=>Math.round(v*100)+'%')}${slider('Spacing','eyeSpacing',-7,10,1,v=>(v>0?'+':'')+v)}${slider('Height','eyeHeight',-7,7,1,v=>(v>0?'+':'')+v)}${slider('Tilt','eyeTilt',-10,10,1,v=>v+'°')}</div>`;
    else if(state.feature==='nose') html=`<div class="editor-title"><h3>Nose</h3><span>Simple geometry, enough to distinguish faces</span></div>${optionGrid('noseStyle')}<div class="tune-panel"><h4>Fine tune</h4>${slider('Size','noseSize',.8,1.22,.01,v=>Math.round(v*100)+'%')}${slider('Height','noseHeight',-7,8,1,v=>(v>0?'+':'')+v)}</div>`;
    else if(state.feature==='mouth') html=`<div class="editor-title"><h3>Mouth</h3><span>Smile shape is one of the strongest cues</span></div>${optionGrid('mouthStyle')}<div class="tune-panel"><h4>Fine tune</h4>${slider('Width','mouthWidth',.8,1.24,.01,v=>Math.round(v*100)+'%')}${slider('Height','mouthHeight',-7,9,1,v=>(v>0?'+':'')+v)}</div>`;
    else if(state.feature==='facialHair') html=`<div class="editor-title"><h3>Facial hair</h3><span>Separate style, colour and size</span></div>${optionGrid('facialHair')}<div class="tune-panel"><h4>Fine tune</h4>${makeColorGrid('facialHairColor','hair')}${slider('Size','facialHairSize',.8,1.15,.01,v=>Math.round(v*100)+'%')}</div>`;
    else if(state.feature==='glasses') html=`<div class="editor-title"><h3>Glasses</h3><span>Frames are especially important for family presets</span></div>${optionGrid('glasses')}<div class="tune-panel"><h4>Fine tune</h4>${slider('Size','glassesSize',.86,1.16,.01,v=>Math.round(v*100)+'%')}${slider('Height','glassesHeight',-6,7,1,v=>(v>0?'+':'')+v)}<div class="toggle-row"><button type="button" class="toggle-chip ${a.glassesColor==='black'?'active':''}" data-glasses-color="black">Black frames</button><button type="button" class="toggle-chip ${a.glassesColor==='brown'?'active':''}" data-glasses-color="brown">Brown frames</button></div></div>`;
    else if(state.feature==='outfit') html=`<div class="editor-title"><h3>Outfit</h3><span>Keep clothing simple but recognizable</span></div>${optionGrid('outfit')}<div class="tune-panel"><h4>Colours</h4>${makeColorGrid('outfitColor','outfit')}<div class="field-label">Accent</div><div class="color-grid">${Object.keys(COLORS.accent).map(v=>`<button type="button" class="color-chip ${a.outfitAccent===v?'active':''}" data-outfit-accent="${v}"><span class="swatch" style="background:${COLORS.accent[v]}"></span></button>`).join('')}</div></div>`;
    else if(state.feature==='extras') html=`<div class="editor-title"><h3>Extras</h3><span>Hats and details can stack together</span></div><div class="field-label">Hat</div>${optionGrid('hat')}<div class="tune-panel"><h4>Stackable details</h4><div class="toggle-row">${OPTIONS.extras.map(v=>`<button type="button" class="toggle-chip ${(a.extras||[]).includes(v)?'active':''}" data-extra="${v}">${title(v)}</button>`).join('')}</div><p class="helper-text">Unlike the first editor, these extras are independent. A player can have a hat, freckles, earrings and a cross-body strap at the same time.</p></div>`;
    else if(state.feature==='body') html=`<div class="editor-title"><h3>Body</h3><span>Simple proportions for silhouette recognition</span></div>${optionGrid('bodyBuild')}<div class="tune-panel"><h4>Fine tune</h4>${slider('Height','bodyHeight',.88,1.12,.01,v=>Math.round(v*100)+'%')}${slider('Width','bodyWidth',.86,1.14,.01,v=>Math.round(v*100)+'%')}</div>`;
    dom.editorWorkspace.innerHTML=html;
    wireEditorEvents();
  }

  function wireEditorEvents(){
    dom.editorWorkspace.querySelectorAll('[data-option-key]').forEach(btn=>btn.addEventListener('click',()=>{
      const key=btn.dataset.optionKey, val=btn.dataset.optionValue; state.avatar[key]=val; state.preset=null; renderAll(false);
    }));
    dom.editorWorkspace.querySelectorAll('[data-slider-key]').forEach(input=>input.addEventListener('input',()=>{
      const key=input.dataset.sliderKey; state.avatar[key]=Number(input.value); state.preset=null;
      const out=dom.editorWorkspace.querySelector(`[data-slider-value="${key}"]`); if(out) out.textContent=formatSliderValue(key,state.avatar[key]); renderMain();
    }));
    dom.editorWorkspace.querySelectorAll('[data-boolean-key]').forEach(btn=>btn.addEventListener('click',()=>{ const k=btn.dataset.booleanKey; state.avatar[k]=!state.avatar[k]; state.preset=null; renderAll(false); }));
    dom.editorWorkspace.querySelectorAll('[data-extra]').forEach(btn=>btn.addEventListener('click',()=>{ const v=btn.dataset.extra; const arr=new Set(state.avatar.extras||[]); arr.has(v)?arr.delete(v):arr.add(v); state.avatar.extras=[...arr]; state.preset=null; renderAll(false); }));
    dom.editorWorkspace.querySelectorAll('[data-glasses-color]').forEach(btn=>btn.addEventListener('click',()=>{ state.avatar.glassesColor=btn.dataset.glassesColor; state.preset=null; renderAll(false); }));
    dom.editorWorkspace.querySelectorAll('[data-outfit-accent]').forEach(btn=>btn.addEventListener('click',()=>{ state.avatar.outfitAccent=btn.dataset.outfitAccent; state.preset=null; renderAll(false); }));
  }

  function formatSliderValue(key,v){
    if(['faceWidth','faceHeight','eyeSize','noseSize','mouthWidth','glassesSize','facialHairSize','bodyHeight','bodyWidth'].includes(key)) return Math.round(v*100)+'%';
    if(['browAngle','eyeTilt'].includes(key)) return v+'°'; return (v>0?'+':'')+v;
  }

  function renderPresets(){
    dom.presetGrid.innerHTML=Object.entries(FAMILY_PRESETS).map(([name,p])=>`<button type="button" class="preset-card ${state.preset===name?'active':''}" data-preset="${name}"><span class="preset-mini">${renderAvatar(p.avatar,{animation:'idle',label:name})}</span><strong>${name}</strong><small>${esc(p.note.split(' · ').slice(0,2).join(' · '))}</small></button>`).join('');
    dom.presetGrid.querySelectorAll('[data-preset]').forEach(btn=>btn.addEventListener('click',()=>loadPreset(btn.dataset.preset)));
  }

  function loadPreset(name){
    const p=FAMILY_PRESETS[name]; if(!p) return; state.name=name; state.avatar=clone(p.avatar); state.preset=name; state.animation='idle'; dom.playerName.value=name; renderAll(); switchTab('create');
  }

  function renderAnimations(){
    dom.animationGrid.innerHTML=ANIMATIONS.map(([id,label,emoji])=>`<button type="button" class="animation-btn ${state.animation===id?'active':''}" data-animation="${id}">${emoji} ${label}</button>`).join('');
    dom.animationGrid.querySelectorAll('[data-animation]').forEach(btn=>btn.addEventListener('click',()=>{ state.animation=btn.dataset.animation; renderMain(); renderAnimations(); }));
    dom.quickReactions.innerHTML=ANIMATIONS.filter(([id])=>['idle','laugh','shock','sad','cheer','victory'].includes(id)).map(([id,label,emoji])=>`<button type="button" class="reaction-btn ${state.animation===id?'active':''}" data-quick-animation="${id}" title="${label}">${emoji}</button>`).join('');
    dom.quickReactions.querySelectorAll('[data-quick-animation]').forEach(btn=>btn.addEventListener('click',()=>{ state.animation=btn.dataset.quickAnimation; renderMain(); renderAnimations(); }));
  }
  function updateQuickReactionState(){ dom.quickReactions.querySelectorAll('[data-quick-animation]').forEach(b=>b.classList.toggle('active',b.dataset.quickAnimation===state.animation)); }

  function renderLobby(){
    dom.lobbyGrid.innerHTML=state.lobby.map(p=>`<div class="lobby-card"><div class="lobby-avatar">${renderAvatar(p.avatar,{animation:'idle',label:p.name})}</div><div class="lobby-name">${esc(p.name)}</div></div>`).join('');
  }

  function renderAll(redrawEditor=true){ renderMain(); if(redrawEditor) renderEditor(); else renderEditor(); renderPresets(); renderAnimations(); renderLobby(); }

  function randomChoice(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function randomize(){
    const keepName=state.name;
    state.avatar={...clone(DEFAULT_AVATAR), faceShape:randomChoice(OPTIONS.faceShape), skin:randomChoice(OPTIONS.skin), ageDetail:Math.random()<.2?randomChoice(OPTIONS.ageDetail):'none', faceWidth:.9+Math.random()*.2, faceHeight:.92+Math.random()*.16, hairStyle:randomChoice(OPTIONS.hairStyle), hairColor:randomChoice(OPTIONS.hairColor), browStyle:randomChoice(OPTIONS.browStyle), browColor:randomChoice(OPTIONS.hairColor), eyeStyle:randomChoice(OPTIONS.eyeStyle), eyeColor:randomChoice(OPTIONS.eyeColor), eyeSize:.88+Math.random()*.25, eyeSpacing:Math.round(-3+Math.random()*8), noseStyle:randomChoice(OPTIONS.noseStyle), noseSize:.88+Math.random()*.22, mouthStyle:randomChoice(OPTIONS.mouthStyle), mouthWidth:.88+Math.random()*.25, glasses:Math.random()<.35?randomChoice(OPTIONS.glasses):'none', facialHair:Math.random()<.3?randomChoice(OPTIONS.facialHair):'none', facialHairColor:randomChoice(OPTIONS.hairColor), outfit:randomChoice(OPTIONS.outfit), outfitColor:randomChoice(OPTIONS.outfitColor), outfitAccent:randomChoice(Object.keys(COLORS.accent)), hat:Math.random()<.25?randomChoice(OPTIONS.hat):'none', extras:OPTIONS.extras.filter(()=>Math.random()<.12).slice(0,2), bodyBuild:randomChoice(OPTIONS.bodyBuild), bodyHeight:.92+Math.random()*.16, bodyWidth:.9+Math.random()*.2, personality:'none'};
    state.name=keepName; state.preset=null; state.animation='idle'; renderAll();
  }

  function reset(){ state.avatar=clone(DEFAULT_AVATAR); state.name='Custom Player'; state.preset=null; state.animation='idle'; dom.playerName.value=state.name; renderAll(); }

  function save(){
    try { localStorage.setItem('callback-avatar-current',JSON.stringify(createPlayerPayload())); } catch(e) {}
    dom.savedBanner.hidden=false; clearTimeout(save._t); save._t=setTimeout(()=>dom.savedBanner.hidden=true,2400);
  }

  function addCurrentToLobby(){ state.lobby.push(createPlayerPayload()); if(state.lobby.length>18) state.lobby.shift(); renderLobby(); }

  function switchTab(tabName){
    const names=['create','family','animation'];
    names.forEach(n=>{
      const tab=document.getElementById(`${n}Tab`), panel=document.getElementById(`${n}Panel`), active=n===tabName;
      tab.classList.toggle('active',active); tab.setAttribute('aria-selected',active?'true':'false'); panel.hidden=!active;
    });
  }

  document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>switchTab(tab.id.replace('Tab',''))));
  dom.playerName.addEventListener('input',()=>{ state.name=dom.playerName.value.trim()||'Player'; state.preset=null; renderMain(); renderPresets(); });
  dom.featureNav.addEventListener('click',e=>{ const b=e.target.closest('[data-feature]'); if(!b) return; state.feature=b.dataset.feature; renderEditor(); });
  dom.randomizeBtn.addEventListener('click',randomize); dom.resetBtn.addEventListener('click',reset); dom.doneBtn.addEventListener('click',save); dom.addToLobbyBtn.addEventListener('click',addCurrentToLobby);

  window.CallbackAvatar={
    presets:FAMILY_PRESETS, options:OPTIONS, defaultAvatar:DEFAULT_AVATAR,
    render:(avatar,{animation='idle',label='CALLBACK avatar'}={})=>renderAvatar(avatar,{animation,label}),
    createPlayer:(name,avatar)=>({name,preset:null,avatar:{...clone(DEFAULT_AVATAR),...clone(avatar||{})}}),
    applyAnimation:(container,animation)=>{ const svg=container?.querySelector?.('.avatar-svg')||container; if(!svg) return; ANIMATIONS.forEach(([id])=>svg.classList.remove(`anim-${id}`)); svg.classList.add(`anim-${animation}`); }
  };

  renderAll();
})();
