(() => {
  'use strict';

  const SKIN_TONES = {
    porcelain: '#F7D7C4',
    fair: '#EFC3A6',
    warm: '#DFA47F',
    tan: '#C7845F',
    brown: '#9B5E43',
    deep: '#68402F'
  };

  const HAIR_COLORS = {
    black: '#24212A',
    darkBrown: '#3A2725',
    brown: '#684234',
    auburn: '#8D4434',
    copper: '#B85E3E',
    blonde: '#D6B46C',
    gray: '#8D929E',
    white: '#ECE8DE'
  };

  const OUTFIT_COLORS = {
    navy: '#233E79',
    blue: '#4F77C8',
    red: '#C74C55',
    teal: '#3B8485',
    yellow: '#E8B839',
    plum: '#764E84',
    green: '#4F7C62',
    black: '#2E3140',
    cream: '#D7C7AA'
  };

  const OPTIONS = {
    face: ['round', 'oval', 'square', 'heart', 'long'],
    skin: Object.keys(SKIN_TONES),
    hair: ['none', 'crop', 'sidepart', 'waves', 'curls', 'shortCurls', 'bob', 'long', 'bun', 'ponytail', 'shag', 'buzz', 'receding'],
    hairColor: Object.keys(HAIR_COLORS),
    eyes: ['round', 'happy', 'narrow', 'big', 'lashes'],
    mouth: ['smile', 'grin', 'smirk', 'open', 'neutral'],
    glasses: ['none', 'square', 'round', 'sunglasses'],
    facialHair: ['none', 'stubble', 'moustache', 'goatee', 'beard'],
    outfit: ['tee', 'polo', 'plaid', 'patterned', 'dress', 'suit', 'hoodie', 'vest', 'outdoor'],
    outfitColor: Object.keys(OUTFIT_COLORS),
    accessory: ['none', 'blackCap', 'blueCap', 'sunHat', 'bucketHat', 'earrings', 'necklace', 'crossbody', 'freckles']
  };

  const LABELS = {
    face: 'Face', skin: 'Skin', hair: 'Hair', hairColor: 'Hair colour', eyes: 'Eyes', mouth: 'Mouth',
    glasses: 'Glasses', facialHair: 'Facial hair', outfit: 'Outfit', outfitColor: 'Outfit colour', accessory: 'Hat / accessory'
  };

  const FAMILY_PRESETS = {
    Virginia: {
      face: 'round', skin: 'fair', hair: 'waves', hairColor: 'brown', eyes: 'happy', mouth: 'smile',
      glasses: 'sunglasses', facialHair: 'none', outfit: 'patterned', outfitColor: 'teal', accessory: 'sunHat', personality: 'glasses'
    },
    Gregory: {
      face: 'square', skin: 'fair', hair: 'receding', hairColor: 'white', eyes: 'round', mouth: 'smile',
      glasses: 'square', facialHair: 'beard', outfit: 'polo', outfitColor: 'blue', accessory: 'blackCap', personality: 'beard'
    },
    Aaron: {
      face: 'oval', skin: 'fair', hair: 'crop', hairColor: 'brown', eyes: 'round', mouth: 'smile',
      glasses: 'none', facialHair: 'stubble', outfit: 'tee', outfitColor: 'black', accessory: 'crossbody', personality: 'hat'
    },
    Liv: {
      face: 'heart', skin: 'fair', hair: 'shortCurls', hairColor: 'copper', eyes: 'lashes', mouth: 'grin',
      glasses: 'none', facialHair: 'none', outfit: 'tee', outfitColor: 'cream', accessory: 'earrings', personality: 'curls'
    },
    Danny: {
      face: 'oval', skin: 'fair', hair: 'sidepart', hairColor: 'auburn', eyes: 'round', mouth: 'smirk',
      glasses: 'none', facialHair: 'stubble', outfit: 'patterned', outfitColor: 'navy', accessory: 'freckles', personality: 'none'
    },
    Kristin: {
      face: 'heart', skin: 'fair', hair: 'ponytail', hairColor: 'copper', eyes: 'lashes', mouth: 'smile',
      glasses: 'none', facialHair: 'none', outfit: 'tee', outfitColor: 'black', accessory: 'none', personality: 'none'
    },
    Doug: {
      face: 'oval', skin: 'fair', hair: 'crop', hairColor: 'gray', eyes: 'round', mouth: 'smile',
      glasses: 'square', facialHair: 'stubble', outfit: 'outdoor', outfitColor: 'green', accessory: 'bucketHat', personality: 'glasses'
    },
    Ruth: {
      face: 'round', skin: 'fair', hair: 'shortCurls', hairColor: 'blonde', eyes: 'happy', mouth: 'grin',
      glasses: 'none', facialHair: 'none', outfit: 'tee', outfitColor: 'blue', accessory: 'none', personality: 'curls'
    },
    Judy: {
      face: 'round', skin: 'fair', hair: 'bob', hairColor: 'auburn', eyes: 'round', mouth: 'smile',
      glasses: 'square', facialHair: 'none', outfit: 'plaid', outfitColor: 'blue', accessory: 'none', personality: 'glasses'
    },
    Brandon: {
      face: 'square', skin: 'fair', hair: 'crop', hairColor: 'darkBrown', eyes: 'narrow', mouth: 'smile',
      glasses: 'none', facialHair: 'stubble', outfit: 'suit', outfitColor: 'navy', accessory: 'none', personality: 'none'
    },
    Emily: {
      face: 'heart', skin: 'warm', hair: 'curls', hairColor: 'darkBrown', eyes: 'lashes', mouth: 'grin',
      glasses: 'none', facialHair: 'none', outfit: 'dress', outfitColor: 'red', accessory: 'earrings', personality: 'curls'
    },
    Jaclyne: {
      face: 'oval', skin: 'fair', hair: 'ponytail', hairColor: 'darkBrown', eyes: 'round', mouth: 'smile',
      glasses: 'none', facialHair: 'none', outfit: 'vest', outfitColor: 'green', accessory: 'blackCap', personality: 'hat'
    },
    Alex: {
      face: 'long', skin: 'fair', hair: 'shag', hairColor: 'blonde', eyes: 'narrow', mouth: 'smile',
      glasses: 'none', facialHair: 'stubble', outfit: 'outdoor', outfitColor: 'teal', accessory: 'none', personality: 'none'
    }
  };

  const DEFAULT_AVATAR = {
    face: 'round', skin: 'fair', hair: 'sidepart', hairColor: 'brown', eyes: 'round', mouth: 'smile',
    glasses: 'none', facialHair: 'none', outfit: 'tee', outfitColor: 'blue', accessory: 'none', personality: 'none'
  };

  const ANIMATIONS = ['idle', 'look-left', 'look-right', 'wave', 'think', 'laugh', 'shock', 'sad', 'cheer', 'point', 'dance', 'victory'];

  const state = {
    name: 'Custom Player',
    avatar: { ...DEFAULT_AVATAR },
    preset: null,
    animation: 'idle',
    lobby: ['Virginia', 'Gregory', 'Liv', 'Danny'].map(name => ({ name, avatar: { ...FAMILY_PRESETS[name] }, preset: name }))
  };

  const dom = {
    avatarStage: document.getElementById('avatarStage'),
    avatarName: document.getElementById('avatarName'),
    statusPill: document.getElementById('statusPill'),
    playerName: document.getElementById('playerName'),
    editorSections: document.getElementById('editorSections'),
    presetGrid: document.getElementById('presetGrid'),
    animationGrid: document.getElementById('animationGrid'),
    payloadPreview: document.getElementById('payloadPreview'),
    lobbyGrid: document.getElementById('lobbyGrid'),
    savedBanner: document.getElementById('savedBanner'),
    randomizeBtn: document.getElementById('randomizeBtn'),
    resetBtn: document.getElementById('resetBtn'),
    doneBtn: document.getElementById('doneBtn'),
    addToLobbyBtn: document.getElementById('addToLobbyBtn')
  };

  function titleCase(value) {
    return value.replace(/([A-Z])/g, ' $1').replace(/[-_]/g, ' ').replace(/^./, c => c.toUpperCase());
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function facePath(shape) {
    const paths = {
      round: 'M118 73 C88 76 68 101 70 139 C72 182 94 207 120 209 C149 208 169 182 170 139 C171 101 151 76 118 73 Z',
      oval: 'M120 68 C89 69 72 95 73 139 C74 184 94 211 120 212 C147 211 166 184 167 139 C168 96 151 69 120 68 Z',
      square: 'M91 77 Q73 86 73 111 L76 170 Q79 202 119 210 Q160 201 165 170 L168 111 Q167 86 148 77 Z',
      heart: 'M120 78 C99 63 72 79 72 115 C72 160 91 194 120 211 C148 194 168 160 168 115 C168 79 141 63 120 78 Z',
      long: 'M120 65 C92 66 77 90 77 136 C77 188 95 219 120 221 C146 219 163 188 163 136 C163 90 148 66 120 65 Z'
    };
    return paths[shape] || paths.round;
  }

  function hairSvg(style, color) {
    const c = color;
    const common = `fill="${c}" stroke="#172038" stroke-width="3" stroke-linejoin="round"`;
    const styles = {
      none: '',
      crop: `<path ${common} d="M78 109 Q81 69 119 67 Q159 66 165 106 Q150 90 133 92 Q114 79 96 94 Q88 98 78 109Z"/>`,
      sidepart: `<path ${common} d="M76 111 Q76 69 119 66 Q158 65 165 104 Q145 88 122 91 Q100 80 77 111Z"/><path ${common} d="M118 69 Q130 68 145 72" fill="none"/>`,
      waves: `<path ${common} d="M77 119 Q72 88 92 75 Q105 64 120 70 Q136 61 153 76 Q169 88 163 117 Q154 101 143 105 Q132 90 120 102 Q106 87 95 103 Q86 97 77 119Z"/>`,
      curls: `<g ${common}>${[[82,103,18],[91,84,18],[110,75,19],[132,77,19],[151,90,18],[159,109,17],[81,125,16],[156,129,16]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`,
      shortCurls: `<g ${common}>${[[87,101,16],[96,82,16],[116,75,17],[137,80,16],[153,97,16],[158,116,14],[81,118,14]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`,
      bob: `<path ${common} d="M76 107 Q79 69 119 67 Q160 67 166 108 L160 165 Q151 146 153 108 Q139 91 121 91 Q100 89 85 108 Q87 145 78 163Z"/>`,
      long: `<path ${common} d="M76 109 Q77 67 120 65 Q163 67 166 109 L164 189 Q151 173 153 111 Q139 90 120 91 Q99 89 86 111 Q88 173 76 191Z"/>`,
      bun: `<circle ${common} cx="150" cy="78" r="23"/><path ${common} d="M78 111 Q79 72 118 68 Q154 67 164 104 Q146 91 124 92 Q103 82 78 111Z"/>`,
      ponytail: `<path ${common} d="M76 111 Q77 70 119 67 Q158 67 164 106 Q146 91 122 92 Q101 82 76 111Z"/><path ${common} d="M158 93 Q183 104 175 141 Q168 162 154 170 Q165 135 155 116Z"/>`,
      shag: `<path ${common} d="M75 116 Q68 90 88 77 L94 63 L109 72 L119 57 L130 72 L147 63 L151 79 Q170 91 164 119 L150 106 L139 112 L127 98 L114 111 L101 97 L90 112Z"/>`,
      buzz: `<path ${common} d="M79 103 Q85 68 119 67 Q154 68 161 104 Q145 91 122 92 Q99 88 79 103Z" opacity=".92"/>`,
      receding: `<path ${common} d="M82 102 Q88 77 106 70 Q101 88 103 98 Q118 91 137 99 Q139 86 134 71 Q155 79 160 104 Q142 96 123 98 Q101 94 82 102Z"/>`
    };
    return `<g class="hair-detail">${styles[style] || ''}</g>`;
  }

  function eyesSvg(style) {
    const iris = '#172038';
    const styles = {
      round: `<circle cx="101" cy="139" r="5.5" fill="${iris}"/><circle cx="139" cy="139" r="5.5" fill="${iris}"/>`,
      happy: `<path d="M94 140 Q101 133 108 140" fill="none" stroke="${iris}" stroke-width="4" stroke-linecap="round"/><path d="M132 140 Q139 133 146 140" fill="none" stroke="${iris}" stroke-width="4" stroke-linecap="round"/>`,
      narrow: `<path d="M94 139 Q101 143 108 139" fill="none" stroke="${iris}" stroke-width="4" stroke-linecap="round"/><path d="M132 139 Q139 143 146 139" fill="none" stroke="${iris}" stroke-width="4" stroke-linecap="round"/>`,
      big: `<ellipse cx="101" cy="139" rx="7" ry="8" fill="${iris}"/><ellipse cx="139" cy="139" rx="7" ry="8" fill="${iris}"/><circle cx="99" cy="136" r="1.8" fill="#fff"/><circle cx="137" cy="136" r="1.8" fill="#fff"/>`,
      lashes: `<ellipse cx="101" cy="139" rx="6" ry="7" fill="${iris}"/><ellipse cx="139" cy="139" rx="6" ry="7" fill="${iris}"/><path d="M94 131 l-4 -4 M99 130 l-1 -5 M146 131 l4 -4 M141 130 l1 -5" stroke="${iris}" stroke-width="2" stroke-linecap="round"/>`
    };
    return styles[style] || styles.round;
  }

  function mouthSvg(style) {
    const stroke = '#6A3040';
    const styles = {
      smile: `<path d="M104 174 Q120 185 136 174" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>`,
      grin: `<path d="M103 171 Q120 190 137 171 Q120 178 103 171Z" fill="#FFFFFF" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>`,
      smirk: `<path d="M105 177 Q120 182 135 173" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>`,
      open: `<ellipse cx="120" cy="177" rx="12" ry="9" fill="#722D3B"/><path d="M112 176 Q120 170 128 176" stroke="#F4C7C1" stroke-width="3"/>`,
      neutral: `<path d="M108 177 L132 177" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>`
    };
    return styles[style] || styles.smile;
  }

  function glassesSvg(style) {
    if (style === 'none') return '<g class="glasses-detail"></g>';
    const frame = '#1C2338';
    if (style === 'sunglasses') {
      return `<g class="glasses-detail"><rect x="84" y="128" width="31" height="23" rx="8" fill="#232A3D" stroke="${frame}" stroke-width="4"/><rect x="125" y="128" width="31" height="23" rx="8" fill="#232A3D" stroke="${frame}" stroke-width="4"/><path d="M115 137 Q120 133 125 137 M83 134 L77 132 M157 134 L163 132" fill="none" stroke="${frame}" stroke-width="4" stroke-linecap="round"/></g>`;
    }
    const shape = style === 'round'
      ? `<circle cx="100" cy="139" r="15" fill="rgba(255,255,255,.08)" stroke="${frame}" stroke-width="4"/><circle cx="140" cy="139" r="15" fill="rgba(255,255,255,.08)" stroke="${frame}" stroke-width="4"/>`
      : `<rect x="84" y="126" width="32" height="27" rx="7" fill="rgba(255,255,255,.07)" stroke="${frame}" stroke-width="4"/><rect x="124" y="126" width="32" height="27" rx="7" fill="rgba(255,255,255,.07)" stroke="${frame}" stroke-width="4"/>`;
    return `<g class="glasses-detail">${shape}<path d="M116 138 L124 138 M84 134 L77 132 M156 134 L163 132" fill="none" stroke="${frame}" stroke-width="4" stroke-linecap="round"/></g>`;
  }

  function facialHairSvg(style, color) {
    const c = color;
    if (style === 'none') return '<g class="beard-detail"></g>';
    if (style === 'stubble') return `<g class="beard-detail" fill="${c}" opacity=".42">${[[99,169],[108,185],[120,189],[132,185],[141,169],[100,183],[140,183]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8"/>`).join('')}</g>`;
    if (style === 'moustache') return `<g class="beard-detail"><path d="M101 165 Q110 158 120 166 Q130 158 139 165 Q131 176 120 169 Q109 176 101 165Z" fill="${c}" stroke="#172038" stroke-width="2"/></g>`;
    if (style === 'goatee') return `<g class="beard-detail"><path d="M104 165 Q111 159 120 166 Q129 159 136 165 Q128 173 120 169 Q112 173 104 165Z" fill="${c}"/><path d="M111 182 Q120 196 129 182 Q128 205 120 209 Q112 205 111 182Z" fill="${c}"/></g>`;
    return `<g class="beard-detail"><path d="M88 162 Q91 202 120 217 Q149 202 152 162 Q142 169 137 184 Q120 193 103 184 Q98 169 88 162Z" fill="${c}" stroke="#172038" stroke-width="3"/><path d="M101 164 Q110 157 120 165 Q130 157 139 164 Q131 174 120 168 Q109 174 101 164Z" fill="${c}"/></g>`;
  }

  function outfitSvg(style, color, skin) {
    const stroke = '#172038';
    const base = `<path d="M80 226 Q92 208 111 205 L129 205 Q148 208 160 226 L171 292 L69 292 Z" fill="${color}" stroke="${stroke}" stroke-width="4" stroke-linejoin="round"/>`;
    const neck = `<path d="M109 202 Q120 215 131 202 L133 224 Q120 233 107 224Z" fill="${skin}" stroke="${stroke}" stroke-width="3"/>`;
    const styles = {
      tee: `${base}${neck}`,
      polo: `${base}${neck}<path d="M107 214 L120 226 L133 214" fill="none" stroke="#EDF2FF" stroke-width="4" stroke-linejoin="round"/><path d="M120 226 L120 247" stroke="#EDF2FF" stroke-width="3"/>`,
      plaid: `${base}${neck}<g opacity=".42" stroke="#F4E9D3" stroke-width="4"><path d="M84 244 H157 M78 266 H164 M101 219 V291 M137 219 V291"/></g>`,
      patterned: `${base}${neck}<g fill="#F5D68F" opacity=".75"><circle cx="95" cy="244" r="5"/><circle cx="126" cy="258" r="5"/><circle cx="146" cy="236" r="4"/><path d="M87 276 l8 -8 8 8 -8 8Z"/><path d="M138 278 l7 -7 7 7 -7 7Z"/></g>`,
      dress: `${base}${neck}<path d="M92 217 Q120 237 148 217" fill="none" stroke="#F8DBE2" stroke-width="4"/>`,
      suit: `${base}${neck}<path d="M92 215 L112 240 L101 289 M148 215 L128 240 L139 289" fill="none" stroke="#E7ECFB" stroke-width="4"/><path d="M116 224 L124 224 L128 261 L120 270 L112 261Z" fill="#A63E4A"/>`,
      hoodie: `${base}${neck}<path d="M91 223 Q120 205 149 223" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="7"/><path d="M111 225 L108 246 M129 225 L132 246" stroke="#E9ECF4" stroke-width="3"/>`,
      vest: `${base}${neck}<path d="M103 210 L103 292 M137 210 L137 292" stroke="#172038" stroke-width="4"/><path d="M88 249 H104 M136 249 H153" stroke="#E7EBD9" stroke-width="4"/>`,
      outdoor: `${base}${neck}<path d="M83 232 H157 M88 252 H152" stroke="#E7E1C8" stroke-width="4" opacity=".7"/><rect x="88" y="259" width="24" height="20" rx="4" fill="rgba(0,0,0,.15)"/><rect x="128" y="259" width="24" height="20" rx="4" fill="rgba(0,0,0,.15)"/>`
    };
    return styles[style] || styles.tee;
  }

  function accessorySvg(style) {
    const stroke = '#172038';
    if (style === 'none') return '<g class="accessory-detail"></g>';
    const styles = {
      blackCap: `<g class="accessory-detail"><path d="M82 93 Q91 58 124 60 Q154 61 163 91 Q136 82 109 87 Q94 89 82 93Z" fill="#292D39" stroke="${stroke}" stroke-width="4"/><path d="M120 85 Q151 80 174 91 Q159 99 132 97Z" fill="#292D39" stroke="${stroke}" stroke-width="4"/></g>`,
      blueCap: `<g class="accessory-detail"><path d="M82 93 Q91 58 124 60 Q154 61 163 91 Q136 82 109 87 Q94 89 82 93Z" fill="#4267A5" stroke="${stroke}" stroke-width="4"/><path d="M120 85 Q151 80 174 91 Q159 99 132 97Z" fill="#4267A5" stroke="${stroke}" stroke-width="4"/></g>`,
      sunHat: `<g class="accessory-detail"><path d="M80 90 Q90 54 121 54 Q151 54 162 90Z" fill="#D1B57A" stroke="${stroke}" stroke-width="4"/><ellipse cx="121" cy="92" rx="66" ry="13" fill="#DCC48C" stroke="${stroke}" stroke-width="4"/><path d="M93 77 Q121 69 150 77" stroke="#7D5A45" stroke-width="5"/></g>`,
      bucketHat: `<g class="accessory-detail"><path d="M81 87 Q91 58 121 59 Q151 59 160 87 L151 101 Q121 94 90 101Z" fill="#6B7A5B" stroke="${stroke}" stroke-width="4"/><ellipse cx="121" cy="99" rx="50" ry="10" fill="#7F8C6B" stroke="${stroke}" stroke-width="4"/></g>`,
      earrings: `<g class="accessory-detail" fill="#E8C95F" stroke="#9B7629" stroke-width="2"><circle cx="72" cy="159" r="5"/><circle cx="168" cy="159" r="5"/></g>`,
      necklace: `<g class="accessory-detail"><path d="M105 219 Q120 240 135 219" fill="none" stroke="#E8C95F" stroke-width="3"/><circle cx="120" cy="237" r="4" fill="#E8C95F"/></g>`,
      crossbody: `<g class="accessory-detail"><path d="M89 215 L151 289" stroke="#413329" stroke-width="8" stroke-linecap="round"/><rect x="135" y="264" width="28" height="24" rx="5" fill="#544133" stroke="${stroke}" stroke-width="3"/></g>`,
      freckles: `<g class="accessory-detail" fill="#A66B56" opacity=".75"><circle cx="96" cy="155" r="1.7"/><circle cx="103" cy="158" r="1.4"/><circle cx="144" cy="155" r="1.7"/><circle cx="137" cy="158" r="1.4"/></g>`
    };
    return styles[style] || '<g class="accessory-detail"></g>';
  }

  function avatarSvg(config, { id = 'avatar', animation = 'idle' } = {}) {
    const c = { ...DEFAULT_AVATAR, ...config };
    const skin = SKIN_TONES[c.skin] || SKIN_TONES.fair;
    const hair = HAIR_COLORS[c.hairColor] || HAIR_COLORS.brown;
    const outfit = OUTFIT_COLORS[c.outfitColor] || OUTFIT_COLORS.blue;
    const animClass = animation === 'idle' ? '' : ` anim-${animation}`;
    const personalityClass = c.personality && c.personality !== 'none' ? ` personality-${c.personality}` : '';

    return `<svg class="avatar-svg${animClass}${personalityClass}" data-avatar-id="${escapeHtml(id)}" viewBox="0 0 240 340" role="img" aria-label="CALLBACK avatar">
      <ellipse cx="120" cy="315" rx="58" ry="10" fill="rgba(6,10,30,.22)"/>
      <g class="puppet">
        <g class="leg-left">
          <path d="M98 282 L96 314" stroke="#172038" stroke-width="15" stroke-linecap="round"/>
          <path d="M96 314 L80 316" stroke="#172038" stroke-width="13" stroke-linecap="round"/>
        </g>
        <g class="leg-right">
          <path d="M142 282 L144 314" stroke="#172038" stroke-width="15" stroke-linecap="round"/>
          <path d="M144 314 L160 316" stroke="#172038" stroke-width="13" stroke-linecap="round"/>
        </g>
        <g class="arm-left">
          <path d="M80 230 Q61 243 57 269" fill="none" stroke="#172038" stroke-width="19" stroke-linecap="round"/>
          <path d="M80 230 Q61 243 57 269" fill="none" stroke="${skin}" stroke-width="12" stroke-linecap="round"/>
          <circle cx="56" cy="273" r="8" fill="${skin}" stroke="#172038" stroke-width="3"/>
        </g>
        <g class="arm-right">
          <path d="M160 230 Q179 243 183 269" fill="none" stroke="#172038" stroke-width="19" stroke-linecap="round"/>
          <path d="M160 230 Q179 243 183 269" fill="none" stroke="${skin}" stroke-width="12" stroke-linecap="round"/>
          <circle cx="184" cy="273" r="8" fill="${skin}" stroke="#172038" stroke-width="3"/>
        </g>
        <g class="torso-group">${outfitSvg(c.outfit, outfit, skin)}</g>
        <g class="head-group">
          <path d="M82 130 Q65 135 69 153 Q72 165 83 163" fill="${skin}" stroke="#172038" stroke-width="3"/>
          <path d="M158 130 Q175 135 171 153 Q168 165 157 163" fill="${skin}" stroke="#172038" stroke-width="3"/>
          <path d="${facePath(c.face)}" fill="${skin}" stroke="#172038" stroke-width="4" stroke-linejoin="round"/>
          ${hairSvg(c.hair, hair)}
          <g class="eyes-group">${eyesSvg(c.eyes)}</g>
          <path d="M120 143 Q116 157 121 160" fill="none" stroke="#B97863" stroke-width="3" stroke-linecap="round" opacity=".75"/>
          <g class="mouth-group">${mouthSvg(c.mouth)}</g>
          ${facialHairSvg(c.facialHair, hair)}
          ${glassesSvg(c.glasses)}
          ${accessorySvg(c.accessory)}
        </g>
      </g>
    </svg>`;
  }

  function editorOptionMarkup(key, values) {
    const isColor = key === 'skin' || key === 'hairColor' || key === 'outfitColor';
    const current = state.avatar[key];
    return `<section class="option-section" data-editor-key="${key}">
      <div class="option-heading"><strong>${LABELS[key]}</strong><span class="option-value">${escapeHtml(titleCase(current))}</span></div>
      <div class="option-row">${values.map(value => {
        const active = value === current ? ' active' : '';
        let inner = titleCase(value);
        if (isColor) {
          const swatchColor = key === 'skin' ? SKIN_TONES[value] : key === 'hairColor' ? HAIR_COLORS[value] : OUTFIT_COLORS[value];
          inner = `<span class="swatch" style="background:${swatchColor}"></span>`;
        }
        return `<button type="button" class="option-chip${isColor ? ' swatch-chip' : ''}${active}" data-value="${value}" aria-label="${LABELS[key]}: ${titleCase(value)}" title="${titleCase(value)}">${inner}</button>`;
      }).join('')}</div>
    </section>`;
  }

  function renderEditor() {
    dom.editorSections.innerHTML = Object.entries(OPTIONS).map(([key, values]) => editorOptionMarkup(key, values)).join('');
    dom.editorSections.querySelectorAll('.option-section').forEach(section => {
      const key = section.dataset.editorKey;
      section.querySelectorAll('.option-chip').forEach(button => {
        button.addEventListener('click', () => {
          state.avatar[key] = button.dataset.value;
          if (key !== 'outfitColor' && key !== 'hairColor' && key !== 'skin') state.preset = null;
          state.animation = 'idle';
          renderAll();
        });
      });
    });
  }

  function renderPresets() {
    dom.presetGrid.innerHTML = Object.entries(FAMILY_PRESETS).map(([name, avatar]) => {
      const active = state.preset === name ? ' active' : '';
      return `<button type="button" class="preset-card${active}" data-preset="${name}" aria-label="Load ${name} preset">
        <div class="preset-mini">${avatarSvg(avatar, { id: `preset-${name}` })}</div>
        <strong>${name}</strong>
        <small>Tap to edit</small>
      </button>`;
    }).join('');
    dom.presetGrid.querySelectorAll('.preset-card').forEach(button => {
      button.addEventListener('click', () => loadPreset(button.dataset.preset));
    });
  }

  function renderAnimations() {
    dom.animationGrid.innerHTML = ANIMATIONS.map(animation => `<button type="button" class="animation-btn${state.animation === animation ? ' active' : ''}" data-animation="${animation}">${titleCase(animation)}</button>`).join('');
    dom.animationGrid.querySelectorAll('.animation-btn').forEach(button => {
      button.addEventListener('click', () => {
        state.animation = button.dataset.animation;
        renderPreview();
        renderAnimations();
      });
    });
  }

  function renderPreview() {
    dom.avatarStage.innerHTML = avatarSvg(state.avatar, { id: 'main-preview', animation: state.animation });
    dom.avatarName.textContent = state.name || 'Player';
    dom.statusPill.textContent = titleCase(state.animation);
    dom.playerName.value = state.name;
    updatePayload();
    scheduleBlink(dom.avatarStage.querySelector('.avatar-svg'));
  }

  function renderLobby() {
    dom.lobbyGrid.innerHTML = state.lobby.slice(-8).map((player, index) => `<article class="lobby-card">
      <div class="lobby-avatar">${avatarSvg(player.avatar, { id: `lobby-${index}` })}</div>
      <div class="lobby-name">${escapeHtml(player.name)}</div>
    </article>`).join('');
  }

  function updatePayload() {
    const player = {
      name: state.name || 'Player',
      avatar: {
        version: 1,
        preset: state.preset,
        ...state.avatar
      }
    };
    dom.payloadPreview.textContent = JSON.stringify(player, null, 2);
    window.CallbackAvatar.currentPlayer = player;
  }

  function renderAll() {
    renderPreview();
    renderEditor();
    renderPresets();
    renderAnimations();
    renderLobby();
  }

  function loadPreset(name) {
    const preset = FAMILY_PRESETS[name];
    if (!preset) return;
    state.name = name;
    state.avatar = { ...preset };
    state.preset = name;
    state.animation = 'idle';
    renderAll();
  }

  function randomFrom(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function randomizeAvatar() {
    const next = {};
    Object.entries(OPTIONS).forEach(([key, values]) => { next[key] = randomFrom(values); });
    next.personality = 'none';
    state.avatar = { ...DEFAULT_AVATAR, ...next };
    state.preset = null;
    state.animation = 'idle';
    renderAll();
  }

  function resetAvatar() {
    state.name = 'Custom Player';
    state.avatar = { ...DEFAULT_AVATAR };
    state.preset = null;
    state.animation = 'idle';
    renderAll();
  }

  function scheduleBlink(svg) {
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const delay = 1800 + Math.random() * 2600;
    window.setTimeout(() => {
      if (!document.body.contains(svg)) return;
      svg.classList.add('is-blinking');
      window.setTimeout(() => svg.classList.remove('is-blinking'), 250);
      scheduleBlink(svg);
    }, delay);
  }

  function setTab(tabName) {
    const tabs = {
      create: [document.getElementById('createTab'), document.getElementById('createPanel')],
      family: [document.getElementById('familyTab'), document.getElementById('familyPanel')],
      animation: [document.getElementById('animationTab'), document.getElementById('animationPanel')]
    };
    Object.entries(tabs).forEach(([name, [button, panel]]) => {
      const active = name === tabName;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      panel.hidden = !active;
    });
  }

  function saveAvatar() {
    const payload = window.CallbackAvatar.currentPlayer;
    try {
      localStorage.setItem('callback-avatar-player', JSON.stringify(payload));
    } catch (_) {
      // Storage can be unavailable in private/restricted contexts; the in-memory payload still works.
    }
    dom.savedBanner.hidden = false;
    window.setTimeout(() => { dom.savedBanner.hidden = true; }, 2600);
  }

  function addCurrentToLobby() {
    const name = (state.name || 'Player').trim().slice(0, 18) || 'Player';
    state.lobby.push({ name, avatar: { ...state.avatar }, preset: state.preset });
    renderLobby();
  }

  function restoreSavedAvatar() {
    try {
      const raw = localStorage.getItem('callback-avatar-player');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || !parsed.avatar) return;
      state.name = String(parsed.name || 'Player').slice(0, 18);
      state.avatar = { ...DEFAULT_AVATAR, ...parsed.avatar };
      state.preset = parsed.avatar.preset && FAMILY_PRESETS[parsed.avatar.preset] ? parsed.avatar.preset : null;
    } catch (_) {
      // Ignore malformed or unavailable local storage.
    }
  }

  window.CallbackAvatar = {
    version: 1,
    presets: FAMILY_PRESETS,
    options: OPTIONS,
    currentPlayer: null,
    render(config, options = {}) { return avatarSvg(config, options); },
    createPlayer(name, avatarConfig) {
      return {
        name: String(name || 'Player').slice(0, 18),
        avatar: { version: 1, preset: null, ...DEFAULT_AVATAR, ...avatarConfig }
      };
    },
    serialize(player) { return JSON.stringify(player); },
    deserialize(payload) {
      const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
      if (!parsed || typeof parsed !== 'object' || !parsed.avatar) throw new Error('Invalid CALLBACK avatar payload');
      return parsed;
    },
    applyAnimation(container, animation) {
      const svg = container && container.querySelector ? container.querySelector('.avatar-svg') : null;
      if (!svg) return false;
      ANIMATIONS.filter(a => a !== 'idle').forEach(a => svg.classList.remove(`anim-${a}`));
      if (animation && animation !== 'idle' && ANIMATIONS.includes(animation)) svg.classList.add(`anim-${animation}`);
      return true;
    }
  };

  document.querySelectorAll('.tab').forEach(button => {
    button.addEventListener('click', () => setTab(button.id.replace('Tab', '')));
  });

  dom.playerName.addEventListener('input', () => {
    state.name = dom.playerName.value.slice(0, 18);
    state.preset = null;
    renderPreview();
    renderPresets();
  });
  dom.randomizeBtn.addEventListener('click', randomizeAvatar);
  dom.resetBtn.addEventListener('click', resetAvatar);
  dom.doneBtn.addEventListener('click', saveAvatar);
  dom.addToLobbyBtn.addEventListener('click', addCurrentToLobby);

  restoreSavedAvatar();
  renderAll();
})();
