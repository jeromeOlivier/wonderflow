(function loadCookieConsentWhenIdle() {
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

  const init = async () => {
    try {
      await loadScript('/vendor/cookieconsent/cookieconsent.umd.js');
      await loadScript('/js/cookieconsent-config.js');
    } catch (e) {
      console.error('Cookie consent scripts failed to load:', e);
    }
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(init);
  } else {
    setTimeout(init, 2000);
  }
})();

