(() => {
  'use strict';

  const ROUND_ONE_PROMPTS = [
    'A knight trying to ride a chicken',
    'A penguin lifting weights',
    'A shark ordering at a drive-through',
    'A grandma wrestling an inflatable dinosaur',
    'A pigeon stealing a police car',
    'A cow attempting a skateboard trick',
    'A wizard vacuuming a dragon',
    'A bear proposing marriage to a vending machine',
    'A robot trying to walk three dogs',
    'A firefighter rescuing a dragon from a tree',
    'A pirate trying to use a trampoline',
    'A squirrel driving a forklift'
  ];

  const ROUND_TWO_PROMPTS = [
    'A knight fixing a bicycle while an angry goose attacks him',
    'A tiny doctor riding a penguin while it lifts weights',
    'A giraffe hiding inside a tiny tent while campers eat breakfast',
    'A wizard cooking spaghetti while a dragon reads the recipe',
    'A bear on a unicycle juggling golden apples beside a nervous king',
    'A pigeon flying a helicopter while a knight hangs from a rope',
    'A grandma surfing on a crocodile while holding a birthday cake',
    'A firefighter teaching three dragons how to use a garden hose',
    'A shark working at a drive-through while a penguin orders fries',
    'A robot getting married while two dogs steal the wedding cake',
    'A pirate fixing a toilet while a parrot directs traffic',
    'A cow playing hockey while a tiny referee rides on its back'
  ];

  const DEFAULT_NAMES = ['Danny', 'Kristin', 'Doug', 'Emily', 'Aaron', 'Ruth', 'Alex', 'Judy', 'Brandon', 'Liv'];
  const ROUND_WEIGHTS = { 1: 1, 2: 2 };
  const DRAW_SECONDS = 60;
  const SHOWCASE_SECONDS = 20;

  const tv = document.getElementById('tvScreen');
  const phone = document.getElementById('phoneScreen');
  const badge = document.getElementById('connectionBadge');

  const state = {
    phase: 'setup', players: [], prompts: {}, round: 0, currentPlayerIndex: 0,
    submissions: [], submitSequence: 0, drawingSeconds: DRAW_SECONDS, drawingTimer: null,
    showcaseRound: 0, showcaseQueue: [], showcaseIndex: 0, showcaseOriginal: false,
    showcaseSeconds: SHOWCASE_SECONDS, showcaseTimer: null, voteVoterIndex: 0,
    voteSelections: [], votes: [], roundScores: {}, totalScores: {},
    config: { aiMode: 'auto', misreadStrength: 'balanced' }, liveAIAvailable: false,
    activeStroke: null, strokes: [], brushColor: '#161923', brushWidth: 7, eraser: false
  };

  const avatarFor = (index) => ['🧑‍🎨','👩‍🎨','🧔','👩','🧑','👵','🧑‍🦱','👩‍🦰','🧑‍🦲','👩‍🦱'][index % 10];

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>'"]/g, (ch) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[ch]));
  }
  function randomItem(items) { return items[Math.floor(Math.random() * items.length)]; }
  function uid(prefix = 'id') { return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`; }
  function hashString(str) { let h=2166136261; for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);} return h>>>0; }
  function sleep(ms) { return new Promise(r => setTimeout(r,ms)); }

  async function detectLiveAI() {
    if (location.protocol === 'file:') { setAIBadge(false); return; }
    try {
      const res = await fetch('/api/health', { cache: 'no-store' });
      if (!res.ok) throw new Error('health failed');
      const data = await res.json();
      state.liveAIAvailable = Boolean(data.ai);
      setAIBadge(state.liveAIAvailable);
    } catch { state.liveAIAvailable=false; setAIBadge(false); }
  }
  function setAIBadge(live) {
    badge.className = `status-badge ${live ? 'live' : 'demo'}`;
    badge.textContent = live ? 'FLUX.2 live AI ready' : 'Local demo AI fallback';
  }

  function render() { renderTV(); renderPhone(); }
  function renderAsyncMediaUpdate() { if (state.phase === 'draw') renderTV(); else render(); }

  function renderTV() {
    if (state.phase === 'setup') return renderTVSetup();
    if (['draw','handoff'].includes(state.phase)) return renderTVDrawing();
    if (state.phase === 'showcase') return renderTVShowcase();
    if (state.phase === 'vote') return renderTVGallery('CROWN YOUR FAVORITES');
    if (state.phase === 'round-results') return renderTVRoundResults();
    if (state.phase === 'final') return renderTVFinal();
  }

  function renderTVSetup() {
    tv.innerHTML = `<div class="screen-pad tv-center"><div class="pigeon" aria-hidden="true">🕊️<span class="crown">♛</span></div><div class="tv-kicker">A CALLBACK drawing experiment</div><div class="tv-title">DRAW IT.<br>LET AI <span class="crown">MISREAD IT.</span></div><p class="tv-sub">Everyone gets the same ridiculous prompt. Your sketch becomes the only visual clue the image model receives. Then the room crowns the best interpretation.</p></div>`;
  }

  function renderTVDrawing() {
    const promptText = state.prompts[state.round] || 'Preparing prompt…';
    const chips = state.players.map((p) => {
      const sub = getSubmission(p.id, state.round);
      const ready = sub && sub.aiStatus.startsWith('ready');
      return `<div class="player-chip ${ready?'ready':sub?'done':''}"><span class="dot"></span>${escapeHTML(p.name)}${ready?' · AI ready':sub?' · submitted':''}</div>`;
    }).join('');
    tv.innerHTML = `<div class="screen-pad tv-center"><div class="tv-kicker">ROUND ${state.round} · EVERYBODY DRAWS THE SAME THING</div><div class="prompt-card"><div class="tv-kicker">THE KING DEMANDS</div><div class="prompt-text">${escapeHTML(promptText)}</div><div class="progress-row">${chips}</div></div></div>`;
  }

  function renderTVShowcase() {
    const sub = currentShowcaseSubmission(); if (!sub) return;
    const image = state.showcaseOriginal ? sub.sketchDataUrl : (sub.aiImage || sub.sketchDataUrl);
    const label = state.showcaseOriginal ? `WHAT ${escapeHTML(sub.playerName)} ACTUALLY DREW` : 'WHAT THE AI SAW';
    const sourceBadge = sub.aiStatus === 'ready-live' ? 'FLUX.2' : 'PROTOTYPE SIMULATION';
    tv.innerHTML = `<div class="showcase-wrap"><div class="showcase-card"><div class="showcase-image-shell"><img src="${image}" alt="${state.showcaseOriginal?'Original player drawing':'AI interpretation'}">${!state.showcaseOriginal?`<div class="ai-stamp">${sourceBadge}</div>`:''}</div><div class="showcase-meta"><div class="tiny">${label}</div><h2>${escapeHTML(sub.playerName)}</h2></div></div></div>`;
  }

  function renderTVGallery(kicker='THE ROYAL GALLERY') {
    const cards = submissionsForRound(state.round).map(sub => `<div class="gallery-card"><img src="${sub.aiImage || sub.sketchDataUrl}" alt="Interpretation by ${escapeHTML(sub.playerName)}"><div class="label"><span>${escapeHTML(sub.playerName)}</span><span>${sub.aiStatus==='ready-live'?'AI':'demo'}</span></div></div>`).join('');
    tv.innerHTML = `<div class="screen-pad"><div class="tv-kicker">${kicker}</div><div class="tv-title" style="font-size:clamp(32px,4vw,60px);margin-bottom:18px;">Round ${state.round} Gallery</div><div class="gallery">${cards}</div></div>`;
  }

  function renderTVRoundResults() {
    const ranked=[...state.players].sort((a,b)=>(state.totalScores[b.id]||0)-(state.totalScores[a.id]||0));
    tv.innerHTML=`<div class="screen-pad tv-center"><div class="tv-kicker">ROUND ${state.round} COMPLETE</div><div class="tv-title">THE CROWN <span class="crown">TILTS</span></div><div class="score-list">${ranked.map((p,i)=>`<div class="score-row ${i===0?'top':''}"><div class="place">${i+1}</div><div class="score-name">${escapeHTML(p.name)}</div><div class="score-points">${state.totalScores[p.id]||0} pts</div></div>`).join('')}</div></div>`;
  }

  function renderTVFinal() {
    const ranked=[...state.players].sort((a,b)=>(state.totalScores[b.id]||0)-(state.totalScores[a.id]||0));
    const top=state.totalScores[ranked[0]?.id]||0; const winners=ranked.filter(p=>(state.totalScores[p.id]||0)===top);
    tv.innerHTML=`<div class="screen-pad tv-center"><div class="pigeon" aria-hidden="true">🕊️👑</div><div class="tv-kicker">FINAL VERDICT</div><div class="tv-title">${winners.length>1?'CO-':''}ROYAL MISREAD <span class="crown">CHAMPION${winners.length>1?'S':''}</span></div><div class="tv-sub" style="font-size:clamp(22px,3vw,42px);font-weight:950;color:white;">${winners.map(w=>escapeHTML(w.name)).join(' & ')}</div><div class="score-list">${ranked.map((p,i)=>`<div class="score-row ${i===0?'top':''}"><div class="place">${i+1}</div><div class="score-name">${escapeHTML(p.name)}</div><div class="score-points">${state.totalScores[p.id]||0} pts</div></div>`).join('')}</div></div>`;
  }

  function renderPhone() {
    if (state.phase === 'setup') return renderPhoneSetup();
    if (state.phase === 'handoff') return renderPhoneHandoff();
    if (state.phase === 'draw') return renderPhoneDrawing();
    if (state.phase === 'showcase') return renderPhoneShowcase();
    if (state.phase === 'vote') return renderPhoneVote();
    if (state.phase === 'round-results') return renderPhoneRoundResults();
    if (state.phase === 'final') return renderPhoneFinal();
  }

  function renderPhoneSetup() {
    phone.innerHTML=`<div class="phone-pad"><div class="phone-eyebrow">Prototype setup</div><h2 class="phone-title">Start a couch test</h2><p class="phone-copy">This prototype passes one controller between virtual players while previewing the TV beside it. Production integration will be simultaneous across phones.</p><div class="card"><div class="field"><label for="playerCount">Players</label><select id="playerCount">${Array.from({length:8},(_,i)=>i+3).map(n=>`<option value="${n}" ${n===4?'selected':''}>${n}</option>`).join('')}</select></div><div id="namesGrid" class="names-grid"></div></div><details class="card"><summary>Prototype lab controls</summary><div style="height:10px"></div><div class="field"><label for="aiMode">AI source</label><select id="aiMode"><option value="auto">Auto — live when available</option><option value="demo">Always use local simulation</option><option value="live">Require live FLUX.2</option></select></div><div class="field"><label for="misreadStrength">Interpretation looseness</label><select id="misreadStrength"><option value="faithful">Faithful</option><option value="balanced" selected>Balanced</option><option value="wild">Wild</option></select></div><div class="notice">The hidden drawing prompt is never sent to the image model. Only the submitted sketch and the fixed interpretation instruction go to AI.</div></details><div class="spacer"></div><button id="startGame" class="btn btn-primary">Start prototype</button><div class="small">Two shared prompts · immediate image queue · individual showcases · adaptive voting · cumulative scoring</div></div>`;
    const count=document.getElementById('playerCount'); count.addEventListener('change',()=>buildNameInputs(Number(count.value))); buildNameInputs(Number(count.value)); document.getElementById('startGame').addEventListener('click',startGameFromSetup);
  }

  function buildNameInputs(count) {
    const host=document.getElementById('namesGrid'); if(!host)return;
    const existing=[...host.querySelectorAll('input')].map(i=>i.value);
    host.innerHTML=Array.from({length:count},(_,i)=>`<input aria-label="Player ${i+1} name" data-player-name="${i}" value="${escapeHTML(existing[i]||DEFAULT_NAMES[i]||`Player ${i+1}`)}">`).join('');
  }

  function startGameFromSetup() {
    const inputs=[...document.querySelectorAll('[data-player-name]')];
    const names=inputs.map((input,i)=>input.value.trim()||`Player ${i+1}`);
    state.config.aiMode=document.getElementById('aiMode').value; state.config.misreadStrength=document.getElementById('misreadStrength').value;
    state.players=names.map((name,i)=>({id:`p${i+1}`,name,avatar:avatarFor(i)}));
    state.prompts={1:randomItem(ROUND_ONE_PROMPTS),2:randomItem(ROUND_TWO_PROMPTS)}; state.submissions=[];state.submitSequence=0;state.votes=[];state.totalScores=Object.fromEntries(state.players.map(p=>[p.id,0]));state.roundScores={};state.round=1;state.currentPlayerIndex=0;state.phase='handoff';render();
  }

  function renderPhoneHandoff() {
    const player=state.players[state.currentPlayerIndex];
    phone.innerHTML=`<div class="phone-pad handoff"><div class="phone-eyebrow">Round ${state.round}</div><div class="avatar">${player.avatar}</div><h2 class="phone-title">Pass to ${escapeHTML(player.name)}</h2><p class="phone-copy">When ${escapeHTML(player.name)} is ready, open a fresh canvas. Previous drawings stay hidden.</p><button id="readyDraw" class="btn btn-primary">I’m ${escapeHTML(player.name)} — draw</button></div>`;
    document.getElementById('readyDraw').addEventListener('click',beginDrawingTurn);
  }

  function beginDrawingTurn() {
    stopDrawingTimer();state.strokes=[];state.activeStroke=null;state.brushColor='#161923';state.brushWidth=7;state.eraser=false;state.drawingSeconds=DRAW_SECONDS;state.phase='draw';render();setupDrawingCanvas();
    state.drawingTimer=setInterval(()=>{state.drawingSeconds-=1;updateDrawingTimerUI();if(state.drawingSeconds<=0){stopDrawingTimer();submitDrawing(true);}},1000);
  }

  function renderPhoneDrawing() {
    const player=state.players[state.currentPlayerIndex];
    phone.innerHTML=`<div class="phone-pad"><div class="row" style="align-items:flex-start;"><div><div class="phone-eyebrow">${escapeHTML(player.name)} · Round ${state.round}</div><h2 class="phone-title">Draw it badly.</h2></div><div class="timer" id="drawTimer">${state.drawingSeconds}</div></div><div class="phone-prompt">${escapeHTML(state.prompts[state.round])}</div><div class="timerbar"><div class="timer-track"><div id="timerFill" class="timer-fill" style="width:100%"></div></div></div><div class="canvas-wrap"><canvas id="drawCanvas" width="512" height="512" aria-label="Drawing canvas"></canvas></div><div class="tool-row"><div class="swatches"><button class="swatch active" data-color="#161923" style="background:#161923" aria-label="Black"></button><button class="swatch" data-color="#f36d62" style="background:#f36d62" aria-label="Coral"></button><button class="swatch" data-color="#2bb5c8" style="background:#2bb5c8" aria-label="Cyan"></button></div><div class="row" style="flex:0 0 auto;"><button id="thinBrush" class="tool active" aria-label="Thin brush">●</button><button id="thickBrush" class="tool" aria-label="Thick brush">⬤</button><button id="eraser" class="tool" aria-label="Eraser">⌫</button></div></div><div class="row"><button id="undo" class="btn btn-soft">Undo</button><button id="clear" class="btn btn-soft">Clear</button><button id="submitDrawing" class="btn btn-primary">Done</button></div></div>`;
  }

  function setupDrawingCanvas() {
    const canvas=document.getElementById('drawCanvas'); if(!canvas)return; redrawCanvas(canvas);
    canvas.addEventListener('pointerdown',(e)=>{e.preventDefault();canvas.setPointerCapture?.(e.pointerId);const point=canvasPoint(canvas,e);state.activeStroke={color:state.brushColor,width:state.eraser?30:state.brushWidth,eraser:state.eraser,points:[point]};state.strokes.push(state.activeStroke);redrawCanvas(canvas);});
    canvas.addEventListener('pointermove',(e)=>{if(!state.activeStroke)return;e.preventDefault();const events=typeof e.getCoalescedEvents==='function'?e.getCoalescedEvents():[e];for(const evt of events)state.activeStroke.points.push(canvasPoint(canvas,evt));redrawCanvas(canvas);});
    const finish=(e)=>{if(!state.activeStroke)return;e?.preventDefault?.();state.activeStroke=null;redrawCanvas(canvas);};
    canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);canvas.addEventListener('pointerleave',(e)=>{if(e.buttons===0)finish(e);});
    document.querySelectorAll('[data-color]').forEach(btn=>btn.addEventListener('click',()=>{state.brushColor=btn.dataset.color;state.eraser=false;document.querySelectorAll('[data-color]').forEach(b=>b.classList.toggle('active',b===btn));document.getElementById('eraser').classList.remove('active');}));
    document.getElementById('thinBrush').addEventListener('click',()=>setBrushWidth(7));document.getElementById('thickBrush').addEventListener('click',()=>setBrushWidth(14));document.getElementById('eraser').addEventListener('click',(e)=>{state.eraser=!state.eraser;e.currentTarget.classList.toggle('active',state.eraser);});document.getElementById('undo').addEventListener('click',()=>{state.strokes.pop();redrawCanvas(canvas);});document.getElementById('clear').addEventListener('click',()=>{state.strokes=[];redrawCanvas(canvas);});document.getElementById('submitDrawing').addEventListener('click',()=>submitDrawing(false));
  }

  function setBrushWidth(width){state.brushWidth=width;state.eraser=false;document.getElementById('thinBrush')?.classList.toggle('active',width===7);document.getElementById('thickBrush')?.classList.toggle('active',width===14);document.getElementById('eraser')?.classList.remove('active');}
  function canvasPoint(canvas,e){const rect=canvas.getBoundingClientRect();return{x:(e.clientX-rect.left)*(canvas.width/rect.width),y:(e.clientY-rect.top)*(canvas.height/rect.height),pressure:typeof e.pressure==='number'&&e.pressure>0?e.pressure:.5};}
  function redrawCanvas(canvas){const ctx=canvas.getContext('2d');ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.restore();for(const stroke of state.strokes)drawStroke(ctx,stroke);}
  function drawStroke(ctx,stroke){const pts=stroke.points;if(!pts.length)return;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.globalCompositeOperation=stroke.eraser?'destination-out':'source-over';ctx.strokeStyle=stroke.eraser?'rgba(0,0,0,1)':stroke.color;ctx.fillStyle=stroke.color;ctx.lineWidth=stroke.width;if(pts.length===1){ctx.beginPath();ctx.arc(pts[0].x,pts[0].y,stroke.width/2,0,Math.PI*2);if(stroke.eraser){ctx.globalCompositeOperation='destination-out';ctx.fillStyle='#000';}ctx.fill();ctx.restore();return;}ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length-1;i++){const midX=(pts[i].x+pts[i+1].x)/2,midY=(pts[i].y+pts[i+1].y)/2;ctx.quadraticCurveTo(pts[i].x,pts[i].y,midX,midY);}const last=pts[pts.length-1];ctx.lineTo(last.x,last.y);ctx.stroke();ctx.restore();}
  function updateDrawingTimerUI(){const timer=document.getElementById('drawTimer'),fill=document.getElementById('timerFill');if(timer)timer.textContent=Math.max(0,state.drawingSeconds);if(fill)fill.style.width=`${Math.max(0,state.drawingSeconds/DRAW_SECONDS*100)}%`;}
  function stopDrawingTimer(){clearInterval(state.drawingTimer);state.drawingTimer=null;}

  async function submitDrawing(autoSubmitted){
    if(state.phase!=='draw')return;stopDrawingTimer();const canvas=document.getElementById('drawCanvas'),player=state.players[state.currentPlayerIndex],sketchDataUrl=exportSketch480(canvas);
    const submission={id:uid('submission'),playerId:player.id,playerName:player.name,round:state.round,prompt:state.prompts[state.round],sketchDataUrl,submittedAt:Date.now(),submitSequence:++state.submitSequence,aiStatus:'queued',aiImage:null,aiError:null,mediaLocked:false,autoSubmitted:Boolean(autoSubmitted)};
    state.submissions.push(submission);void startAIJob(submission);
    if(state.currentPlayerIndex<state.players.length-1){state.currentPlayerIndex+=1;state.phase='handoff';render();return;}
    if(state.round===1){state.round=2;state.currentPlayerIndex=0;state.phase='handoff';render();return;}
    beginShowcase(1);
  }

  function exportSketch480(canvas){const out=document.createElement('canvas');out.width=480;out.height=480;const ctx=out.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,480,480);ctx.drawImage(canvas,0,0,480,480);return out.toDataURL('image/png');}

  async function startAIJob(submission){
    submission.aiStatus='working';renderAsyncMediaUpdate();const mode=state.config.aiMode;const shouldTryLive=mode==='live'||(mode==='auto'&&state.liveAIAvailable);
    if(shouldTryLive){
      try{
        const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),45000);const res=await fetch('/api/interpret',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({imageDataUrl:submission.sketchDataUrl,profile:state.config.misreadStrength}),signal:controller.signal});clearTimeout(timeout);if(!res.ok)throw new Error(`AI request failed: ${res.status}`);const data=await res.json();if(!data.image)throw new Error('AI response contained no image');if(!submission.mediaLocked){submission.aiImage=data.image;submission.aiStatus='ready-live';renderAsyncMediaUpdate();}return;
      }catch(err){submission.aiError=String(err?.message||err);if(mode==='live')console.warn('Live AI failed; using controlled prototype fallback.',err);}
    }
    await sleep(1400+Math.random()*2600);const demoImage=await createDemoInterpretation(submission);if(!submission.mediaLocked){submission.aiImage=demoImage;submission.aiStatus='ready-demo';renderAsyncMediaUpdate();}
  }

  async function createDemoInterpretation(submission){
    const img=await loadImage(submission.sketchDataUrl);const canvas=document.createElement('canvas');canvas.width=768;canvas.height=768;const ctx=canvas.getContext('2d');const seed=hashString(`${submission.playerId}:${submission.round}:${state.config.misreadStrength}`),hue=seed%360;
    const grad=ctx.createRadialGradient(250,190,20,384,384,620);grad.addColorStop(0,`hsl(${hue} 70% 78%)`);grad.addColorStop(.52,`hsl(${(hue+42)%360} 62% 55%)`);grad.addColorStop(1,`hsl(${(hue+112)%360} 54% 22%)`);ctx.fillStyle=grad;ctx.fillRect(0,0,768,768);
    ctx.save();ctx.translate(384,384);const looseness=state.config.misreadStrength==='faithful'?.012:state.config.misreadStrength==='wild'?.055:.03;ctx.rotate(((seed%17)-8)*looseness*Math.PI/10);const scale=state.config.misreadStrength==='wild'?1.18:1.08;ctx.scale(scale,scale);ctx.translate(-384,-384);ctx.filter=state.config.misreadStrength==='faithful'?'blur(1px) contrast(1.2) saturate(1.2)':'blur(4px) contrast(1.35) saturate(1.5)';ctx.globalAlpha=.28;ctx.drawImage(img,58,58,652,652);ctx.restore();
    ctx.save();ctx.globalCompositeOperation='screen';ctx.filter='contrast(4) brightness(1.25) drop-shadow(0 10px 18px rgba(0,0,0,.45))';ctx.globalAlpha=.77;ctx.drawImage(img,72,72,624,624);ctx.restore();
    const rng=mulberry32(seed),blobCount=state.config.misreadStrength==='wild'?15:state.config.misreadStrength==='faithful'?6:10;ctx.save();ctx.globalCompositeOperation='overlay';for(let i=0;i<blobCount;i++){const x=80+rng()*608,y=80+rng()*608,r=24+rng()*72;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=`hsla(${(hue+rng()*150)%360} 80% 64% / ${.09+rng()*.15})`;ctx.fill();}ctx.restore();
    const vignette=ctx.createRadialGradient(384,360,160,384,384,520);vignette.addColorStop(.55,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(4,5,14,.55)');ctx.fillStyle=vignette;ctx.fillRect(0,0,768,768);ctx.strokeStyle='rgba(255,245,223,.8)';ctx.lineWidth=18;ctx.strokeRect(9,9,750,750);return canvas.toDataURL('image/jpeg',.9);
  }
  function mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
  function loadImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});}
  function getSubmission(playerId,round){return state.submissions.find(s=>s.playerId===playerId&&s.round===round);}
  function submissionsForRound(round){return state.submissions.filter(s=>s.round===round).sort((a,b)=>a.submitSequence-b.submitSequence);}

  function beginShowcase(round){stopShowcaseTimer();state.round=round;state.showcaseRound=round;state.showcaseQueue=submissionsForRound(round).map(s=>s.id);state.showcaseIndex=0;state.showcaseOriginal=false;state.showcaseSeconds=SHOWCASE_SECONDS;state.phase='showcase';ensureCurrentShowcaseReady();}
  async function ensureCurrentShowcaseReady(){const sub=currentShowcaseSubmission();if(!sub)return;const started=Date.now();while(!sub.aiStatus.startsWith('ready')&&Date.now()-started<8000){render();await sleep(250);}if(!sub.aiStatus.startsWith('ready')){sub.aiImage=await createDemoInterpretation(sub);sub.aiStatus='ready-demo';}sub.mediaLocked=true;state.showcaseSeconds=SHOWCASE_SECONDS;startShowcaseTimer();render();}
  function currentShowcaseSubmission(){const id=state.showcaseQueue[state.showcaseIndex];return state.submissions.find(s=>s.id===id);}
  function startShowcaseTimer(){stopShowcaseTimer();state.showcaseTimer=setInterval(()=>{state.showcaseSeconds-=1;const el=document.getElementById('showcaseTimer');if(el)el.textContent=state.showcaseSeconds;if(state.showcaseSeconds<=0)advanceShowcase();},1000);}
  function stopShowcaseTimer(){clearInterval(state.showcaseTimer);state.showcaseTimer=null;}

  function renderPhoneShowcase(){
    const sub=currentShowcaseSubmission();if(!sub)return;
    phone.innerHTML=`<div class="phone-pad handoff"><div class="phone-eyebrow">Spotlight · ${state.showcaseIndex+1}/${state.showcaseQueue.length}</div><div class="avatar">${state.players.find(p=>p.id===sub.playerId)?.avatar||'🎨'}</div><h2 class="phone-title">${escapeHTML(sub.playerName)} controls the reveal</h2><p class="phone-copy">Use the whole room if the comparison is funny. Move on early if the joke has landed.</p><div class="card" style="text-align:center;"><div class="small">AUTO ADVANCE IN</div><div id="showcaseTimer" style="font-size:42px;font-weight:1000;color:var(--navy-900);">${state.showcaseSeconds}</div></div><button id="flipShowcase" class="btn btn-dark">${state.showcaseOriginal?'Show AI interpretation':'Show my drawing'}</button><button id="doneShowcase" class="btn btn-primary">Done — next masterpiece</button></div>`;
    document.getElementById('flipShowcase').addEventListener('click',()=>{state.showcaseOriginal=!state.showcaseOriginal;render();});document.getElementById('doneShowcase').addEventListener('click',advanceShowcase);
  }

  function advanceShowcase(){if(state.phase!=='showcase')return;stopShowcaseTimer();if(state.showcaseIndex<state.showcaseQueue.length-1){state.showcaseIndex+=1;state.showcaseOriginal=false;state.showcaseSeconds=SHOWCASE_SECONDS;void ensureCurrentShowcaseReady();return;}beginVoting(state.showcaseRound);}
  function beginVoting(round){stopShowcaseTimer();state.round=round;state.voteVoterIndex=0;state.voteSelections=[];state.phase='vote';render();}
  function voteSlots(){return state.players.length>=6?3:1;}

  function renderPhoneVote(){
    const voter=state.players[state.voteVoterIndex],subs=submissionsForRound(state.round),needed=voteSlots();
    const cards=subs.map(sub=>{const isSelf=sub.playerId===voter.id,rank=state.voteSelections.indexOf(sub.playerId);return `<button class="vote-card ${isSelf?'self':''} ${rank>=0?'selected':''}" data-vote-player="${sub.playerId}" ${isSelf?'disabled':''}><img src="${sub.aiImage||sub.sketchDataUrl}" alt="${escapeHTML(sub.playerName)} interpretation">${rank>=0?`<span class="rank-badge">${rank+1}</span>`:''}<span class="name">${escapeHTML(sub.playerName)}</span></button>`;}).join('');
    phone.innerHTML=`<div class="phone-pad"><div class="phone-eyebrow">Round ${state.round} vote · ${state.voteVoterIndex+1}/${state.players.length}</div><h2 class="phone-title">${escapeHTML(voter.name)}, crown ${needed===1?'your favorite':'your top three'}.</h2><p class="phone-copy">${needed===1?'Pick the result you like most.':'Tap in order: 1st, 2nd, 3rd. Tap again to remove.'} You cannot vote for yourself.</p><div class="vote-grid">${cards}</div><div class="spacer"></div><button id="submitVote" class="btn btn-primary" ${state.voteSelections.length!==needed?'disabled':''}>Lock vote${needed>1?'s':''}</button></div>`;
    document.querySelectorAll('[data-vote-player]').forEach(btn=>btn.addEventListener('click',()=>toggleVote(btn.dataset.votePlayer)));document.getElementById('submitVote').addEventListener('click',submitVote);
  }
  function toggleVote(playerId){const needed=voteSlots(),idx=state.voteSelections.indexOf(playerId);if(idx>=0)state.voteSelections.splice(idx,1);else if(state.voteSelections.length<needed)state.voteSelections.push(playerId);renderPhoneVote();}
  function submitVote(){const voter=state.players[state.voteVoterIndex],needed=voteSlots();if(state.voteSelections.length!==needed)return;state.votes.push({round:state.round,voterId:voter.id,choices:[...state.voteSelections]});state.voteSelections=[];if(state.voteVoterIndex<state.players.length-1){state.voteVoterIndex+=1;render();return;}scoreRound(state.round);state.phase='round-results';render();}
  function scoreRound(round){const slots=voteSlots(),points=slots===1?[3]:[3,2,1],score=Object.fromEntries(state.players.map(p=>[p.id,0]));for(const vote of state.votes.filter(v=>v.round===round)){vote.choices.forEach((playerId,rank)=>{score[playerId]+=points[rank]||0;});}const weight=ROUND_WEIGHTS[round]||1;for(const player of state.players){const weighted=score[player.id]*weight;state.totalScores[player.id]=(state.totalScores[player.id]||0)+weighted;score[player.id]=weighted;}state.roundScores[round]=score;}

  function renderPhoneRoundResults(){
    const next=state.round===1?'Show Round 2':'See final crown';
    phone.innerHTML=`<div class="phone-pad handoff"><div class="phone-eyebrow">Round ${state.round} scored</div><div class="avatar">👑</div><h2 class="phone-title">Votes are in.</h2><p class="phone-copy">Round ${state.round} used a ${ROUND_WEIGHTS[state.round]}× score weight. This is a prototype tuning choice, not a locked production rule.</p><button id="continueResults" class="btn btn-primary">${next}</button></div>`;
    document.getElementById('continueResults').addEventListener('click',()=>{if(state.round===1)beginShowcase(2);else{state.phase='final';render();}});
  }
  function renderPhoneFinal(){phone.innerHTML=`<div class="phone-pad handoff"><div class="phone-eyebrow">Prototype complete</div><div class="avatar">🕊️👑</div><h2 class="phone-title">That’s the loop.</h2><p class="phone-copy">Restart to test different prompts, group sizes, and AI looseness levels.</p><button id="restart" class="btn btn-primary">Play again</button></div>`;document.getElementById('restart').addEventListener('click',resetGame);}
  function resetGame(){stopDrawingTimer();stopShowcaseTimer();Object.assign(state,{phase:'setup',players:[],prompts:{},round:0,currentPlayerIndex:0,submissions:[],submitSequence:0,drawingSeconds:DRAW_SECONDS,showcaseRound:0,showcaseQueue:[],showcaseIndex:0,showcaseOriginal:false,showcaseSeconds:SHOWCASE_SECONDS,voteVoterIndex:0,voteSelections:[],votes:[],roundScores:{},totalScores:{},strokes:[],activeStroke:null});render();}

  window.RoyalMisreadPrototype={snapshot:()=>JSON.parse(JSON.stringify({phase:state.phase,round:state.round,players:state.players,submissions:state.submissions.map(s=>({id:s.id,playerId:s.playerId,round:s.round,aiStatus:s.aiStatus,submitSequence:s.submitSequence})),votes:state.votes,totalScores:state.totalScores,config:state.config}))};
  render(); void detectLiveAI();
})();
