(() => {
  const DEF = { enabled: true, blur: 60, spread: 1.25, brightness: 1.3, saturate: 1.6, opacity: 0.9 };
  let cfg = { ...DEF };
  let canvas, ctx, video, raf, last = 0;
  const small = document.createElement('canvas');
  small.width = 48; small.height = 27;
  const sctx = small.getContext('2d', { willReadFrequently: false });

  function applyStyle() {
    if (!canvas) return;
    canvas.style.filter = `blur(${cfg.blur}px) brightness(${cfg.brightness}) saturate(${cfg.saturate})`;
    canvas.style.opacity = cfg.enabled ? cfg.opacity : 0;
    document.documentElement.classList.toggle('ag-on', cfg.enabled);
  }

  function ensure() {
    video = document.querySelector('video.html5-main-video');
    const host = document.querySelector('#movie_player')?.parentElement;
    if (!video || !host) return false;
    if (!canvas || !canvas.isConnected) {
      canvas = document.createElement('canvas');
      canvas.id = 'ag-canvas';
      canvas.width = 48; canvas.height = 27;
      ctx = canvas.getContext('2d');
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      host.appendChild(canvas);
      applyStyle();
    }
    return true;
  }

  function layout() {
    const p = video.closest('#movie_player') || video;
    const w = p.clientWidth, h = p.clientHeight;
    const host = canvas.parentElement;
    const pr = p.getBoundingClientRect(), hr = host.getBoundingClientRect();
    canvas.style.width = w * cfg.spread + 'px';
    canvas.style.height = h * cfg.spread + 'px';
    canvas.style.left = (pr.left - hr.left - w * (cfg.spread - 1) / 2) + 'px';
    canvas.style.top = (pr.top - hr.top - h * (cfg.spread - 1) / 2) + 'px';
  }

  function tick(t) {
    raf = requestAnimationFrame(tick);
    if (t - last < 40) return; // ~25 fps
    last = t;
    if (!cfg.enabled || !ensure()) return;
    const fs = !!document.fullscreenElement;
    if (fs || video.paused && video.currentTime === 0 || video.readyState < 2) {
      canvas.style.visibility = fs ? 'hidden' : 'visible';
      if (fs) return;
    } else canvas.style.visibility = 'visible';
    layout();
    try {
      sctx.drawImage(video, 0, 0, small.width, small.height);
      ctx.drawImage(small, 0, 0);
    } catch (e) { /* DRM / cross-origin frame: skip */ }
  }

  chrome.storage.sync.get(DEF, (v) => { cfg = { ...DEF, ...v }; applyStyle(); });
  chrome.storage.onChanged.addListener((ch) => {
    for (const k in ch) cfg[k] = ch[k].newValue;
    applyStyle();
  });
  raf = requestAnimationFrame(tick);
})();
