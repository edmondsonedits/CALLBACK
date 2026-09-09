const MODEL = '@cf/black-forest-labs/flux-2-klein-4b';

const PROFILE_PROMPTS = {
  faithful: `Image 0 is a crude player sketch. Create a polished, detailed storybook illustration of what you sincerely think the sketch depicts. Use only visible evidence from image 0. Preserve the approximate composition, number of visible subjects, poses, relative positions, facing directions, scale relationships, and large shapes. Do not trace or overlay the sketch. When a mark is ambiguous, choose the most literal plausible interpretation. Add coherent materials, faces, environment, depth, and lighting. No text, labels, borders, UI, or visible sketch lines.`,
  balanced: `Image 0 is a crude player sketch. Create a polished, detailed cinematic storybook illustration of what you sincerely think the sketch depicts. You are not given the hidden drawing prompt, so use only visible evidence from image 0. Preserve approximate composition, subject count, poses, relative positions, facing directions, scale relationships, and large shapes. Do not correct the drawing toward an assumed intended answer. When marks are ambiguous, commit confidently to one plausible interpretation even if it is strange, then make that interpretation visually coherent. Add believable materials, faces, environment, depth, and lighting. Do not trace or overlay the sketch. No text, labels, borders, UI, or visible sketch lines.`,
  wild: `Image 0 is a crude player sketch. Turn it into a polished, detailed cinematic storybook scene by interpreting only what is visibly present. You do not know the hidden drawing prompt. Preserve the broad composition, pose directions, relative positions, scale, and major shapes, but allow ambiguous marks to become surprising yet coherent objects, creatures, props, or anatomy. Never repair the sketch toward an assumed target. Make one confident visual interpretation and fully realize it with materials, faces, setting, depth, and dramatic lighting. Do not trace or overlay the sketch. No text, labels, borders, UI, or visible sketch lines.`
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return json({ ok: true, ai: Boolean(env.AI), model: MODEL }, 200, { 'cache-control':'no-store' });
    }

    if (url.pathname === '/api/interpret' && request.method === 'POST') {
      try {
        if (!env.AI) return json({ error:'Workers AI binding is unavailable.' }, 503);
        const body = await request.json();
        const profile = ['faithful','balanced','wild'].includes(body?.profile) ? body.profile : 'balanced';
        const parsed = parseDataUrl(body?.imageDataUrl);
        if (!parsed) return json({ error:'A PNG or JPEG data URL is required.' }, 400);
        if (parsed.bytes.byteLength > 1_500_000) return json({ error:'Sketch payload is too large.' }, 413);

        const form = new FormData();
        form.append('input_image_0', new Blob([parsed.bytes], { type: parsed.mime }), 'player-sketch.png');
        form.append('prompt', PROFILE_PROMPTS[profile]);
        form.append('width', '1024');
        form.append('height', '1024');

        const encoded = new Response(form);
        const result = await env.AI.run(MODEL, {
          multipart: {
            body: encoded.body,
            contentType: encoded.headers.get('content-type')
          }
        });

        const base64 = normalizeImage(result);
        if (!base64) return json({ error:'The model returned no image.' }, 502);
        const image = base64.startsWith('data:') ? base64 : `data:image/png;base64,${base64}`;
        return json({ image, provider:'cloudflare-workers-ai', model:MODEL, profile });
      } catch (error) {
        console.error('interpret error', error);
        return json({ error:'Image interpretation failed.' }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  }
};

function parseDataUrl(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^data:(image\/(?:png|jpeg));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  try {
    const binary = atob(match[2]);
    const bytes = new Uint8Array(binary.length);
    for (let i=0;i<binary.length;i++) bytes[i] = binary.charCodeAt(i);
    return { mime:match[1], bytes };
  } catch {
    return null;
  }
}

function normalizeImage(result) {
  if (!result) return null;
  if (typeof result.image === 'string') return result.image;
  if (typeof result?.result?.image === 'string') return result.result.image;
  if (typeof result === 'string') return result;
  return null;
}

function json(payload, status=200, extraHeaders={}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type':'application/json; charset=utf-8', ...extraHeaders }
  });
}
