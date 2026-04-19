/**
 * Centrální konfigurace webu svobol.cz
 */

export const site = {
  name: "Svobol",
  title: "Svobol — Nabíjecí stanice a fotovoltaika",
  description:
    "Profesionální instalace nabíjecích stanic Svolbox a fotovoltaických elektráren. Rychle, spolehlivě, na klíč.",
  url: "https://svobol.cz",
  locale: "cs_CZ",
  ogImage: "/images/og-image.svg",

  contact: {
    email: "info@svobol.cz",
    phone: "+420 000 000 000",
    company: "Svobol s.r.o.",
    ico: "",
  },

  social: {
    facebook: "https://www.facebook.com/svobol",
    instagram: "https://www.instagram.com/svobol",
  },

  hero: {
    headline: "Nabíjecí stanice & fotovoltaika",
    subheadline:
      "Instalujeme nabíjecí stanice Svolbox pro domy, firmy i bytové komplexy. Navrhujeme a montujeme fotovoltaické elektrárny na míru.",
    ctaText: "Naše služby",
    ctaLink: "/sluzby",
    secondaryCtaText: "Kontaktujte nás",
    secondaryCtaLink: "/kontakt",
  },

  services: [
    {
      title: "Nabíjecí stanice Svolbox",
      description:
        "Dodáváme a instalujeme nabíjecí stanice Svolbox pro rodinné domy, bytové domy, komerční objekty a parkoviště. Výkon od 7,4 kW do 150 kW.",
      icon: "bolt",
      link: "https://svolbox.com",
      linkLabel: "svolbox.com",
    },
    {
      title: "Fotovoltaické elektrárny",
      description:
        "Kompletní návrh, dodávka a montáž FVE pro rodinné domy i firmy. Zahrnuje panely, střídač, bateriové úložiště a připojení k síti.",
      icon: "sun",
      link: "/sluzby",
      linkLabel: "Více o FVE",
    },
    {
      title: "Instalace na klíč",
      description:
        "Od prvotní konzultace přes projekt a vyřízení dotací až po spuštění. Staráme se o vše — vy jen sledujete, jak vaše investice vydělává.",
      icon: "key",
      link: "/kontakt",
      linkLabel: "Domluvit schůzku",
    },
  ],

  nav: [
    { label: "Úvod", href: "/" },
    { label: "Služby", href: "/sluzby" },
    { label: "Kontakt", href: "/kontakt" },
  ],
} as const;
