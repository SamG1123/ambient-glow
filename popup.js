const DEF = { enabled: true, blur: 60, spread: 1.25, brightness: 1.3, saturate: 1.6, opacity: 0.9 };
chrome.storage.sync.get(DEF, (v) => {
  for (const k in DEF) {
    const el = document.getElementById(k);
    if (k === 'enabled') el.checked = v[k]; else el.value = v[k];
    el.addEventListener('input', () =>
      chrome.storage.sync.set({ [k]: k === 'enabled' ? el.checked : parseFloat(el.value) }));
  }
});
