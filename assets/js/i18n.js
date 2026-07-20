(function () {
  'use strict';

  const PREF_KEY = 'yembtp.lang';
  const DEFAULT_LANG = 'fr';

  const dict = {
    // NAV + MOBILE MENU
    'nav.about':         { fr: 'Entreprise',     en: 'Company' },
    'nav.services':      { fr: 'Services',       en: 'Services' },
    'nav.energy':        { fr: 'Énergie',        en: 'Energy' },
    'nav.team':          { fr: 'Équipe',         en: 'Team' },
    'nav.references':    { fr: 'Références',     en: 'Projects' },
    'nav.contact':       { fr: 'Contact',        en: 'Contact' },
    'nav.cta':           { fr: 'Devis gratuit',  en: 'Free quote' },
    'nav.cta_mobile':    { fr: 'Devis gratuit →', en: 'Free quote →' },
    'nav.menu_label':    { fr: 'Menu',           en: 'Menu' },
    'nav.home_label':    { fr: 'Accueil',        en: 'Home' },

    // HERO
    'hero.tag':          { fr: 'Spécialiste CVC en Île-de-France · Pros & Entreprises', en: 'HVAC specialist in Île-de-France · Pros & Businesses' },
    'hero.title':        { fr: 'Construisons ensemble<br/>des projets <em>solides</em> <em>et durables.</em>', en: 'Let’s build<br/><em>solid</em> <em>and lasting</em> projects together.' },
    'hero.sub':          { fr: 'Votre projet, notre exigence jusque dans les moindres détails. Du diagnostic aux économies réelles, nous réduisons votre facture d’énergie de A à Z.', en: 'Your project, our standards down to the smallest detail. From diagnosis to real savings, we cut your energy bill from A to Z.' },
    'hero.cta_primary':  { fr: 'Démarrer mon projet',    en: 'Start my project' },
    'hero.cta_secondary':{ fr: 'Découvrir nos services', en: 'Explore our services' },
    'hero.meta1_lab':    { fr: 'Année de création',  en: 'Founded in' },
    'hero.meta2_lab':    { fr: 'Pôles d’expertise', en: 'Areas of expertise' },
    'hero.meta3_lab':    { fr: 'Suivi complet',      en: 'End-to-end support' },
    'hero.chip1':        { fr: 'Certifiée gaz',  en: 'Gas-certified' },
    'hero.chip2':        { fr: 'CEE Partenaire', en: 'CEE Partner' },
    'hero.chip3':        { fr: '+ 250 000 m²',   en: '+ 250,000 sq.m' },

    // ABOUT
    'about.badge_overlay_small': { fr: 'Depuis 2018', en: 'Since 2018' },
    'about.badge_overlay_strong':{ fr: '+ 250 000 m² réalisés', en: '+ 250,000 sq.m delivered' },
    'about.eyebrow':     { fr: 'À propos de l’entreprise', en: 'About the company' },
    'about.title':       { fr: 'Une expertise au service de <em>projets durables</em>.', en: 'Expertise serving <em>lasting projects</em>.' },
    'about.p1':          { fr: 'Depuis sa création en 2018, <strong>YEMBTP</strong> accompagne ses clients dans leurs projets avec expertise et engagement. Spécialisée en <strong>CVC</strong> (chauffage, ventilation, climatisation), en rénovation et en maintenance, notre entreprise met son savoir-faire au service de solutions durables et performantes.', en: 'Since its founding in 2018, <strong>YEMBTP</strong> has supported its clients with expertise and commitment. Specialised in <strong>HVAC</strong> (heating, ventilation, air conditioning), renovation and maintenance, we put our know-how at the service of sustainable, high-performance solutions.' },
    'about.p2':          { fr: 'Certifiée et qualifiée dans les domaines du <strong>gaz et de la soudure</strong>, YEMBTP garantit des interventions conformes aux normes les plus exigeantes, alliant sécurité, qualité et efficacité.', en: 'Certified and qualified in <strong>gas and welding</strong>, YEMBTP guarantees work that meets the most demanding standards — combining safety, quality and efficiency.' },
    'about.p3':          { fr: 'Soucieux de votre budget comme de l’environnement, nous vous accompagnons également dans l’obtention des dispositifs de <strong>Certificats d’Économies d’Énergie (CEE)</strong>, afin d’alléger significativement votre facture énergétique.', en: 'Mindful of both your budget and the environment, we also support you in obtaining <strong>Energy Savings Certificates (CEE)</strong>, to significantly lower your energy bill.' },
    'about.badge1':      { fr: 'Certifiée gaz',    en: 'Gas-certified' },
    'about.badge2':      { fr: 'Qualifiée soudure', en: 'Welding-qualified' },
    'about.badge3':      { fr: 'Partenaire CEE',   en: 'CEE Partner' },
    'about.badge4':      { fr: 'Toute la France',  en: 'Nationwide France' },

    // SERVICES
    'services.eyebrow':  { fr: 'Nos services', en: 'Our services' },
    'services.title':    { fr: 'Un savoir-faire complet, <em>de l’étude à la livraison.</em>', en: 'Complete know-how, <em>from study to delivery.</em>' },
    'services.lead':     { fr: 'Étude · CVC / Plomberie · Serrurerie · Curage · Menuiserie extérieure · Flocage / Coupe-feu / Isolation thermique — un seul interlocuteur pour l’ensemble de vos lots techniques.', en: 'Design · HVAC / Plumbing · Metalwork · Strip-out · Exterior joinery · Fireproof spraying / Firestopping / Thermal insulation — one single contact for all your technical works packages.' },
    'services.tab_all':        { fr: 'Tous les pôles', en: 'All areas' },
    'services.tab_etude':      { fr: 'Étude',          en: 'Design' },
    'services.tab_cvc':        { fr: 'CVC / Plomberie', en: 'HVAC / Plumbing' },
    'services.tab_serrurerie': { fr: 'Serrurerie',     en: 'Metalwork' },
    'services.tab_curage':     { fr: 'Curage',         en: 'Strip-out' },
    'services.tab_menuiserie': { fr: 'Menuiserie',     en: 'Joinery' },
    'services.tab_flocage':    { fr: 'Flocage',        en: 'Fireproof spraying' },
    'services.c1_title': { fr: 'Étude et réalisation', en: 'Design & build' },
    'services.c1_text':  { fr: 'Analyse de vos besoins, conception sur mesure et pilotage complet des travaux — de l’avant-projet à la livraison.', en: 'Needs analysis, tailored design and full project management — from preliminary studies to handover.' },
    'services.c2_title': { fr: 'CVC / Plomberie', en: 'HVAC / Plumbing' },
    'services.c2_text':  { fr: 'Chauffage, ventilation, climatisation, réseaux d’eau et installations gaz — solutions performantes et conformes aux normes.', en: 'Heating, ventilation, air conditioning, water networks and gas installations — high-performance and standards-compliant.' },
    'services.c3_title': { fr: 'Serrurerie', en: 'Metalwork' },
    'services.c3_text':  { fr: 'Fermetures, contrôles d’accès et ouvrages métalliques sur mesure pour le tertiaire et les bâtiments recevant du public.', en: 'Closures, access control and bespoke metal structures for commercial and public-access buildings.' },
    'services.c4_title': { fr: 'Curage', en: 'Strip-out' },
    'services.c4_text':  { fr: 'Démolition sélective et préparation des bâtiments avant rénovation : dépose des éléments non structurels, tri et évacuation.', en: 'Selective demolition and building preparation prior to renovation: removal of non-structural elements, sorting and disposal.' },
    'services.c5_title': { fr: 'Menuiserie extérieure', en: 'Exterior joinery' },
    'services.c5_text':  { fr: 'Fourniture et pose de fenêtres, portes, baies vitrées et façades — aluminium, bois et PVC adaptés à chaque projet.', en: 'Supply and installation of windows, doors, glazing and façades — aluminium, wood and PVC tailored to each project.' },
    'services.c6_title': { fr: 'Flocage / Coupe-feu / Isolation thermique', en: 'Fireproof spraying / Firestopping / Thermal insulation' },
    'services.c6_text':  { fr: 'Protection passive incendie, calfeutrement coupe-feu et isolation thermique : conformité ERP et performance énergétique.', en: 'Passive fire protection, firestopping and thermal insulation: public-building compliance and energy performance.' },

    // MISSION
    'mission.eyebrow':   { fr: 'Mission & Vision', en: 'Mission & Vision' },
    'mission.title':     { fr: 'Notre engagement, votre <em>tranquillité</em>.', en: 'Our commitment, your <em>peace of mind</em>.' },
    'mission.card1_h':   { fr: 'Mission', en: 'Mission' },
    'mission.card1_p':   { fr: 'Avec YEMBTP, chaque projet allie exigence technique, qualité durable et maîtrise énergétique. Nous mettons l’expertise de nos équipes au service de vos objectifs de performance.', en: 'With YEMBTP, every project combines technical rigour, lasting quality and energy efficiency. We put our teams’ expertise at the service of your performance goals.' },
    'mission.card2_h':   { fr: 'Vision', en: 'Vision' },
    'mission.card2_p':   { fr: 'YEMBTP s’impose comme un partenaire de confiance, engagé pour un BTP plus performant et responsable, soucieux de l’environnement comme du budget de ses clients.', en: 'YEMBTP stands out as a trusted partner, committed to a more efficient and responsible construction industry — mindful of both the environment and clients’ budgets.' },

    // TEAM
    'team.eyebrow':      { fr: 'Organisation & Gestion', en: 'Organisation & Management' },
    'team.title':        { fr: 'Une équipe <em>pluridisciplinaire</em> et passionnée.', en: 'A <em>multidisciplinary</em> and passionate team.' },
    'team.lead':         { fr: 'Architectes, ingénieurs, chefs de projet et ouvriers qualifiés — réunis pour fournir des résultats d’exception, alliant qualité, durabilité et satisfaction client.', en: 'Architects, engineers, project managers and skilled workers — united to deliver exceptional results combining quality, durability and client satisfaction.' },
    'team.saber_bubble': { fr: 'Fondateur de YEMBTP, je mets toute mon expertise au service de vos projets.', en: 'Founder of YEMBTP — I put all my expertise at the service of your projects.' },
    'team.saber_role':   { fr: 'Président', en: 'President' },
    'team.ahmed_bubble': { fr: 'Je vous accompagne de l’étude à la livraison pour concrétiser vos projets.', en: 'I support you from study to handover, turning your projects into reality.' },
    'team.ahmed_role':   { fr: 'Chargé d’affaires', en: 'Account Manager' },
    'team.sandra_bubble':{ fr: 'Rigueur et suivi précis pour la gestion administrative et comptable de vos projets.', en: 'Rigour and precise tracking for the administrative and accounting management of your projects.' },
    'team.sandra_role':  { fr: 'Assistante de direction', en: 'Executive Assistant' },
    'team.paulo_bubble': { fr: 'La menuiserie est ma passion : précision et finitions soignées garanties.', en: 'Joinery is my passion: precision and refined finishes guaranteed.' },
    'team.paulo_role':   { fr: 'Responsable Pôle Menuiserie', en: 'Head of Joinery' },
    'team.aria_saber':   { fr: 'Voir le message de Saber',  en: 'See Saber’s message' },
    'team.aria_ahmed':   { fr: 'Voir le message d’Ahmed', en: 'See Ahmed’s message' },
    'team.aria_sandra':  { fr: 'Voir le message de Sandra', en: 'See Sandra’s message' },
    'team.aria_paulo':   { fr: 'Voir le message de Paulo',  en: 'See Paulo’s message' },

    // ENERGY
    'energy.eyebrow':    { fr: 'Solutions énergétiques', en: 'Energy solutions' },
    'energy.title':      { fr: 'Un accompagnement personnalisé dans votre <em>transition énergétique</em>.', en: 'Personalised support for your <em>energy transition</em>.' },
    'energy.p1':         { fr: '<strong>YEMBTP</strong> vous accompagne de A à Z dans la réalisation de vos projets d’économies d’énergie.', en: '<strong>YEMBTP</strong> supports you from A to Z in delivering your energy-saving projects.' },
    'energy.p2':         { fr: 'À travers cette activité, nous vous proposons un suivi global et personnalisé, avec un <strong>interlocuteur unique</strong> tout au long de votre projet. Celui-ci assure la coordination entre nos différents pôles de compétences : bureau d’études, travaux, ainsi que l’accompagnement dans l’obtention de subventions lorsque cela est éligible.', en: 'Through this activity, we offer comprehensive, personalised follow-up with a <strong>single point of contact</strong> throughout your project. They coordinate our various areas of expertise: design office, works, and support in obtaining subsidies when eligible.' },
    'energy.p3':         { fr: 'Notre objectif est double : vous permettre de <strong>réduire le coût global de vos travaux</strong> grâce aux aides disponibles, mais aussi d’optimiser durablement vos consommations énergétiques. Nous travaillons également sur la réduction de vos factures d’électricité grâce à nos partenariats directs avec des fournisseurs d’énergie.', en: 'Our goal is twofold: to help you <strong>reduce the overall cost of your works</strong> through available subsidies, and to sustainably optimise your energy consumption. We also work to lower your electricity bills through direct partnerships with energy providers.' },
    'energy.s1_h':       { fr: 'Bureau d’étude', en: 'Design office' },
    'energy.s1_p':       { fr: 'Analyse, faisabilité, dimensionnement, plans et chiffrage des travaux.', en: 'Analysis, feasibility, sizing, drawings and works costing.' },
    'energy.s2_h':       { fr: 'Gestion de projets', en: 'Project management' },
    'energy.s2_p':       { fr: 'Coordination et suivi de la mise en œuvre. Plateforme OPERAT.', en: 'Coordination and supervision of the works. OPERAT platform.' },
    'energy.s3_h':       { fr: 'Financements', en: 'Funding' },
    'energy.s3_p':       { fr: 'Certificats d’Économies d’Énergie (CEE) et aides publiques mobilisables.', en: 'Energy Savings Certificates (CEE) and available public subsidies.' },
    'energy.s4_h':       { fr: 'Travaux', en: 'Works' },
    'energy.s4_p':       { fr: 'CVC, plomberie, serrurerie, menuiserie, curage, flocage, isolation, coupe-feu.', en: 'HVAC, plumbing, metalwork, joinery, strip-out, fireproof spraying, insulation, firestopping.' },
    'energy.s5_h':       { fr: 'Courtage énergie', en: 'Energy brokerage' },
    'energy.s5_p':       { fr: 'Conseil et accompagnement pour accéder aux meilleures offres du marché.', en: 'Advice and support to access the best offers on the market.' },

    // REFERENCES
    'refs.eyebrow':      { fr: 'Nos références', en: 'Our projects' },
    'refs.title':        { fr: 'Des chantiers d’<em>envergure</em>, livrés avec exigence.', en: '<em>Large-scale</em> projects, delivered with rigour.' },
    'refs.lead':         { fr: 'Parkings, résidences, bâtiments tertiaires et patrimoniaux — YEMBTP intervient sur des sites variés avec un haut niveau de qualification.', en: 'Car parks, residences, commercial and heritage buildings — YEMBTP works on a wide range of sites with a high level of qualification.' },
    'refs.c1_tag':       { fr: 'Parking', en: 'Car park' },
    'refs.c1_loc':       { fr: 'La Défense', en: 'La Défense' },
    'refs.c1_h':         { fr: 'Parking Michelet', en: 'Michelet Car Park' },
    'refs.c1_p':         { fr: 'Application de flocage coupe-feu sur l’ensemble des structures du parking.', en: 'Fireproof spraying applied to the entire structure of the car park.' },
    'refs.c1_spec':      { fr: '95 000 m² de flocage coupe-feu', en: '95,000 sq.m of fireproof spraying' },
    'refs.c2_tag':       { fr: 'Résidentiel', en: 'Residential' },
    'refs.c2_loc':       { fr: 'Achères', en: 'Achères' },
    'refs.c2_h':         { fr: 'Résidence Pegase', en: 'Résidence Pegase' },
    'refs.c2_p':         { fr: 'Interventions techniques réalisées par les équipes YEMBTP sur ce programme résidentiel.', en: 'Technical works carried out by the YEMBTP teams on this residential development.' },
    'refs.c2_spec':      { fr: 'Chantier livré', en: 'Project delivered' },
    'refs.c3_tag':       { fr: 'Tertiaire', en: 'Commercial' },
    'refs.c3_loc':       { fr: 'Villeurbanne', en: 'Villeurbanne' },
    'refs.c3_h':         { fr: 'Le Parhelion', en: 'Le Parhelion' },
    'refs.c3_p':         { fr: 'Interventions techniques réalisées par les équipes YEMBTP sur cet ensemble tertiaire.', en: 'Technical works carried out by the YEMBTP teams on this office complex.' },
    'refs.c3_spec':      { fr: 'Chantier livré', en: 'Project delivered' },
    'refs.c4_tag':       { fr: 'Patrimoine', en: 'Heritage' },
    'refs.c4_loc':       { fr: 'Orsay', en: 'Orsay' },
    'refs.c4_h':         { fr: 'Château Courbeville', en: 'Château Courbeville' },
    'refs.c4_p':         { fr: 'Interventions techniques réalisées par les équipes YEMBTP sur ce site patrimonial.', en: 'Technical works carried out by the YEMBTP teams on this heritage site.' },
    'refs.c4_spec':      { fr: 'Chantier livré', en: 'Project delivered' },
    'refs.c5_tag':       { fr: 'Culture', en: 'Culture' },
    'refs.c5_loc':       { fr: 'Paris', en: 'Paris' },
    'refs.c5_h':         { fr: 'Théâtre de la Ville', en: 'Théâtre de la Ville' },
    'refs.c5_p':         { fr: 'Interventions techniques réalisées par les équipes YEMBTP sur cet établissement culturel.', en: 'Technical works carried out by the YEMBTP teams on this cultural venue.' },
    'refs.c5_spec':      { fr: 'Chantier livré', en: 'Project delivered' },
    'refs.c6_tag':       { fr: 'Votre projet', en: 'Your project' },
    'refs.c6_loc':       { fr: 'Et vous, demain ?', en: 'And you, tomorrow?' },
    'refs.c6_h':         { fr: 'Votre prochain chantier', en: 'Your next project' },
    'refs.c6_p':         { fr: 'Tertiaire, hospitalier, industriel ou résidentiel collectif — nous étudions votre projet sans engagement.', en: 'Commercial, hospital, industrial or collective residential — we study your project with no commitment.' },
    'refs.c6_cta':       { fr: 'Discutons-en →', en: 'Let’s talk →' },

    // CONTACT
    'contact.eyebrow':   { fr: 'Contact', en: 'Contact' },
    'contact.title':     { fr: 'Pour toute<br/>information,<br/><em>contactez-nous.</em>', en: 'For any<br/>enquiry,<br/><em>get in touch.</em>' },
    'contact.lead':      { fr: 'Notre équipe vous répond sous 24h ouvrées et organise un rendez-vous d’étude sur site si nécessaire.', en: 'Our team replies within 24 working hours and arranges an on-site survey if needed.' },
    'contact.info_email':{ fr: 'E-mail', en: 'Email' },
    'contact.info_phone':{ fr: 'Téléphone', en: 'Phone' },
    'contact.info_addr': { fr: 'Adresse', en: 'Address' },
    'contact.info_zone': { fr: 'Zone d’intervention', en: 'Service area' },
    'contact.info_zone_value': { fr: 'Toute la France', en: 'Nationwide France' },
    'contact.form_eyebrow':{ fr: 'Devis personnalisé', en: 'Tailored quote' },
    'contact.form_title':{ fr: 'Parlons de <em>votre projet</em>.', en: 'Let’s talk about <em>your project</em>.' },
    'contact.form_lead': { fr: 'Gratuit, sans engagement. Un chargé d’affaires dédié vous rappelle sous 24h ouvrées.', en: 'Free, no commitment. A dedicated account manager calls you back within 24 working hours.' },
    'contact.label_nom': { fr: 'Nom', en: 'Name' },
    'contact.label_soc': { fr: 'Société', en: 'Company' },
    'contact.label_mail':{ fr: 'E-mail', en: 'Email' },
    'contact.label_tel': { fr: 'Téléphone', en: 'Phone' },
    'contact.label_type':{ fr: 'Type de projet', en: 'Project type' },
    'contact.label_msg': { fr: 'Votre message — surface, contraintes, échéance…', en: 'Your message — size, constraints, timeline…' },
    'contact.opt_clim':  { fr: 'Climatisation', en: 'Air conditioning' },
    'contact.opt_vent':  { fr: 'Ventilation / CVC', en: 'Ventilation / HVAC' },
    'contact.opt_chauf': { fr: 'Chauffage', en: 'Heating' },
    'contact.opt_iso':   { fr: 'Isolation / Flocage', en: 'Insulation / Fireproof spraying' },
    'contact.opt_men':   { fr: 'Menuiserie / Serrurerie', en: 'Joinery / Metalwork' },
    'contact.opt_cee':   { fr: 'Solutions énergétiques (CEE)', en: 'Energy solutions (CEE)' },
    'contact.opt_other': { fr: 'Autre', en: 'Other' },
    'contact.submit':    { fr: 'Envoyer ma demande', en: 'Send my enquiry' },
    'contact.trust1':    { fr: 'Données chiffrées', en: 'Encrypted data' },
    'contact.trust2':    { fr: 'Réponse 24h', en: '24 h response' },
    'contact.trust3':    { fr: 'Sans engagement', en: 'No commitment' },

    // FOOTER
    'footer.brand_p':    { fr: 'Construisons ensemble des projets solides et durables. Spécialiste CVC, isolation, menuiserie et serrurerie pour les professionnels.', en: 'Let’s build solid and lasting projects together. HVAC, insulation, joinery and metalwork specialist for professionals.' },
    'footer.aria_ig':    { fr: 'Instagram', en: 'Instagram' },
    'footer.aria_fb':    { fr: 'Facebook', en: 'Facebook' },
    'footer.aria_google':{ fr: 'Profil Google', en: 'Google profile' },
    'footer.col1_h':     { fr: 'Entreprise', en: 'Company' },
    'footer.col1_about': { fr: 'À propos', en: 'About' },
    'footer.col1_team':  { fr: 'Équipe', en: 'Team' },
    'footer.col1_refs':  { fr: 'Références', en: 'Projects' },
    'footer.col1_contact': { fr: 'Contact', en: 'Contact' },
    'footer.col2_h':     { fr: 'Services', en: 'Services' },
    'footer.col2_s1':    { fr: 'Climatisation', en: 'Air conditioning' },
    'footer.col2_s2':    { fr: 'Ventilation & CVC', en: 'Ventilation & HVAC' },
    'footer.col2_s3':    { fr: 'Isolation & Flocage', en: 'Insulation & Fireproof spraying' },
    'footer.col2_s4':    { fr: 'Menuiserie / Serrurerie', en: 'Joinery / Metalwork' },
    'footer.col3_h':     { fr: 'Contact', en: 'Contact' },
    'footer.zone':       { fr: 'Intervention sur toute la France', en: 'Service throughout France' },
    'footer.copyright':  { fr: 'YEMBTP — Tous droits réservés · SIRET 83889464000047', en: 'YEMBTP — All rights reserved · SIRET 83889464000047' },
    'footer.legal_ml':   { fr: 'Mentions légales', en: 'Legal notice' },
    'footer.legal_conf': { fr: 'Confidentialité', en: 'Privacy' },

    // CHATBOT TOGGLE (the chatbot itself stays in French)
    'cb.toggle_aria':    { fr: 'Ouvrir l’assistant YEMBTP', en: 'Open YEMBTP assistant (French)' },
    'cb.toggle_label':   { fr: 'Une question ?', en: 'A question?' },

    // LANG SWITCH ARIA
    'i18n.aria_switch':  { fr: 'Choisir la langue', en: 'Choose language' },
    'i18n.aria_fr':      { fr: 'Passer en français', en: 'Switch to French' },
    'i18n.aria_en':      { fr: 'Passer en anglais',  en: 'Switch to English' }
  };

  function getLang() {
    try {
      const saved = localStorage.getItem(PREF_KEY);
      if (saved === 'fr' || saved === 'en') return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function saveLang(lang) {
    try { localStorage.setItem(PREF_KEY, lang); } catch (e) {}
  }

  function translate(key, lang) {
    const entry = dict[key];
    if (!entry) return null;
    return entry[lang] != null ? entry[lang] : entry[DEFAULT_LANG];
  }

  function apply(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const v = translate(el.dataset.i18n, lang);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const v = translate(el.dataset.i18nHtml, lang);
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const v = translate(el.dataset.i18nPlaceholder, lang);
      if (v != null) el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      const v = translate(el.dataset.i18nAriaLabel, lang);
      if (v != null) el.setAttribute('aria-label', v);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      const v = translate(el.dataset.i18nAlt, lang);
      if (v != null) el.setAttribute('alt', v);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      const v = translate(el.dataset.i18nTitle, lang);
      if (v != null) el.setAttribute('title', v);
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang-set]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.langSet === lang);
      btn.setAttribute('aria-pressed', btn.dataset.langSet === lang ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (lang !== 'fr' && lang !== 'en') return;
    saveLang(lang);
    apply(lang);
  }

  function init() {
    apply(getLang());
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-lang-set]');
      if (!btn) return;
      e.preventDefault();
      setLang(btn.dataset.langSet);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.yembtpI18n = { setLang: setLang, getLang: getLang };
})();
