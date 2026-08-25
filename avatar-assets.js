(() => {
  const family=(window.CALLBACK_FAMILY_PARTS||[]).join('');
  const heads=(window.CALLBACK_HEAD_PARTS||[]).join('');
  window.CallbackHybridAssets={
    family:`data:image/webp;base64,${family}`,
    heads:`data:image/webp;base64,${heads}`
  };
})();
