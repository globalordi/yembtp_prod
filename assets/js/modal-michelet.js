    // ── Before/After modal (Parking Michelet) ──
    document.querySelectorAll('.ba-modal').forEach(modal => {
      const slider = modal.querySelector('[data-ba-slider]');
      if (!slider) return;
      const clip = slider.querySelector('.ba-clip');
      const handle = slider.querySelector('.ba-handle');
      let dragging = false;

      const setPos = (pct) => {
        const clamped = Math.max(0, Math.min(100, pct));
        clip.style.setProperty('--clip', clamped + '%');
        handle.style.setProperty('--pos', clamped + '%');
      };
      setPos(50);

      const movePos = (clientX) => {
        const rect = slider.getBoundingClientRect();
        setPos(((clientX - rect.left) / rect.width) * 100);
      };
      slider.addEventListener('pointerdown', (e) => {
        dragging = true;
        try { slider.setPointerCapture(e.pointerId); } catch (_) {}
        movePos(e.clientX);
      });
      slider.addEventListener('pointermove', (e) => {
        if (dragging) movePos(e.clientX);
      });
      slider.addEventListener('pointerup', (e) => {
        dragging = false;
        try { slider.releasePointerCapture(e.pointerId); } catch (_) {}
      });
      slider.addEventListener('pointercancel', () => { dragging = false; });

      // Open / close
      const key = modal.id.replace('baModal', '').toLowerCase();
      const openers = document.querySelectorAll('[data-modal-open="' + key + '"]');
      const closers = modal.querySelectorAll('[data-ba-close]');
      let lastFocus = null;

      const openModal = () => {
        lastFocus = document.activeElement;
        modal.removeAttribute('hidden');
        requestAnimationFrame(() => modal.classList.add('open'));
        document.body.classList.add('ba-locked');
        setPos(50);
        setTimeout(() => {
          const cb = modal.querySelector('.ba-close');
          if (cb) cb.focus();
        }, 350);
      };
      const closeModal = () => {
        modal.classList.remove('open');
        document.body.classList.remove('ba-locked');
        setTimeout(() => {
          modal.setAttribute('hidden', '');
          if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
        }, 360);
      };

      openers.forEach(o => {
        o.addEventListener('click', openModal);
        o.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
        });
      });
      closers.forEach(c => c.addEventListener('click', closeModal));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
      });
    });
