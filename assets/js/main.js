    document.getElementById('year').textContent = new Date().getFullYear();

    // ── Scroll reveal — refined with staggered grids ──
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    // Section-level reveal
    document.querySelectorAll('section > .container > *').forEach(el => {
      // skip hero (it has its own entrance)
      if (el.closest('.hero')) return;
      el.classList.add('reveal');
      io.observe(el);
    });

    // Grid-level stagger reveal for cards
    ['.services-grid', '.team-grid', '.ref-grid', '.energy-steps', '.mission-grid', '.about-badges', '.info-list', '.hero-meta'].forEach(sel => {
      document.querySelectorAll(sel).forEach(grid => {
        grid.classList.add('stagger');
        io.observe(grid);
      });
    });

    // ── Nav scroll effect ──
    const nav = document.getElementById('nav');
    function updateNavBg() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      // Interpolate from warm brown rgba(85, 65, 40, 0.78) at top
      // to footer color #4d3c25 = rgb(77, 60, 37) fully opaque at bottom
      const r = Math.round(85 + (77 - 85) * progress);
      const g = Math.round(65 + (60 - 65) * progress);
      const b = Math.round(40 + (37 - 40) * progress);
      const a = (0.78 + 0.22 * progress).toFixed(3);
      nav.style.background = `rgba(${r}, ${g}, ${b}, ${a})`;
      if (y > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', updateNavBg, { passive: true });
    window.addEventListener('resize', updateNavBg);
    updateNavBg();

    // ── Mobile menu ──
    const mt = document.getElementById('mobileToggle');
    const mm = document.getElementById('mobileMenu');
    if (mt && mm) {
      mt.addEventListener('click', () => {
        mm.classList.toggle('open');
        mt.classList.toggle('active');
      });
      mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        mm.classList.remove('open');
        mt.classList.remove('active');
      }));
      // close on outside click
      document.addEventListener('click', (e) => {
        if (!mm.contains(e.target) && !mt.contains(e.target) && mm.classList.contains('open')) {
          mm.classList.remove('open');
          mt.classList.remove('active');
        }
      });
    }

    // ── Équipe — bulles au clic ──
    document.querySelectorAll('.team-avatar--clickable').forEach((avatar) => {
      const bubble = avatar.closest('.team-card').querySelector('.team-bubble');
      if (!bubble) return;
      const toggleBubble = (e) => {
        e.stopPropagation();
        const willShow = !bubble.classList.contains('show');
        document.querySelectorAll('.team-bubble.show').forEach(b => b.classList.remove('show'));
        if (willShow) bubble.classList.add('show');
      };
      avatar.addEventListener('click', toggleBubble);
      avatar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleBubble(e); }
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.team-bubble') && !e.target.closest('.team-avatar--clickable')) {
        document.querySelectorAll('.team-bubble.show').forEach(b => b.classList.remove('show'));
      }
    });

    // ── Service tabs — filtrage fonctionnel ──
    const serviceCards = document.querySelectorAll('.service-card');
    document.querySelectorAll('.tab').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        const filter = t.getAttribute('data-filter') || 'all';
        serviceCards.forEach(card => {
          const cats = (card.getAttribute('data-category') || '').split(/\s+/);
          const match = filter === 'all' || cats.includes(filter) || cats.includes('all');
          card.classList.toggle('is-hidden', !match);
        });
      });
    });

    // ── Cursor-follow gradient on service cards ──
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });

    // ── Magnetic hover for primary CTAs (desktop only) ──
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isFinePointer) {
      document.querySelectorAll('.btn-gold, .btn-outline').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      });
    }

    // ── Counter animation for hero numbers ──
    // GSAP (animations.js) prend le relais si chargé — évite la course condition.
    if (!window.gsap) {
      const animateCounter = (el) => {
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)$/);
        if (!match) return;
        const target = parseInt(match[1], 10);
        const duration = 1600;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const counterIo = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            counterIo.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('.meta-item .num').forEach(el => counterIo.observe(el));
    }

    // ── Subtle parallax on hero background ──
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && isFinePointer) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < 800) heroBg.style.transform = `translateY(${y * 0.18}px)`;
      }, { passive: true });
    }

    // ── Smooth scroll for anchor links with header offset ──
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // ── Contact form → Formspree (AJAX) ──
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = btn.innerHTML;
      const originalBtnBg = btn.style.background;
      const originalBtnColor = btn.style.color;

      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        btn.disabled = true;
        btn.innerHTML = 'Envoi en cours…';
        btn.style.background = '';
        btn.style.color = '';

        try {
          const res = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
          });

          if (res.ok) {
            btn.innerHTML = '✓ Demande envoyée — nous revenons vers vous';
            btn.style.background = 'linear-gradient(135deg, #2d7a3f, #1f5a2d)';
            btn.style.color = '#fff';
            contactForm.reset();
            // Bouton volontairement laissé désactivé après succès (évite double envoi).
          } else {
            const data = await res.json().catch(() => ({}));
            const msg = Array.isArray(data.errors) && data.errors.length
              ? data.errors.map(err => err.message).join(' — ')
              : 'Envoi impossible. Écrivez-nous à yembtp@yembtp.fr';
            btn.innerHTML = '✕ ' + msg;
            btn.style.background = 'linear-gradient(135deg, #a83232, #6f1f1f)';
            btn.style.color = '#fff';
            btn.disabled = false;
          }
        } catch (err) {
          btn.innerHTML = '✕ Connexion impossible — écrivez à yembtp@yembtp.fr';
          btn.style.background = 'linear-gradient(135deg, #a83232, #6f1f1f)';
          btn.style.color = '#fff';
          btn.disabled = false;
        }
      });
    }

