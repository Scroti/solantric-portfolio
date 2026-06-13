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
      label: 'Web Development & Design',
      sub: 'Proiectăm și construim aplicații web și produse digitale moderne.',
      btnProjects: 'Proiecte →',
      btnContact: 'Contact',
      btnCall: 'sau programează un call',
    },
    about: {
      label: 'Despre',
      title: 'Combin codul\ncu designul.',
      p1: 'Sunt Cristian Mihalache, dezvoltator și designer independent. Combin dezvoltarea web cu designul pentru a crea produse digitale complete și coerente, de la prima schiță până la lansare.',
      p2: 'Colaborez cu clienți locali și internaționali: startup-uri, agenții și companii care își doresc o prezență online profesionistă și rezultate concrete.',
      btnCall: 'Programează call →',
      services: [
        { title: 'Web Development', desc: 'Aplicații web rapide și scalabile, construite cu Next.js, React și TypeScript.' },
        { title: 'UI/UX Design', desc: 'Interfețe clare și intuitive, gândite în jurul utilizatorului final.' },
        { title: 'SEO & Performanță', desc: 'Site-uri optimizate pentru viteză, vizibilitate și conversii.' },
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
      more: 'Vezi toate proiectele',
      less: 'Arată mai puține',
      items: {
        armonia2:     { desc: 'Platformă web pentru servicii funerare' },
        filo:         { desc: 'Aplicație de gestionare task-uri' },
        teamlatch:    { desc: 'Tool de colaborare pentru echipe dev' },
        'item-shop':  { desc: 'Shop de iteme pentru servere de gaming' },
        bonusbot:     { desc: 'Bot Telegram pentru cazinouri online' },
        'metin2-bot': { desc: 'Bot de automatizare pentru jocul Metin2' },
        scrotios:     { desc: 'Proiect personal experimental' },
      },
    },
    testimonials: {
      label: 'Testimoniale',
      title: 'Ce spun clienții.',
      items: [
        { quote: 'Cristian a livrat exact ce aveam nevoie, la timp și fără bătăi de cap. Comunicare excelentă pe tot parcursul proiectului.', name: 'Andrei Popescu', role: 'Fondator, Startup' },
        { quote: 'Un profesionist complet, a gândit atât designul, cât și partea tehnică. Site-ul nostru arată și funcționează impecabil.', name: 'Maria Ionescu', role: 'Marketing Manager' },
        { quote: 'Rapid, atent la detalii și foarte ușor de lucrat cu el. Îl recomand cu încredere oricui caută un dezvoltator serios.', name: 'Alex Dumitru', role: 'CEO, Agenție' },
      ],
    },
    contact: {
      label: 'Contact',
      title: 'Să lucrăm\nîmpreună.',
      sub: 'Aveți un proiect în minte? Scrieți-mi, iar răspunsul vine în maximum 24 de ore.',
      name: 'Nume',
      email: 'Email',
      message: 'Descrieți proiectul...',
      send: 'Trimite mesaj',
      sending: 'Se trimite...',
      sent: 'Mesaj trimis!',
      sentSub: 'Vă contactez în cel mai scurt timp.',
      error: 'A apărut o eroare. Vă rugăm încercați din nou.',
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
      label: 'Web Development & Design',
      sub: 'We design and build modern web apps and digital products.',
      btnProjects: 'Projects →',
      btnContact: 'Contact',
      btnCall: 'or book a call',
    },
    about: {
      label: 'About',
      title: 'I combine code\nwith design.',
      p1: "I'm Cristian Mihalache, an independent developer and designer. I combine web development with design to create complete, coherent digital products, from the first sketch to launch.",
      p2: 'I work with local and international clients: startups, agencies and companies that want a professional online presence and concrete results.',
      btnCall: 'Book a call →',
      services: [
        { title: 'Web Development', desc: 'Fast, scalable web applications built with Next.js, React and TypeScript.' },
        { title: 'UI/UX Design', desc: 'Clear, intuitive interfaces designed around the end user.' },
        { title: 'SEO & Performance', desc: 'Websites optimised for speed, visibility and conversions.' },
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
      more: 'View all projects',
      less: 'Show less',
      items: {
        armonia2:     { desc: 'Web platform for funeral services' },
        filo:         { desc: 'Task management application' },
        teamlatch:    { desc: 'Collaboration tool for dev teams' },
        'item-shop':  { desc: 'Item shop for gaming servers' },
        bonusbot:     { desc: 'Telegram bot for online casinos' },
        'metin2-bot': { desc: 'Automation bot for the game Metin2' },
        scrotios:     { desc: 'Experimental personal project' },
      },
    },
    testimonials: {
      label: 'Testimonials',
      title: 'What clients say.',
      items: [
        { quote: 'Cristian delivered exactly what we needed, on time and without any hassle. Excellent communication throughout the project.', name: 'Andrei Popescu', role: 'Founder, Startup' },
        { quote: 'A complete professional, he handled both the design and the technical side. Our site looks and works flawlessly.', name: 'Maria Ionescu', role: 'Marketing Manager' },
        { quote: 'Fast, detail-oriented and very easy to work with. I highly recommend him to anyone looking for a reliable developer.', name: 'Alex Dumitru', role: 'CEO, Agency' },
      ],
    },
    contact: {
      label: 'Contact',
      title: "Let's work\ntogether.",
      sub: "Have a project in mind? Get in touch and I'll respond within 24 hours.",
      name: 'Name',
      email: 'Email',
      message: 'Describe your project...',
      send: 'Send message',
      sending: 'Sending...',
      sent: 'Message sent!',
      sentSub: "I'll get back to you shortly.",
      error: "Something went wrong. Please try again.",
    },
    footer: {
      copy: '© {year} solantric',
    },
  },
} as const

export type TranslationKeys = typeof translations.ro
