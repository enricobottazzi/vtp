(() => {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;

  function getCurrentTheme() {
    return root.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, { persist } = { persist: true }) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        // no-op
      }
    }

    updateToggleButtons();
  }

  function updateToggleButtons() {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';

    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', current === 'dark' ? 'true' : 'false');
      btn.setAttribute(
        'aria-label',
        next === 'dark' ? 'Switch to dark mode' : 'Switch to light mode'
      );
      btn.setAttribute('title', next === 'dark' ? 'Dark mode' : 'Light mode');
    });
  }

  function init() {
    updateToggleButtons();

    document.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest && e.target.closest('[data-theme-toggle]');
      if (!btn) return;

      e.preventDefault();
      const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next, { persist: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

