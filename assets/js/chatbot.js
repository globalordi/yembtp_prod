    (function () {
      const COMPANY = {
        email: 'yembtp@yembtp.fr',
        tel: '0977652559',
        telDisplay: '09 77 65 25 59',
        address: '20 Rue Louis Armand — 95130 Le Plessis-Bouchard',
        formspreeUrl: 'https://formspree.io/f/mqeogpbb'
      };

      const toggle = document.getElementById('cbToggle');
      const panel = document.getElementById('cbPanel');
      const closeBtn = document.getElementById('cbClose');
      const body = document.getElementById('cbBody');
      const chips = document.getElementById('cbChips');
      const form = document.getElementById('cbForm');
      const input = document.getElementById('cbInput');

      let started = false;
      const state = {
        history: [],
        flow: null
      };

      function openPanel() {
        panel.classList.add('open');
        toggle.classList.add('hidden');
        if (!started) { started = true; greet(); }
        setTimeout(() => input.focus(), 300);
      }
      function closePanel() {
        panel.classList.remove('open');
        toggle.classList.remove('hidden');
      }
      toggle.addEventListener('click', openPanel);
      closeBtn.addEventListener('click', closePanel);

      function scrollDown() { body.scrollTop = body.scrollHeight; }

      function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      }

      function addMsg(html, who, variant) {
        const el = document.createElement('div');
        el.className = 'cb-msg ' + (who || 'bot') + (variant ? ' cb-msg-' + variant : '');
        el.innerHTML = html;
        body.appendChild(el);
        scrollDown();
        return el;
      }

      function botSay(html, after, variant) {
        const t = document.createElement('div');
        t.className = 'cb-msg bot';
        t.innerHTML = '<span class="cb-typing"><span></span><span></span><span></span></span>';
        body.appendChild(t);
        scrollDown();
        const delay = Math.min(900, 350 + html.length * 4);
        setTimeout(() => {
          t.className = 'cb-msg bot' + (variant ? ' cb-msg-' + variant : '');
          t.innerHTML = html;
          scrollDown();
          if (after) after();
        }, delay);
      }

      function setChips(list) {
        chips.innerHTML = '';
        (list || []).forEach(c => {
          const b = document.createElement('button');
          b.className = 'cb-chip' + (c.variant ? ' cb-chip-' + c.variant : '');
          b.type = 'button';
          b.textContent = c.label;
          b.addEventListener('click', () => {
            if (c.variant !== 'back' && c.variant !== 'skip') {
              addMsg(escapeHtml(c.label), 'user');
            }
            chips.innerHTML = '';
            (c.run || (() => {}))();
          });
          chips.appendChild(b);
        });
      }

      function showProgress(step, total) {
        const wrap = document.createElement('div');
        wrap.className = 'cb-progress';
        wrap.innerHTML = '<span class="cb-progress-label">Étape ' + step + ' / ' + total + '</span><span class="cb-progress-bar"><span style="width:' + Math.round(step / total * 100) + '%"></span></span>';
        body.appendChild(wrap);
        scrollDown();
      }

      function goSection(id) {
        const t = document.querySelector(id);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      function pushHistory(fn) {
        state.history.push(fn);
        if (state.history.length > 20) state.history.shift();
      }

      function back() {
        if (state.history.length < 2) { backToMenu(); return; }
        state.history.pop();
        const prev = state.history.pop();
        if (typeof prev === 'function') prev();
        else backToMenu();
      }

      function withBack(list) {
        return list.concat([{ label: '← Précédent', variant: 'back', run: back }]);
      }

      const MAIN_CHIPS = [
        { label: 'Nos services', run: () => { pushHistory(showServices); showServices(); } },
        { label: 'Demander un devis', run: () => { pushHistory(startDevis); startDevis(); } },
        { label: 'Zone d’intervention', run: () => { pushHistory(showZone); showZone(); } },
        { label: 'FAQ rapide', run: () => { pushHistory(showFaq); showFaq(); } },
        { label: 'Nous contacter', run: () => { pushHistory(showContact); showContact(); } }
      ];

      function greet() {
        state.history = [];
        botSay('Bonjour&nbsp;! 👋 Je suis l’assistant <strong>YEMBTP</strong>. Je peux vous orienter vers nos services, répondre aux questions fréquentes ou préparer un devis avec vous.', () => setChips(MAIN_CHIPS));
      }

      function backToMenu() {
        state.history = [];
        botSay('Que souhaitez-vous savoir&nbsp;?', () => setChips(MAIN_CHIPS));
      }

      function fallback() {
        botSay('Je ne suis pas certain d’avoir bien compris 🤔. Voici les sujets que je maîtrise&nbsp;:', () => setChips(MAIN_CHIPS));
      }

      // ── Services : menu → fiches détaillées ──
      function showServices() {
        botSay('Nous couvrons 9 pôles techniques. Sur lequel souhaitez-vous des détails&nbsp;?', () => setChips(withBack([
          { label: 'Plomberie & gaz', run: () => { pushHistory(() => fiche('plomberie')); fiche('plomberie'); } },
          { label: 'CVC / Climatisation', run: () => { pushHistory(() => fiche('cvc')); fiche('cvc'); } },
          { label: 'Serrurerie', run: () => { pushHistory(() => fiche('serrurerie')); fiche('serrurerie'); } },
          { label: 'Menuiserie', run: () => { pushHistory(() => fiche('menuiserie')); fiche('menuiserie'); } },
          { label: 'Isolation & flocage', run: () => { pushHistory(() => fiche('isolation')); fiche('isolation'); } },
          { label: 'Énergie / CEE', run: () => { pushHistory(() => fiche('energie')); fiche('energie'); } }
        ])));
      }

      const FICHES = {
        plomberie: {
          texte: '<strong>Plomberie & installation gaz</strong> — neuf, rénovation, dépannage.<br>• Distribution sanitaire EF/EC<br>• Évacuation EU/EV<br>• Installation et mise en service gaz (certifications PG, Qualigaz)<br>• Réseaux collectifs (immeubles, tertiaire, hôpitaux)',
          chips: ['neuf', 'renov', 'depannage', 'gaz']
        },
        cvc: {
          texte: '<strong>CVC — Chauffage, ventilation, climatisation</strong>.<br>• Climatisation mono/multi-split, VRV/DRV<br>• Pompes à chaleur (PAC air/eau, air/air)<br>• Chaufferies gaz et hybrides<br>• Ventilation : VMC simple/double flux, CTA tertiaire<br>• Maintenance et contrats annuels',
          chips: ['clim', 'chauffage', 'vmc', 'maintenance']
        },
        serrurerie: {
          texte: '<strong>Serrurerie & menuiserie métallique</strong>.<br>• Portes coupe-feu et issues de secours (EI30/EI60/EI90)<br>• Garde-corps, escaliers métalliques<br>• Châssis, grilles, ferronnerie<br>• Dépannage et mise en sécurité 24/7 sur contrat',
          chips: ['coupefeu', 'gardecorps', 'depannage']
        },
        menuiserie: {
          texte: '<strong>Menuiserie</strong> (bois, alu, PVC).<br>• Fenêtres, portes, baies, vérandas<br>• Aménagement sur mesure (placards, cloisons, banques d’accueil)<br>• Plafonds suspendus, faux planchers<br>• Rénovation complète d’espaces tertiaires',
          chips: ['fenetres', 'amenagement', 'cloisons']
        },
        isolation: {
          texte: '<strong>Isolation thermique & flocage coupe-feu</strong>.<br>• Isolation par soufflage, projection, panneaux<br>• Flocage de structures métalliques (résistance feu 30 à 240 min)<br>• Calorifugeage de réseaux<br>• Audits et bilans thermiques préalables',
          chips: ['flocage', 'audit', 'cee']
        },
        energie: {
          texte: '<strong>Solutions énergétiques & CEE</strong>.<br>• Bureau d’étude thermique<br>• Montage des dossiers CEE (Certificats d’Économies d’Énergie)<br>• Courtage énergie pour les bâtiments tertiaires<br>• Financement et accompagnement administratif',
          chips: ['cee', 'audit', 'financement']
        }
      };

      function fiche(key) {
        const f = FICHES[key];
        if (!f) { fallback(); return; }
        botSay(f.texte, () => setChips(withBack([
          { label: 'Demander un devis', run: () => { pushHistory(startDevis); startDevis(); } },
          { label: 'Voir sur le site', run: () => { goSection('#services'); botSay('J’ai fait défiler la page sur la section services. 👇', () => setChips(withBack(MAIN_CHIPS))); } },
          { label: 'Autre service', run: () => { state.history.pop(); showServices(); } }
        ])));
      }

      // ── Zone d'intervention ──
      function showZone() {
        botSay('Basés au <strong>Plessis-Bouchard (95)</strong>, nous intervenons sur <strong>toute l’Île-de-France</strong> au quotidien et sur <strong>l’ensemble du territoire national</strong> pour les chantiers structurants (hôpitaux, parkings, sites tertiaires).<br><br>Voulez-vous précisez votre département ?', () => setChips(withBack([
          { label: 'Île-de-France (75/77/78/91/92/93/94/95)', run: () => zoneAnswer('idf') },
          { label: 'Autre région', run: () => zoneAnswer('autre') }
        ])));
      }
      function zoneAnswer(k) {
        if (k === 'idf') {
          botSay('✅ <strong>Couverture quotidienne</strong> en Île-de-France — devis sous 48 h ouvrées, visite sur site possible la même semaine.', () => setChips(withBack([
            { label: 'Demander un devis', run: () => { pushHistory(startDevis); startDevis(); } },
            { label: 'Nous contacter', run: () => { pushHistory(showContact); showContact(); } }
          ])));
        } else {
          botSay('✅ <strong>Interventions nationales possibles</strong> sur projets d’envergure (hôpitaux, parkings, équipements publics, sites multi-bâtiments). Pour les petits chantiers hors IDF, contactez-nous pour étudier la faisabilité logistique.', () => setChips(withBack([
            { label: 'Demander un devis', run: () => { pushHistory(startDevis); startDevis(); } },
            { label: 'Nous contacter', run: () => { pushHistory(showContact); showContact(); } }
          ])));
        }
      }

      // ── Contact ──
      function showContact() {
        botSay('Voici comment nous joindre&nbsp;:<br>📞 <a href="tel:' + COMPANY.tel + '">' + COMPANY.telDisplay + '</a><br>✉️ <a href="mailto:' + COMPANY.email + '">' + COMPANY.email + '</a><br>📍 ' + COMPANY.address + '<br><br>Nous répondons sous <strong>24 h ouvrées</strong>.', () => setChips(withBack([
          { label: 'Demander un devis', run: () => { pushHistory(startDevis); startDevis(); } },
          { label: 'Voir la page contact', run: () => { goSection('#contact'); botSay('Section contact à l’écran. 👇', () => setChips(withBack(MAIN_CHIPS))); } }
        ])));
      }

      // ── FAQ ──
      function showFaq() {
        botSay('Voici les questions qui reviennent le plus souvent. Laquelle vous concerne&nbsp;?', () => setChips(withBack([
          { label: 'Quels délais ?', run: () => { pushHistory(() => faq('delais')); faq('delais'); } },
          { label: 'Quelles garanties ?', run: () => { pushHistory(() => faq('garanties')); faq('garanties'); } },
          { label: 'Comment se déroule un devis ?', run: () => { pushHistory(() => faq('devis_process')); faq('devis_process'); } },
          { label: 'Urgence / dépannage ?', run: () => { pushHistory(() => faq('urgence')); faq('urgence'); } },
          { label: 'Certifications ?', run: () => { pushHistory(() => faq('certifs')); faq('certifs'); } },
          { label: 'Visite sur site ?', run: () => { pushHistory(() => faq('visite')); faq('visite'); } }
        ])));
      }

      const FAQ_ANSWERS = {
        delais: 'Pour un <strong>devis</strong> : réponse sous 48 h ouvrées, devis chiffré sous 5 à 10 jours selon la complexité.<br>Pour les <strong>travaux</strong> : les délais dépendent de la taille du chantier ; un planning prévisionnel est inclus dans chaque devis.',
        garanties: 'Nous sommes couverts par les garanties légales applicables au BTP&nbsp;:<br>• <strong>Garantie décennale</strong> sur les gros œuvres techniques<br>• <strong>Garantie biennale</strong> de bon fonctionnement (2 ans)<br>• <strong>Garantie de parfait achèvement</strong> (1 an)<br>Attestation d’assurance fournie sur demande.',
        devis_process: 'Le processus type&nbsp;:<br>1. Vous nous décrivez votre projet (téléphone, formulaire ou ce chatbot)<br>2. Échange technique sous 24-48 h pour préciser les besoins<br>3. <strong>Visite sur site gratuite</strong> si nécessaire (IDF en quelques jours)<br>4. Devis détaillé écrit, valable 90 jours<br>5. Planning prévisionnel et lancement après accord',
        urgence: 'Sur <strong>contrat de maintenance</strong>, nous assurons une astreinte <strong>24/7</strong> avec intervention en moins de 4 h en IDF pour les sinistres critiques (fuite gaz, panne CVC sur site sensible, etc.). Hors contrat, contactez-nous au <a href="tel:' + COMPANY.tel + '">' + COMPANY.telDisplay + '</a> pour étudier votre demande.',
        certifs: 'YEMBTP est <strong>certifiée et qualifiée en gaz et soudure</strong>, avec un personnel formé aux interventions sur sites sensibles (hôpitaux, parkings publics). Nos interventions respectent les normes en vigueur — DTU, NF, EI coupe-feu, qualifications Qualigaz selon les lots.',
        visite: 'Oui, la <strong>visite sur site est gratuite</strong> et systématiquement proposée pour les projets de plus de quelques milliers d’euros. Elle nous permet de chiffrer précisément et d’anticiper les contraintes (accès, branchements existants, sécurité du site).'
      };

      function faq(key) {
        const a = FAQ_ANSWERS[key];
        if (!a) { fallback(); return; }
        botSay(a, () => setChips(withBack([
          { label: 'Demander un devis', run: () => { pushHistory(startDevis); startDevis(); } },
          { label: 'Autre question FAQ', run: () => { state.history.pop(); showFaq(); } },
          { label: 'Retour au menu', run: backToMenu }
        ])));
      }

      // ── Flow devis (5 étapes, envoi Formspree) ──
      const DEVIS_TOTAL = 5;

      function startDevis() {
        state.flow = { type: 'devis', step: 1, data: {} };
        showProgress(1, DEVIS_TOTAL);
        botSay('Avec plaisir, c’est <strong>gratuit et sans engagement</strong>. Quel est votre besoin principal&nbsp;?', () => setChips([
          { label: 'Plomberie / gaz', run: () => devisSetMetier('Plomberie / gaz') },
          { label: 'CVC / Climatisation', run: () => devisSetMetier('CVC / Climatisation') },
          { label: 'Serrurerie', run: () => devisSetMetier('Serrurerie') },
          { label: 'Menuiserie', run: () => devisSetMetier('Menuiserie') },
          { label: 'Isolation / flocage', run: () => devisSetMetier('Isolation / flocage') },
          { label: 'Énergie / CEE', run: () => devisSetMetier('Énergie / CEE') },
          { label: 'Multi-lots', run: () => devisSetMetier('Multi-lots') }
        ]));
      }

      function devisSetMetier(label) {
        state.flow.data.besoin = label;
        state.flow.step = 2;
        showProgress(2, DEVIS_TOTAL);
        botSay('Très bien. S’agit-il de&nbsp;?', () => setChips([
          { label: 'Construction neuve', run: () => devisSetIntervention('Neuf') },
          { label: 'Rénovation', run: () => devisSetIntervention('Rénovation') },
          { label: 'Maintenance / contrat', run: () => devisSetIntervention('Maintenance') },
          { label: 'Urgence / dépannage', run: () => devisSetIntervention('Urgence') }
        ]));
      }

      function devisSetIntervention(label) {
        state.flow.data.intervention = label;
        state.flow.step = 3;
        showProgress(3, DEVIS_TOTAL);
        botSay('Parfait. À quel <strong>nom</strong> dois-je établir la demande (ou nom de la société)&nbsp;?');
      }

      function devisHandleText(text) {
        const f = state.flow;
        if (!f) return;
        if (f.step === 3) {
          f.data.nom = text;
          f.step = 4;
          showProgress(4, DEVIS_TOTAL);
          botSay('Merci ' + escapeHtml(text) + '. Un <strong>téléphone ou un e-mail</strong> pour vous recontacter&nbsp;?');
        } else if (f.step === 4) {
          f.data.contact = text;
          f.step = 5;
          showProgress(5, DEVIS_TOTAL);
          botSay('Dernière étape&nbsp;: décrivez votre projet en quelques mots (surface, délai, contraintes). Vous pouvez aussi passer.', () => setChips([
            { label: 'Passer cette étape', variant: 'skip', run: () => { f.data.description = '(non précisé)'; submitDevis(); } }
          ]));
        } else if (f.step === 5) {
          f.data.description = text;
          submitDevis();
        }
      }

      async function submitDevis() {
        const f = state.flow;
        chips.innerHTML = '';
        botSay('🚀 Envoi de votre demande en cours…');

        const contact = (f.data.contact || '').trim();
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
        const fd = new FormData();
        fd.append('nom', f.data.nom || '');
        if (isEmail) {
          fd.append('email', contact);
        } else {
          fd.append('telephone', contact);
          fd.append('email', COMPANY.email);
        }
        fd.append('type_projet', f.data.besoin || '');
        fd.append('intervention', f.data.intervention || '');
        fd.append('message', f.data.description || '');
        fd.append('source', 'chatbot');
        fd.append('_subject', 'Demande de devis (chatbot) — ' + (f.data.besoin || ''));
        fd.append('_gotcha', '');

        try {
          const resp = await fetch(COMPANY.formspreeUrl, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: fd
          });
          if (resp.ok) {
            devisSuccess();
            return;
          }
          const json = await resp.json().catch(() => ({}));
          const msg = (json.errors && json.errors[0] && json.errors[0].message) || 'Erreur du service d’envoi.';
          devisError(msg);
        } catch (err) {
          devisError('réseau indisponible');
        }
      }

      function devisSuccess() {
        const f = state.flow;
        state.flow = null;
        botSay('✅ <strong>Demande envoyée&nbsp;!</strong> Récapitulatif&nbsp;:<br>• <strong>Besoin&nbsp;:</strong> ' + escapeHtml(f.data.besoin || '') + '<br>• <strong>Intervention&nbsp;:</strong> ' + escapeHtml(f.data.intervention || '') + '<br>• <strong>Contact&nbsp;:</strong> ' + escapeHtml(f.data.contact || '') + '<br><br>Nous revenons vers vous sous <strong>24 h ouvrées</strong> à l’adresse / numéro que vous avez indiqué.', () => setChips([
          { label: 'Nouvelle demande', run: startDevis },
          { label: 'Retour au menu', run: backToMenu }
        ]), 'success');
      }

      function devisError(reason) {
        const f = state.flow;
        const subject = encodeURIComponent('Demande de devis — ' + (f.data.besoin || 'projet'));
        const lines = [
          'Bonjour,',
          '',
          'Je souhaite un devis pour&nbsp;: ' + (f.data.besoin || ''),
          'Type d’intervention&nbsp;: ' + (f.data.intervention || ''),
          'Nom&nbsp;: ' + (f.data.nom || ''),
          'Contact&nbsp;: ' + (f.data.contact || ''),
          'Projet&nbsp;: ' + (f.data.description || ''),
          '',
          'Merci de me recontacter.'
        ];
        const mailHref = 'mailto:' + COMPANY.email + '?subject=' + subject + '&body=' + encodeURIComponent(lines.join('\n'));
        botSay('⚠️ L’envoi automatique a échoué (' + escapeHtml(reason) + '). Vous pouvez tout de même nous transmettre votre demande&nbsp;:', () => setChips([
          { label: '✉️ Ouvrir mon e-mail pré-rempli', run: () => { window.location.href = mailHref; } },
          { label: '📞 Appeler ' + COMPANY.telDisplay, run: () => { window.location.href = 'tel:' + COMPANY.tel; } },
          { label: 'Réessayer l’envoi', run: submitDevis },
          { label: 'Retour au menu', run: backToMenu }
        ]), 'error');
      }

      // ── Routage texte libre ──
      function route(text) {
        const t = text.toLowerCase();
        if (state.flow && state.flow.type === 'devis' && state.flow.step >= 3) {
          devisHandleText(text);
          return;
        }
        if (/devis|tarif|prix|co[uû]t|estimation|chiffr/.test(t)) { pushHistory(startDevis); startDevis(); return; }
        if (/d[ée]lai|quand|combien de temps|attendre|rapide/.test(t)) { pushHistory(() => faq('delais')); faq('delais'); return; }
        if (/garanti|d[ée]cennal|assurance/.test(t)) { pushHistory(() => faq('garanties')); faq('garanties'); return; }
        if (/urgence|d[ée]pann|fuite|panne|24[/ ]?7|astreinte/.test(t)) { pushHistory(() => faq('urgence')); faq('urgence'); return; }
        if (/visite|venir|d[ée]plac|sur site|sur place/.test(t)) { pushHistory(() => faq('visite')); faq('visite'); return; }
        if (/plomb|gaz|sanitaire|eau|robinet|chaudi[èe]re gaz/.test(t)) { pushHistory(() => fiche('plomberie')); fiche('plomberie'); return; }
        if (/clim|cvc|chauffage|vmc|ventilation|pac|pompe [aà] chaleur|froid/.test(t)) { pushHistory(() => fiche('cvc')); fiche('cvc'); return; }
        if (/serrur|coupe[- ]?feu|garde[- ]?corps|portes|m[ée]tallerie/.test(t)) { pushHistory(() => fiche('serrurerie')); fiche('serrurerie'); return; }
        if (/menuis|fen[êe]tre|placard|cloison|am[ée]nag/.test(t)) { pushHistory(() => fiche('menuiserie')); fiche('menuiserie'); return; }
        if (/isolat|floc|calorifug|thermique/.test(t)) { pushHistory(() => fiche('isolation')); fiche('isolation'); return; }
        if (/cee|certificat d.{0,5}[ée]conomie|[ée]nergie|audit/.test(t)) { pushHistory(() => fiche('energie')); fiche('energie'); return; }
        if (/zone|secteur|r[ée]gion|intervenez|d[ée]plac|paris|95|[îi]le|ile-de-france/.test(t)) { pushHistory(showZone); showZone(); return; }
        if (/adresse|o[uù] [êe]tes|situ[ée]/.test(t)) { pushHistory(showContact); showContact(); return; }
        if (/certif|qualif|rge|norme|soudure|qualigaz/.test(t)) { pushHistory(() => faq('certifs')); faq('certifs'); return; }
        if (/contact|t[ée]l[ée]phone|appeler|num[ée]ro|mail|e-mail|email|joindre|coordonn/.test(t)) { pushHistory(showContact); showContact(); return; }
        if (/service|prestation|faites|proposez|travaux/.test(t)) { pushHistory(showServices); showServices(); return; }
        if (/faq|question|aide|help/.test(t)) { pushHistory(showFaq); showFaq(); return; }
        if (/bonjour|salut|hello|coucou|bonsoir|hey|hi/.test(t)) { greet(); return; }
        if (/merci|super|parfait|^ok$|d’accord|daccord/.test(t)) { botSay('Avec plaisir&nbsp;! 😊 Autre chose&nbsp;?', () => setChips(MAIN_CHIPS)); return; }
        fallback();
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        addMsg(escapeHtml(text), 'user');
        input.value = '';
        chips.innerHTML = '';
        route(text);
      });
    })();
