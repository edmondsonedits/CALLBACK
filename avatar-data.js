(() => {
  'use strict';
  const COLORS = {
    skin: {
      porcelain: '#F8DCCB', fair: '#F0C5A8', rosy: '#E7B092', warm: '#DDA17C', tan: '#C88662', brown: '#986046', deep: '#67412F'
    },
    hair: {
      black: '#22212A', espresso: '#332522', darkBrown: '#4A302A', brown: '#684238', auburn: '#8A4435', copper: '#B95F3E', strawberry: '#C87958', blonde: '#D5B56F', ashBlonde: '#BBA77B', gray: '#8B8F98', white: '#EEE9DF'
    },
    eyes: { blue: '#5C83A9', grayBlue: '#748798', green: '#6E8C72', hazel: '#8B774D', brown: '#64483A', dark: '#2E3037' },
    outfit: { navy: '#263F79', blue: '#4D77C5', teal: '#3E8587', charcoal: '#424754', black: '#2D303A', red: '#B94A53', green: '#4E765D', gray: '#7A8190', cream: '#D9CBB3', white: '#E9E6DF' },
    accent: { yellow: '#D6A93A', green: '#42785B', blue: '#557AAE', red: '#B84E55', gray: '#6D7380', brown: '#75513C', black: '#2B2D35' }
  };

  const OPTIONS = {
    faceShape: ['round','oval','long','square','heart','softSquare','diamond'],
    skin: Object.keys(COLORS.skin),
    ageDetail: ['none','smileLines','forehead','mature'],
    hairStyle: ['none','buzz','crop','spikyCrop','sidepart','sweptUp','receding','waves','bob','layeredBob','pixie','shortCurls','tightCurls','shoulderCurls','long','lowPony','ponytail','bun','braid'],
    hairColor: Object.keys(COLORS.hair),
    browStyle: ['soft','straight','arched','thick','fine','raised'],
    browColor: Object.keys(COLORS.hair),
    eyeStyle: ['round','almond','narrow','happy','wide','soft','lashes'],
    eyeColor: Object.keys(COLORS.eyes),
    noseStyle: ['dot','small','round','straight','wide','long','button'],
    mouthStyle: ['smile','toothy','wideSmile','smirk','softSmile','open','neutral','thinSmile'],
    glasses: ['none','square','softSquare','round','catEye','sunglasses'],
    facialHair: ['none','stubble','moustache','goatee','shortBeard','fullBeard'],
    facialHairColor: Object.keys(COLORS.hair),
    outfit: ['tee','polo','button','openShirt','plaid','floral','dress','suit','hoodie','vest','pfd'],
    outfitColor: Object.keys(COLORS.outfit),
    hat: ['none','blackCap','grayCap','sunHat','bucketHat','beanie'],
    extras: ['freckles','earrings','necklace','crossbody','choker'],
    bodyBuild: ['slim','average','broad']
  };

  const FEATURE_CATEGORIES = [
    { id:'face', label:'Face', icon:'◯' },
    { id:'hair', label:'Hair', icon:'✦' },
    { id:'brows', label:'Brows', icon:'⌁' },
    { id:'eyes', label:'Eyes', icon:'◉' },
    { id:'nose', label:'Nose', icon:'△' },
    { id:'mouth', label:'Mouth', icon:'⌣' },
    { id:'facialHair', label:'Beard', icon:'〰' },
    { id:'glasses', label:'Glasses', icon:'▣' },
    { id:'outfit', label:'Outfit', icon:'▥' },
    { id:'extras', label:'Extras', icon:'＋' },
    { id:'body', label:'Body', icon:'↕' }
  ];

  const DEFAULT_AVATAR = {
    faceShape:'oval', skin:'fair', ageDetail:'none', faceWidth:1, faceHeight:1,
    hairStyle:'sidepart', hairColor:'brown', hairFlip:false, hairline:0,
    browStyle:'soft', browColor:'brown', browAngle:0, browHeight:0, browSpacing:0,
    eyeStyle:'almond', eyeColor:'blue', eyeSize:1, eyeSpacing:0, eyeHeight:0, eyeTilt:0,
    noseStyle:'small', noseSize:1, noseHeight:0,
    mouthStyle:'smile', mouthWidth:1, mouthHeight:0,
    glasses:'none', glassesColor:'black', glassesSize:1, glassesHeight:0,
    facialHair:'none', facialHairColor:'brown', facialHairSize:1,
    outfit:'tee', outfitColor:'blue', outfitAccent:'yellow',
    hat:'none', extras:[], bodyBuild:'average', bodyHeight:1, bodyWidth:1,
    personality:'none'
  };

  const FAMILY_PRESETS = {
    Virginia: {
      note:'Soft round face · brown layered hair · sun hat + dark sunglasses · floral top',
      avatar:{...DEFAULT_AVATAR, faceShape:'round', skin:'rosy', ageDetail:'smileLines', faceWidth:1.06, faceHeight:.98, hairStyle:'layeredBob', hairColor:'brown', browStyle:'soft', browColor:'brown', eyeStyle:'soft', eyeColor:'brown', eyeSize:.96, eyeSpacing:1, noseStyle:'round', noseSize:1.02, mouthStyle:'softSmile', mouthWidth:1.03, glasses:'sunglasses', glassesSize:1.04, outfit:'floral', outfitColor:'white', outfitAccent:'blue', hat:'sunHat', extras:[], bodyBuild:'average', bodyWidth:1.06, personality:'glasses'}
    },
    Gregory: {
      note:'Broad face · black square glasses · full white beard · black cap · blue polo',
      avatar:{...DEFAULT_AVATAR, faceShape:'softSquare', skin:'rosy', ageDetail:'mature', faceWidth:1.1, faceHeight:.98, hairStyle:'receding', hairColor:'white', browStyle:'thick', browColor:'gray', eyeStyle:'soft', eyeColor:'brown', eyeSize:.94, eyeSpacing:2, noseStyle:'wide', noseSize:1.08, mouthStyle:'softSmile', mouthWidth:.98, glasses:'square', glassesSize:1.08, facialHair:'fullBeard', facialHairColor:'white', facialHairSize:1.08, outfit:'polo', outfitColor:'blue', hat:'blackCap', bodyBuild:'broad', bodyWidth:1.08, personality:'beard'}
    },
    Aaron: {
      note:'Long oval face · short brown hair under black cap · gray tee · cross-body bag',
      avatar:{...DEFAULT_AVATAR, faceShape:'long', skin:'fair', faceWidth:.96, faceHeight:1.06, hairStyle:'crop', hairColor:'darkBrown', browStyle:'straight', browColor:'darkBrown', eyeStyle:'narrow', eyeColor:'blue', eyeSize:.94, eyeSpacing:1, noseStyle:'straight', noseSize:.98, mouthStyle:'thinSmile', mouthWidth:.96, facialHair:'none', outfit:'tee', outfitColor:'gray', hat:'blackCap', extras:['crossbody'], bodyBuild:'slim', bodyHeight:1.04, bodyWidth:.96, personality:'hat'}
    },
    Liv: {
      note:'Heart-shaped face · tight copper curls · bright smile · earrings · charcoal overshirt',
      avatar:{...DEFAULT_AVATAR, faceShape:'heart', skin:'fair', faceWidth:1.0, faceHeight:.98, hairStyle:'tightCurls', hairColor:'copper', browStyle:'arched', browColor:'copper', eyeStyle:'happy', eyeColor:'green', eyeSize:1.02, eyeSpacing:0, noseStyle:'small', noseSize:.92, mouthStyle:'wideSmile', mouthWidth:1.13, outfit:'button', outfitColor:'charcoal', outfitAccent:'yellow', hat:'none', extras:['earrings','crossbody'], bodyBuild:'slim', bodyWidth:.94, personality:'curls'}
    },
    Danny: {
      note:'Tall narrow face · auburn hair swept up · blue eyes · freckles · patterned blue shirt',
      avatar:{...DEFAULT_AVATAR, faceShape:'long', skin:'fair', faceWidth:.94, faceHeight:1.08, hairStyle:'sweptUp', hairColor:'auburn', browStyle:'straight', browColor:'auburn', eyeStyle:'almond', eyeColor:'blue', eyeSize:1.01, eyeSpacing:0, noseStyle:'straight', noseSize:.98, noseHeight:1, mouthStyle:'toothy', mouthWidth:1.06, facialHair:'none', outfit:'openShirt', outfitColor:'blue', outfitAccent:'teal', hat:'none', extras:['freckles'], bodyBuild:'slim', bodyHeight:1.08, bodyWidth:.9, personality:'none'}
    },
    Kristin: {
      note:'Soft heart face · strawberry-red tied-back hair · blue eyes · warm smile · black sleeveless top',
      avatar:{...DEFAULT_AVATAR, faceShape:'heart', skin:'fair', faceWidth:.98, faceHeight:1.01, hairStyle:'lowPony', hairColor:'strawberry', browStyle:'soft', browColor:'strawberry', eyeStyle:'soft', eyeColor:'blue', eyeSize:1.02, eyeSpacing:0, noseStyle:'small', noseSize:.95, mouthStyle:'toothy', mouthWidth:1.08, outfit:'tee', outfitColor:'black', hat:'none', extras:['crossbody'], bodyBuild:'slim', bodyWidth:.92, personality:'none'}
    },
    Doug: {
      note:'Long face · square glasses · short gray hair · light beard/stubble · outdoors look',
      avatar:{...DEFAULT_AVATAR, faceShape:'long', skin:'rosy', ageDetail:'smileLines', faceWidth:.96, faceHeight:1.06, hairStyle:'receding', hairColor:'gray', browStyle:'straight', browColor:'gray', eyeStyle:'soft', eyeColor:'blue', eyeSize:.95, eyeSpacing:1, noseStyle:'long', noseSize:1.03, mouthStyle:'softSmile', mouthWidth:1.0, glasses:'square', glassesSize:1.02, facialHair:'shortBeard', facialHairColor:'gray', facialHairSize:.9, outfit:'tee', outfitColor:'charcoal', hat:'bucketHat', bodyBuild:'average', bodyHeight:1.03, personality:'glasses'}
    },
    Ruth: {
      note:'Soft oval face · short tousled blonde hair · bright eyes · broad smile · geometric top',
      avatar:{...DEFAULT_AVATAR, faceShape:'oval', skin:'fair', ageDetail:'smileLines', faceWidth:1.0, faceHeight:1.02, hairStyle:'pixie', hairColor:'ashBlonde', browStyle:'soft', browColor:'ashBlonde', eyeStyle:'soft', eyeColor:'grayBlue', eyeSize:1.03, eyeSpacing:0, noseStyle:'small', noseSize:.96, mouthStyle:'wideSmile', mouthWidth:1.1, outfit:'button', outfitColor:'gray', outfitAccent:'red', hat:'none', extras:['earrings'], bodyBuild:'slim', bodyWidth:.94, personality:'none'}
    },
    Judy: {
      note:'Round face · reddish bob with bangs · blue-dark glasses · blue plaid shirt',
      avatar:{...DEFAULT_AVATAR, faceShape:'round', skin:'fair', ageDetail:'smileLines', faceWidth:1.04, hairStyle:'bob', hairColor:'auburn', browStyle:'soft', browColor:'auburn', eyeStyle:'soft', eyeColor:'brown', eyeSize:.98, noseStyle:'round', noseSize:1.01, mouthStyle:'toothy', mouthWidth:1.06, glasses:'softSquare', glassesSize:1.04, facialHair:'none', outfit:'plaid', outfitColor:'blue', hat:'none', bodyBuild:'average', personality:'glasses'}
    },
    Brandon: {
      note:'Narrow oval face · tidy brown side-part · blue-gray eyes · short neat beard · green tie',
      avatar:{...DEFAULT_AVATAR, faceShape:'long', skin:'fair', faceWidth:.92, faceHeight:1.08, hairStyle:'sidepart', hairColor:'darkBrown', browStyle:'straight', browColor:'darkBrown', eyeStyle:'almond', eyeColor:'grayBlue', eyeSize:.98, eyeSpacing:0, noseStyle:'straight', noseSize:1.0, mouthStyle:'toothy', mouthWidth:1.03, facialHair:'shortBeard', facialHairColor:'darkBrown', facialHairSize:.82, outfit:'suit', outfitColor:'gray', outfitAccent:'green', hat:'none', bodyBuild:'slim', bodyHeight:1.06, bodyWidth:.92, personality:'none'}
    },
    Emily: {
      note:'Heart face · shoulder-length dark curls · blue eyes · big smile · red top + choker',
      avatar:{...DEFAULT_AVATAR, faceShape:'heart', skin:'fair', faceWidth:.99, faceHeight:1.01, hairStyle:'shoulderCurls', hairColor:'darkBrown', browStyle:'arched', browColor:'darkBrown', eyeStyle:'lashes', eyeColor:'blue', eyeSize:1.04, eyeSpacing:0, noseStyle:'small', noseSize:.93, mouthStyle:'wideSmile', mouthWidth:1.12, outfit:'dress', outfitColor:'red', hat:'none', extras:['choker','necklace'], bodyBuild:'slim', bodyWidth:.95, personality:'curls'}
    },
    Jaclyne: {
      note:'Oval face · dark braid/pony under cap · bright eyes · wide smile · green outdoor vest',
      avatar:{...DEFAULT_AVATAR, faceShape:'oval', skin:'fair', faceWidth:.99, faceHeight:1.02, hairStyle:'braid', hairColor:'darkBrown', browStyle:'soft', browColor:'darkBrown', eyeStyle:'almond', eyeColor:'grayBlue', eyeSize:1.01, eyeSpacing:0, noseStyle:'small', noseSize:.96, mouthStyle:'toothy', mouthWidth:1.08, outfit:'pfd', outfitColor:'green', outfitAccent:'black', hat:'grayCap', extras:[], bodyBuild:'slim', bodyWidth:.94, personality:'hat'}
    },
    Alex: {
      note:'Long slim face · messy light-blond hair · blue eyes · light stubble · outdoorsy teal shirt',
      avatar:{...DEFAULT_AVATAR, faceShape:'long', skin:'fair', faceWidth:.93, faceHeight:1.08, hairStyle:'spikyCrop', hairColor:'blonde', browStyle:'straight', browColor:'ashBlonde', eyeStyle:'almond', eyeColor:'blue', eyeSize:.99, noseStyle:'straight', noseSize:.98, mouthStyle:'toothy', mouthWidth:1.06, facialHair:'stubble', facialHairColor:'ashBlonde', outfit:'tee', outfitColor:'teal', hat:'none', bodyBuild:'slim', bodyHeight:1.07, bodyWidth:.9, personality:'none'}
    }
  };

  const ANIMATIONS = [
    ['idle','Idle','🙂'], ['look-left','Look left','👀'], ['look-right','Look right','👀'], ['wave','Wave','👋'], ['think','Think','🤔'], ['laugh','Laugh','😂'], ['shock','Shock','😲'], ['sad','Sad','😔'], ['cheer','Cheer','🙌'], ['point','Point','👉'], ['dance','Dance','🕺'], ['victory','Victory','🏆']
  ];

  window.CallbackAvatarData = { COLORS, OPTIONS, FEATURE_CATEGORIES, DEFAULT_AVATAR, FAMILY_PRESETS, ANIMATIONS };
})();
