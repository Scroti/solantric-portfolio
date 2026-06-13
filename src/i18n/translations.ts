export type Locale = 'ro' | 'en'

export const translations = {
  ro: {
    nav: {
      about: 'Despre',
      work: 'Proiecte',
      contact: 'Contact',
      cta: 'contactează-mă',
    },
    hero: {
      label: 'dev & design',
      sub: 'Developer & Designer · freelancer din România',
      btnProjects: 'Proiecte →',
      btnContact: 'Contact',
      btnCall: 'sau programează un call',
    },
    about: {
      label: 'Despre',
      title: 'Combin codul\ncu designul.',
      p1: 'Sunt Cristian Mihalache, freelancer din România. Nu fac doar cod și nu fac doar design — fac amândouă, ceea ce înseamnă că primești un produs coerent fără să ai nevoie de o echipă întreagă.',
      p2: 'Lucrez cu clienți locali și internaționali: startup-uri, agenții, business-uri mici care vor să arate profesionist online.',
      btnCall: 'Programează call →',
      services: [
        { title: 'Web Development', desc: 'Aplicații web rapide și scalabile cu Next.js, React și TypeScript.' },
        { title: 'UI/UX Design', desc: 'Interfețe clare și estetice, de la wireframe până la produs final.' },
        { title: 'Full-Stack Freelance', desc: 'Un singur om, produs complet — de la design până la deployment.' },
      ],
      stats: [
        { n: '', label: 'ani experiență' },
        { n: '15+', label: 'proiecte livrate' },
        { n: '100%', label: 'remote-first' },
      ],
    },
    projects: {
      label: 'Work',
      title: 'Proiecte selectate.',
      items: {
        armonia2:    { desc: 'Platformă web pentru servicii funerare' },
        filo:        { desc: 'Aplicație de gestionare task-uri' },
        teamlatch:   { desc: 'Tool de colaborare pentru echipe dev' },
        'item-shop': { desc: 'Shop de iteme pentru servere de gaming' },
        bonusbot:    { desc: 'Bot Telegram pentru cazinouri online' },
      },
    },
    contact: {
      label: 'Contact',
      title: 'Să lucrăm\nîmpreună.',
      sub: 'Ai un proiect în minte? Scrie-mi și îți răspund în 24 de ore.',
      name: 'Nume',
      email: 'Email',
      message: 'Descrie proiectul tău...',
      send: 'Trimite mesaj',
      sending: 'Se trimite...',
      sent: 'Mesaj trimis!',
      sentSub: 'Te contactez în curând.',
      error: 'Ceva n-a mers. Încearcă din nou.',
    },
    footer: {
      copy: '© {year} solantric',
    },
  },
  en: {
    nav: {
      about: 'About',
      work: 'Work',
      contact: 'Contact',
      cta: 'get in touch',
    },
    hero: {
      label: 'dev & design',
      sub: 'Developer & Designer · freelancer from Romania',
      btnProjects: 'Projects →',
      btnContact: 'Contact',
      btnCall: 'or book a call',
    },
    about: {
      label: 'About',
      title: 'I combine code\nwith design.',
      p1: "I'm Cristian Mihalache, a freelancer from Romania. I don't just code and I don't just design — I do both, which means you get a coherent product without needing a whole team.",
      p2: 'I work with local and international clients: startups, agencies, small businesses that want to look professional online.',
      btnCall: 'Book a call →',
      services: [
        { title: 'Web Development', desc: 'Fast, scalable web apps with Next.js, React and TypeScript.' },
        { title: 'UI/UX Design', desc: 'Clear, aesthetic interfaces — from wireframe to final product.' },
        { title: 'Full-Stack Freelance', desc: 'One person, complete product — from design to deployment.' },
      ],
      stats: [
        { n: '', label: 'years experience' },
        { n: '15+', label: 'projects shipped' },
        { n: '100%', label: 'remote-first' },
      ],
    },
    projects: {
      label: 'Work',
      title: 'Selected projects.',
      items: {
        armonia2:    { desc: 'Web platform for funeral services' },
        filo:        { desc: 'Task management application' },
        teamlatch:   { desc: 'Collaboration tool for dev teams' },
        'item-shop': { desc: 'Item shop for gaming servers' },
        bonusbot:    { desc: 'Telegram bot for online casinos' },
      },
    },
    contact: {
      label: 'Contact',
      title: "Let's work\ntogether.",
      sub: 'Have a project in mind? Write me and I\'ll reply within 24 hours.',
      name: 'Name',
      email: 'Email',
      message: 'Describe your project...',
      send: 'Send message',
      sending: 'Sending...',
      sent: 'Message sent!',
      sentSub: "I'll get back to you soon.",
      error: "Something went wrong. Try again.",
    },
    footer: {
      copy: '© {year} solantric',
    },
  },
} as const

export type TranslationKeys = typeof translations.ro
