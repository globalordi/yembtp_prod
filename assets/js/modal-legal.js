    // ── Legal modal (mentions légales / confidentialité) ──
    (function () {
      const modal = document.getElementById('legalModal');
      if (!modal) return;
      const iframe = document.getElementById('legalIframe');
      const closers = modal.querySelectorAll('[data-legal-close]');
      let lastFocus = null;

      const openLegal = (src) => {
        lastFocus = document.activeElement;
        modal.classList.remove('loaded');
        iframe.src = src + '?embed=1';
        modal.removeAttribute('hidden');
        requestAnimationFrame(() => modal.classList.add('open'));
        document.body.classList.add('ba-locked');
        setTimeout(() => {
          const cb = modal.querySelector('.legal-close');
          if (cb) cb.focus();
        }, 360);
      };
      const closeLegal = () => {
        modal.classList.remove('open');
        document.body.classList.remove('ba-locked');
        setTimeout(() => {
          modal.setAttribute('hidden', '');
          iframe.src = 'about:blank';
          modal.classList.remove('loaded');
          if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
        }, 360);
      };

      iframe.addEventListener('load', () => {
        if (iframe.src && iframe.src !== 'about:blank') modal.classList.add('loaded');
      });

      document.querySelectorAll('a[href$="mentions-legales.html"], a[href$="confidentialite.html"]').forEach(link => {
        link.addEventListener('click', (e) => {
          // Laisser passer les clics modifiés (Cmd/Ctrl/middle) pour ouverture dans nouvel onglet
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          openLegal(link.getAttribute('href'));
        });
      });
      closers.forEach(c => c.addEventListener('click', closeLegal));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeLegal();
      });
    })();
