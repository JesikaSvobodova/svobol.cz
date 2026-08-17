/**
 * Centrální obsah a ověřené firemní údaje webu svobol.cz.
 *
 * Právní údaje byly ověřeny 12. 8. 2026 v ARES (IČO 19104235) a vůči
 * first-party právním informacím na svolbox.com. Reference níže jsou výhradně
 * veřejně publikované realizace produktu Svolbox.
 */

export const site = {
  name: "svobol",
  legalName: "svobol s.r.o.",
  title: "Řízení energetických systémů | svobol",
  description:
    "Navrhujeme a realizujeme FVE, baterie a nabíjení elektromobilů. Měření, software a řízení je propojují v jeden energetický systém.",
  url: "https://svobol.cz",
  locale: "cs_CZ",
  socialPreview: "/og-image.svg",
  themeColor: "#081f3f",

  contact: {
    email: "info@svolbox.com",
    phone: "+420 773 227 929",
    phoneHref: "+420773227929",
    emailSubject: "Technický projekt pro svobol s.r.o.",
  },

  company: {
    address: ["Kopretinová 188", "Vysoká Lhota", "257 22 Čerčany"],
    ico: "19104235",
    dic: "CZ19104235",
    registry: "C 381544 vedená u Městského soudu v Praze",
  },

  /**
   * Umami — vlastní analytika na vlastní doméně. Jediný požadavek, který web
   * dělá na cizí origin. Bez cookies, bez zápisu do zařízení návštěvníka,
   * proto bez cookie lišty.
   *
   * `websiteId` NENÍ secret — je veřejně v HTML každé stránky. Je to
   * identifikátor webu na měřicí instanci, ne přístupový údaj.
   *
   * `scriptUrl` má schválně jedno lomítko. Varianta s dvojitým
   * (`analytics.svobol.com//svb.js`) odpovídá 308 redirectem na `/svb.js`,
   * tzn. hop navíc při každém načtení stránky. Endpoint pro sběr si skript
   * odvozuje z adresáře vlastního `src` — pro obě varianty vyjde stejně,
   * `https://analytics.svobol.com/svb-collect`.
   *
   * `domains` omezuje sběr na produkční doménu. Localhost, CI i náhledové
   * buildy tak nezanášejí reálnou statistiku. `www.svobol.cz` sem nepatří,
   * odpovídá 301 přesměrováním na apex.
   */
  analytics: {
    scriptUrl: "https://analytics.svobol.com/svb.js",
    websiteId: "d1ca27a1-b2dd-4011-a2e6-e1ee100c7ea8",
    domains: "svobol.cz",
  },

  nav: [
    { label: "Řízení energie", href: "/rizeni-energie" },
    { label: "Nabíjení", href: "/nabijeni-elektromobilu" },
    { label: "FVE + baterie", href: "/fotovoltaika-baterie" },
    { label: "Victron", href: "/victron" },
    { label: "Realizace", href: "/realizace" },
  ],

  contactCta: { label: "Popsat projekt", href: "/kontakt" },

  home: {
    hero: {
      eyebrow: "Engineering pro energetiku a elektromobilitu",
      headline: ["FVE.", "Baterie.", "Nabíjení.", "Řízení."],
      lead: "Navrhujeme a realizujeme fotovoltaiku, bateriová úložiště a nabíjení elektromobilů. Měření, software a řízení z nich udělají jeden funkční systém.",
      primaryCta: { label: "Popsat projekt", href: "/kontakt" },
      secondaryCta: { label: "Co umíme", href: "#oblasti" },
    },
    problemsIntro: {
      eyebrow: "Co typicky řešíme",
      title: "Technologie máte. Teď musí spolupracovat.",
      text: "Největší hodnota často nevzniká v jedné krabici, ale mezi výrobou, akumulací, spotřebou, nabíjením a sítí.",
    },
    problems: [
      {
        number: "01",
        title: "Každá část systému funguje sama?",
        text: "Propojíme měření, FVE, baterii, spotřebu, nabíjení a síť. Řízení průběžně rozhoduje, kam má energie téct.",
        outcome: "Jeden provozní celek místo izolovaných technologií.",
      },
      {
        number: "02",
        title: "Nabíjení naráží na dostupný příkon?",
        text: "Dynamicky rozdělíme výkon mezi nabíjecí body a zohledníme okamžitou spotřebu objektu, FVE i baterii.",
        outcome: "Více nabíjení bez zbytečně předimenzované přípojky.",
      },
      {
        number: "03",
        title: "Stavíte energetiku od začátku?",
        text: "Navrhneme výkon, akumulaci, měření, komunikaci i způsob řízení. Na návrh naváže elektrotechnická realizace.",
        outcome: "Systém navržený podle provozu, ne podle katalogu komponent.",
      },
    ],
    areasIntro: {
      eyebrow: "Oblasti",
      title: "Čtyři vstupy do jednoho systému",
      text: "Projekt může začít u FVE, nabíjení nebo konkrétní technologie. Návrh ale vždy posuzujeme v kontextu celého energetického provozu.",
    },
    areas: [
      {
        code: "EMS",
        title: "Řízení energie",
        text: "Měření, pravidla a dynamické řízení toků mezi výrobou, baterií, spotřebou, EV a sítí.",
        href: "/rizeni-energie",
      },
      {
        code: "EV",
        title: "Nabíjení elektromobilů",
        text: "Návrh AC infrastruktury, load management, provoz a napojení na energetiku objektu.",
        href: "/nabijeni-elektromobilu",
      },
      {
        code: "PV+BESS",
        title: "FVE a baterie",
        text: "Návrh a realizace s důrazem na vlastní spotřebu, zálohu, přetoky a budoucí řízení.",
        href: "/fotovoltaika-baterie",
      },
      {
        code: "VIC",
        title: "Victron",
        text: "Systémy MultiPlus a Quattro, GX, ESS, MPPT, baterie, monitoring a nadstavbové řízení.",
        href: "/victron",
      },
    ],
    svolbox: {
      eyebrow: "Vlastní produkt",
      title: "Svolbox propojuje nabíječku, řízení a provoz.",
      text: "Svolbox je vlastní produkt společnosti svobol s.r.o. pro chytré AC nabíjení. Spojuje wallbox, řídicí elektroniku a software pro měření, regulaci výkonu, platby a provoz nabíjecích bodů.",
      proof:
        "Je praktickým důkazem, že hardware, elektrotechniku a software umíme dovést od návrhu až do reálného provozu.",
      cta: { label: "svolbox.com", href: "https://www.svolbox.com/" },
    },
    layersIntro: {
      eyebrow: "Hardware + software",
      title: "Energetický systém není jen kabeláž a měniče.",
      text: "O výsledku rozhoduje také kvalita dat, komunikace mezi zařízeními a řídicí logika. Proto navrhujeme všechny vrstvy společně.",
    },
    layers: [
      { code: "01", label: "Energie", text: "výroba, síť, baterie, spotřeba" },
      { code: "02", label: "Hardware", text: "měniče, nabíječky, měření, jištění" },
      { code: "03", label: "Komunikace", text: "data mezi různými zařízeními" },
      { code: "04", label: "Řízení", text: "priority, limity a reakce systému" },
      { code: "05", label: "Software", text: "provoz, dohled a vlastní funkce" },
    ],
    referencesIntro: {
      eyebrow: "Ověřený provoz",
      title: "Vlastní produkt v reálných instalacích",
      text: "Veřejně publikované realizace Svolboxu ukazují práci s nabíjením pro firmy, obce i ubytovací provozy.",
    },
    finalCta: {
      eyebrow: "Technická konzultace",
      title: "Máte projekt, kde musí spolupracovat energetika, nabíjení a software?",
      text: "Popište výchozí stav, dostupný příkon, technologie a cíl. Technické detaily jsou vítané.",
      cta: { label: "Popsat projekt", href: "/kontakt" },
    },
  },

  references: [
    {
      slug: "kavarna-lanna",
      type: "Provozovna · nabíjení pro zákazníky",
      title: "Kavárna Lanna, České Budějovice",
      summary:
        "Dva AC wallboxy o výkonu 22 kW pro klienty kavárny s automatickým nabíjením a fakturací.",
      challenge: "Zpřístupnit nabíjení hostům a nezatěžovat obsluhu ručním vyúčtováním provozu.",
      solution:
        "Dvojice stanic Svolbox připojených k internetu; aplikace řeší měření, spuštění i platby.",
      result:
        "Hosté mohou nabíjet během návštěvy a provozovatel dostává vyúčtování bez ruční administrativy.",
      source: "https://www.svolbox.com/realizace",
    },
    {
      slug: "svaty-jan-nad-malsi",
      type: "Obec · lokální výroba energie",
      title: "Obec Svatý Jan nad Malší",
      summary:
        "Nabíjení elektromobilů a elektrokol v obci s vlastní solární a bioplynovou elektrárnou.",
      challenge:
        "Zajistit v turisticky aktivní obci veřejné nabíjení a využít místní výrobu elektřiny.",
      solution:
        "Svolbox pro elektromobily doplněný o nabíjení elektrokol; spuštění pro návštěvníky bez povinné aplikace.",
      result:
        "Návštěvníci mohou nabíjet během zastávky v obci a systém využívá dostupné energetické přebytky.",
      source: "https://www.svolbox.com/realizace",
    },
    {
      slug: "lipno",
      type: "Ubytování · služba pro hosty",
      title: "Chatový rezort na Lipně",
      summary: "Zákaznické nabíjení s automatickou fakturací bez výměny hlavního jističe.",
      challenge:
        "Přidat hostům nabíjení jako službu bez složité obsluhy a rozsáhlých úprav přípojky.",
      solution: "Síťově připojená stanice Svolbox s řízením provozu a automatickým vyúčtováním.",
      result:
        "Rezort nabízí nabíjení hostům; montáž podle publikované případové studie nevyžadovala výměnu jističe.",
      source: "https://www.svolbox.com/realizace",
    },
  ],

  footer: {
    statement: "Energetika, elektrotechnika a software v jednom systému.",
    legalNote: "Společnost je zapsaná v obchodním rejstříku.",
  },
} as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  email: site.contact.email,
  telephone: site.contact.phone,
  taxID: site.company.dic,
  vatID: site.company.dic,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.company.address[0],
    addressLocality: "Čerčany",
    postalCode: "257 22",
    addressCountry: "CZ",
  },
  sameAs: ["https://www.svolbox.com/"],
};
