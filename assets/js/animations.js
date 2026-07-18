/* ─────────────────────────────────────────────────────────────
   YEMBTP — Couche d'animations GSAP (premium/sobre)
   Dépend de gsap.min.js + ScrollTrigger.min.js (chargés avant)
───────────────────────────────────────────────────────────── */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.documentElement.classList.add('gsap-ready');

  // ── 1) HERO — entrée échelonnée + split chars sur les <em> ──
  document.querySelectorAll('.hero-title em').forEach((em) => {
    const text = em.textContent;
    em.textContent = '';
    [...text].forEach((c) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = c === ' ' ? ' ' : c;
      em.appendChild(s);
    });
  });

  gsap.set(['.hero-tag', '.hero-title', '.hero-sub', '.hero-cta', '.hero-meta'], { opacity: 0, y: 28 });
  gsap.set('.hero-title em .char', { opacity: 0, y: 22, rotateX: -45 });

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .to('.hero-tag',     { opacity: 1, y: 0, duration: 0.7 }, 0.1)
    .to('.hero-title',   { opacity: 1, y: 0, duration: 0.9 }, 0.25)
    .to('.hero-title em .char', {
      opacity: 1, y: 0, rotateX: 0, duration: 0.65,
      stagger: 0.022, ease: 'back.out(1.4)'
    }, 0.4)
    .to('.hero-sub',     { opacity: 1, y: 0, duration: 0.8 }, 0.55)
    .to('.hero-cta',     { opacity: 1, y: 0, duration: 0.7 }, 0.75)
    .to('.hero-meta',    { opacity: 1, y: 0, duration: 0.7 }, 0.9);

  // ── 2) HERO VISUAL — parallax doux à la souris (desktop seul) ──
  if (isFine && !reduce) {
    const hv = document.querySelector('.hero-visual');
    if (hv) {
      const clamp = (v, max) => Math.max(-max, Math.min(max, v));
      let tx = 0, ty = 0, cx = 0, cy = 0, active = false;
      const onMove = (e) => {
        const r = hv.getBoundingClientRect();
        tx = clamp(((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 18, 10);
        ty = clamp(((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 14, 10);
        active = true;
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      gsap.ticker.add(() => {
        if (!active) return;
        cx += (tx - cx) * 0.06;
        cy += (ty - cy) * 0.06;
        gsap.set('.hv-bg',     { x: cx * 0.4, y: cy * 0.4 });
        gsap.set('.hv-arch',   { x: cx * 0.8, y: cy * 0.8 });
        gsap.set('.hv-chip-1', { x: cx * -1.6, y: cy * -1.4 });
        gsap.set('.hv-chip-2', { x: cx * -1.2, y: cy * -1.0 });
        gsap.set('.hv-chip-3', { x: cx * 1.4,  y: cy * 1.2  });
      });
    }
  }

  // ── 3) MASK REVEAL sur les titres de section ──
  // onComplete : retire clip-path pour libérer les descendantes (j, g, p, q)
  // qui dépasseraient sinon de la box du titre.
  document.querySelectorAll('.sec-title').forEach((title) => {
    gsap.fromTo(title,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.1, ease: 'power3.inOut',
        scrollTrigger: { trigger: title, start: 'top 82%', once: true },
        onComplete: () => { title.style.clipPath = 'none'; }
      }
    );
  });

  // ── 4) HEADERS DE SECTION — eyebrow + lead fade-up ──
  document.querySelectorAll('.sec-head').forEach((head) => {
    const els = head.querySelectorAll('.sec-eyebrow, .sec-lead');
    if (!els.length) return;
    gsap.fromTo(els,
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: head, start: 'top 84%', once: true }
      }
    );
  });

  // ── 5) GRILLES — stagger reveal (remplace .stagger CSS) ──
  const grids = ['.services-grid', '.team-grid', '.ref-grid', '.energy-steps', '.mission-grid', '.about-badges', '.info-list'];
  grids.forEach((sel) => {
    document.querySelectorAll(sel).forEach((grid) => {
      gsap.fromTo(grid.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 86%', once: true }
        }
      );
    });
  });

  // ── 6) PARAGRAPHES DES SECTIONS — fade-up ──
  const paras = document.querySelectorAll('.about-text > p, .energy-text > p, .contact-info-lead, .contact-info h2');
  paras.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  // ── 7) CARTES SERVICES — tilt 3D + lift au mousemove (desktop) ──
  if (isFine && !reduce) {
    document.querySelectorAll('.service-card').forEach((card) => {
      const maxTilt = 5;
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        gsap.to(card, {
          rotateX: (py - 0.5) * -maxTilt,
          rotateY: (px - 0.5) * maxTilt,
          y: -8,
          duration: 0.5, ease: 'power2.out',
          transformPerspective: 900, transformOrigin: 'center'
        });
      };
      const onLeave = () => gsap.to(card, {
        rotateX: 0, rotateY: 0, y: 0,
        duration: 0.8, ease: 'power3.out'
      });
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  // ── 8) COMPTEURS HERO — animation GSAP (override main.js) ──
  document.querySelectorAll('.meta-item .num').forEach((el) => {
    const text = el.textContent.trim();
    const m = text.match(/^(\d+)$/);
    if (!m) return;
    const target = parseInt(m[1], 10);
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power3.out',
          onUpdate: () => { el.textContent = Math.round(obj.v); }
        });
      }
    });
  });

  // ── 9) RIPPLE au clic sur les boutons dorés ──
  if (!reduce) {
    document.querySelectorAll('.btn-gold, .btn-outline').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const r = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = (e.clientX - r.left) + 'px';
        ripple.style.top  = (e.clientY - r.top)  + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 720);
      });
    });
  }

  // ── 9b) RÉFÉRENCES — injection d'un overlay doré pour le hover slide ──
  document.querySelectorAll('.ref-card .ref-img').forEach((img) => {
    if (img.querySelector('.ref-gold-overlay')) return;
    const overlay = document.createElement('span');
    overlay.className = 'ref-gold-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    img.appendChild(overlay);
  });

  // ── 11) Refresh ScrollTrigger après chargement des fontes ──
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
