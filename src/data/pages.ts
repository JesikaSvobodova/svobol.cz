export type ServicePageData = {
  slug: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  signal: readonly string[];
  intro: { title: string; text: string };
  situations: readonly { title: string; text: string }[];
  systemTitle: string;
  systemText: string;
  systemItems: readonly { code: string; title: string; text: string }[];
  capabilitiesTitle: string;
  capabilities: readonly string[];
  process: readonly { number: string; title: string; text: string }[];
  fit: {
    title: string;
    text: string;
    good: readonly string[];
    notFor: readonly string[];
  };
  cta: { title: string; text: string };
  technologies?: readonly string[];
};

export const servicePages = {
  energy: {
    slug: "rizeni-energie",
    breadcrumb: "Řízení energie",
    eyebrow: "Energetický management · EMS",
    title: "Řízení energie propojí technologie v jeden provozní celek.",
    metaTitle: "Řízení fotovoltaiky a energetický management | svobol",
    metaDescription:
      "Řízení FVE, baterie, přetoků, spotřeby a nabíjení. Navrhujeme energetický management nad různými zařízeními a provozními limity.",
    lead: "Měříme stav systému, vyhodnocujeme aktuální podmínky a řídíme výkon tam, kde má v danou chvíli největší smysl.",
    signal: ["Měření", "Rozhodnutí", "Výkon"],
    intro: {
      title: "Hodnota vzniká mezi zařízeními.",
      text: "FVE, baterie, nabíječky a spotřebiče mohou být kvalitní samy o sobě, ale bez společného řízení sleduje každý prvek vlastní logiku. Energetický management nad nimi udržuje limity přípojky, priority provozu i požadované chování vůči síti.",
    },
    situations: [
      {
        title: "Různí výrobci, oddělená data",
        text: "Zařízení poskytují vlastní monitoring, ale neumějí společně reagovat na stav celého objektu.",
      },
      {
        title: "Přebytky a ceny se mění v čase",
        text: "Pevný časový plán nestačí. Řízení musí pracovat s výrobou, spotřebou, stavem baterie a provozními pravidly.",
      },
      {
        title: "Příkon má tvrdý strop",
        text: "Nabíjení nebo další zátěž nesmí překročit rezervovaný výkon ani shodit hlavní jištění.",
      },
    ],
    systemTitle: "Od dat k fyzickému výkonu",
    systemText:
      "Řídicí smyčka musí být měřitelná, vysvětlitelná a navržená pro bezpečné chování i při výpadku komunikace.",
    systemItems: [
      {
        code: "INPUT",
        title: "Měření",
        text: "Výroba, import, export, spotřeba, stav baterie, dostupný příkon a ceny.",
      },
      {
        code: "LINK",
        title: "Komunikace",
        text: "Sjednocení dat a povelů mezi technologiemi různých výrobců.",
      },
      {
        code: "LOGIC",
        title: "Rozhodnutí",
        text: "Priority, výkonové limity, časové plány a reakce na aktuální stav.",
      },
      {
        code: "OUTPUT",
        title: "Akce",
        text: "Řízení baterie, nabíjení, regulovatelné spotřeby a toku do sítě.",
      },
    ],
    capabilitiesTitle: "Co může být součástí řešení",
    capabilities: [
      "řízení vlastní spotřeby a přetoků z FVE",
      "řízení nabíjení podle dostupného příkonu",
      "koordinace FVE, baterie, EV a spotřeby",
      "práce s dynamickými cenami a časovými pravidly",
      "integrace měření a zařízení různých výrobců",
      "monitoring, dohled a vlastní provozní logika",
    ],
    process: [
      {
        number: "01",
        title: "Provozní cíl",
        text: "Určíme, co má systém optimalizovat a jaké limity nesmí překročit.",
      },
      {
        number: "02",
        title: "Data a rozhraní",
        text: "Prověříme měření, komunikační možnosti zařízení a kvalitu dostupných dat.",
      },
      {
        number: "03",
        title: "Řídicí strategie",
        text: "Navrhneme priority, bezpečné stavy, reakce na chyby a způsob zásahu obsluhy.",
      },
      {
        number: "04",
        title: "Oživení a ladění",
        text: "Systém nasadíme, změříme jeho chování v provozu a upravíme parametry podle reality.",
      },
    ],
    fit: {
      title: "Kdy je svobol správná volba",
      text: "Nejlépe pomůžeme tam, kde nestačí zapojit jednu komponentu a projekt vyžaduje pochopit energetiku i její digitální řízení.",
      good: [
        "více technologií musí reagovat na společná data",
        "projekt má výkonové, tarifní nebo provozní limity",
        "standardní nastavení výrobce nepokrývá požadované chování",
      ],
      notFor: [
        "samostatná průmyslová automatizace mimo energetiku",
        "obecná automatizace výrobní linky",
        "běžná domovní elektroinstalace bez energetického řízení",
      ],
    },
    cta: {
      title: "Potřebujete řídit energii napříč několika technologiemi?",
      text: "Pošlete schéma, seznam zařízení nebo jen popis současného chování a cíle. Začneme technickým kontextem.",
    },
  },

  charging: {
    slug: "nabijeni-elektromobilu",
    breadcrumb: "Nabíjení elektromobilů",
    eyebrow: "AC charging · load management",
    title: "Nabíjení, které respektuje příkon i provoz objektu.",
    metaTitle: "Nabíjení elektromobilů a load management | svobol",
    metaDescription:
      "Návrh AC nabíjecí infrastruktury pro firmy, obce a provozy. Dynamický load management, více bodů a integrace s FVE a baterií.",
    lead: "Navrhujeme nabíjecí body, rozdělení výkonu a způsob provozu. Dostupnou energii využijeme podle priorit bez zbytečného přetěžování přípojky.",
    signal: ["Příkon", "Priority", "Nabíjecí body"],
    intro: {
      title: "Počet zásuvek není návrh infrastruktury.",
      text: "U více elektromobilů rozhoduje souběh, kapacita přípojky, účel nabíjení a návaznost na ostatní spotřebu. Návrh proto začíná provozním scénářem a končí řízením výkonu, ne jen volbou wallboxu.",
    },
    situations: [
      {
        title: "Více aut, omezený příkon",
        text: "Výkon se průběžně rozděluje mezi aktivní nabíjecí body a uvolňuje podle spotřeby objektu.",
      },
      {
        title: "FVE vyrábí jindy, než auta přijíždějí",
        text: "Řízení kombinuje okamžitou výrobu, baterii, požadovaný čas odjezdu a dostupný výkon ze sítě.",
      },
      {
        title: "Každá skupina má jiná pravidla",
        text: "Zaměstnanci, hosté, zákazníci i veřejnost mohou potřebovat jiný přístup, prioritu a způsob vyúčtování.",
      },
    ],
    systemTitle: "Nabíječka je součást energetiky objektu",
    systemText:
      "Regulace výkonu sleduje celý odběr. Díky tomu nemusí být každé stání dimenzované na maximální výkon ve stejnou chvíli.",
    systemItems: [
      {
        code: "SITE",
        title: "Kapacita objektu",
        text: "Hlavní jištění, běžná spotřeba, rezervy a budoucí rozšíření.",
      },
      {
        code: "EVSE",
        title: "Nabíjecí body",
        text: "Počet stání, AC výkon, umístění, jištění a datová konektivita.",
      },
      {
        code: "EMS",
        title: "Dynamické řízení",
        text: "Rozdělení dostupného výkonu podle priorit a okamžité situace.",
      },
      {
        code: "OPS",
        title: "Provoz",
        text: "Přístup uživatelů, monitoring, účtování a odpovědnost obsluhy.",
      },
    ],
    capabilitiesTitle: "Pro jaké projekty nabíjení navrhujeme",
    capabilities: [
      "firmy a provozy s vozovým parkem nebo návštěvami",
      "obce, hotely, restaurace a zákaznická parkoviště",
      "bytové objekty a sdílená parkovací stání",
      "více AC nabíjecích bodů na jedné přípojce",
      "napojení na FVE, baterii a energetický management",
      "interní, zákaznické i veřejně dostupné nabíjení",
    ],
    process: [
      {
        number: "01",
        title: "Scénář provozu",
        text: "Kolik vozidel přijíždí, jak dlouho stojí a kdo musí odjet nabitý.",
      },
      {
        number: "02",
        title: "Energetická bilance",
        text: "Změříme dostupný příkon, souběh spotřeby a případný přínos FVE nebo baterie.",
      },
      {
        number: "03",
        title: "Infrastruktura a řízení",
        text: "Navrhneme kabelové trasy, jištění, konektivitu, výkon a pravidla load managementu.",
      },
      {
        number: "04",
        title: "Instalace a provoz",
        text: "Řešení zrealizujeme, oživíme a ověříme při reálném souběhu nabíjení.",
      },
    ],
    fit: {
      title: "Kdy dává projekt smysl řešit společně",
      text: "Zapojení jednoho domácího wallboxu bývá jednoduché. Přidanou hodnotu přinášíme tam, kde je potřeba plánovat výkon, rozvoj a provoz.",
      good: [
        "více nabíjecích bodů sdílí omezenou přípojku",
        "nabíjení má využívat FVE nebo baterii",
        "projekt potřebuje přístupová a provozní pravidla",
      ],
      notFor: [
        "samostatná zásuvka bez požadavku na řízení",
        "prodej přenosné nabíječky bez návrhu instalace",
        "obecná elektroinstalace parkoviště bez EV technologie",
      ],
    },
    cta: {
      title: "Kolik aut potřebujete nabít a s jakým příkonem?",
      text: "Napište počet stání, typ provozu, hlavní jištění a zda je v objektu FVE nebo baterie. Navrhneme další technický krok.",
    },
  },

  solar: {
    slug: "fotovoltaika-baterie",
    breadcrumb: "FVE + baterie",
    eyebrow: "Fotovoltaika · bateriová úložiště",
    title: "Nejen kolik energie vyrobíte. Také co s ní systém udělá.",
    metaTitle: "Fotovoltaika a bateriová úložiště | svobol",
    metaDescription:
      "Návrh a realizace FVE a bateriových systémů s důrazem na vlastní spotřebu, přetoky, zálohu, nabíjení EV a řízení energie.",
    lead: "Návrh FVE a baterie stavíme na průběhu spotřeby, provozních cílech a požadovaném chování celého systému.",
    signal: ["Výroba", "Akumulace", "Spotřeba"],
    intro: {
      title: "Výkon panelů je jen jedna část návrhu.",
      text: "Stejně důležité je, kdy energie vzniká, kam se ukládá, které okruhy mají být zálohované a jak se bude řídit nabíjení nebo export. Teprve z těchto odpovědí vznikne smysluplná architektura.",
    },
    situations: [
      {
        title: "Spotřeba a výroba se míjejí",
        text: "Baterie a řízení posouvají využití vlastní energie do času, kdy ji provoz skutečně potřebuje.",
      },
      {
        title: "Přetok není vždy žádoucí",
        text: "Systém může omezovat export, ukládat energii nebo ji směrovat do řízené spotřeby a nabíjení.",
      },
      {
        title: "Při výpadku nemá běžet všechno",
        text: "Zálohované okruhy a požadovaná doba provozu určují výkon měniče i využitelnou kapacitu baterie.",
      },
    ],
    systemTitle: "Návrh podle chování systému",
    systemText:
      "Komponenty volíme až poté, co známe energetickou bilanci, výkonové špičky a požadované provozní scénáře.",
    systemItems: [
      {
        code: "PV",
        title: "Výroba",
        text: "Orientace, stínění, dostupná plocha a reálný profil výroby během dne a roku.",
      },
      {
        code: "BESS",
        title: "Akumulace",
        text: "Kapacita, výkon, hloubka cyklování, kompatibilita a požadovaná záloha.",
      },
      {
        code: "LOAD",
        title: "Spotřeba",
        text: "Základní odběr, špičky, regulovatelné technologie a nabíjení elektromobilů.",
      },
      {
        code: "GRID",
        title: "Síť a řízení",
        text: "Přípojka, import, export, limity distributora a společná provozní logika.",
      },
    ],
    capabilitiesTitle: "Rozsah projektu může zahrnovat",
    capabilities: [
      "návrh výkonu FVE a elektrické architektury",
      "výběr a dimenzování bateriového úložiště",
      "zálohované okruhy a chování při výpadku sítě",
      "řízení vlastní spotřeby a přetoků",
      "integraci nabíjení elektromobilů",
      "elektrotechnickou realizaci, oživení a monitoring",
    ],
    process: [
      {
        number: "01",
        title: "Data o spotřebě",
        text: "Průběh odběru je pro návrh důležitější než samotný roční součet v kWh.",
      },
      {
        number: "02",
        title: "Provozní scénáře",
        text: "Popíšeme vlastní spotřebu, přetoky, zálohu, nabíjení a budoucí rozvoj.",
      },
      {
        number: "03",
        title: "Technický návrh",
        text: "Dimenzujeme panely, měniče, baterii, jištění, měření a komunikační vrstvu.",
      },
      {
        number: "04",
        title: "Realizace a oživení",
        text: "Systém nainstalujeme, nastavíme řízení a ověříme jeho chování v jednotlivých režimech.",
      },
    ],
    fit: {
      title: "Pro projekty, kde záleží na provozním výsledku",
      text: "Neprodáváme univerzální sestavu podle velikosti střechy. Potřebujeme znát způsob využití energie a technický kontext objektu.",
      good: [
        "FVE má spolupracovat s baterií a nabíjením EV",
        "projekt řeší zálohu, exportní limity nebo výkonové špičky",
        "budoucí řízení je součástí návrhu od začátku",
      ],
      notFor: [
        "nejlevnější katalogová FVE bez technického posouzení",
        "dotační poradenství bez návrhu energetiky",
        "slib návratnosti bez dat o skutečné spotřebě",
      ],
    },
    cta: {
      title: "Navrhujete FVE a baterii pro konkrétní provoz?",
      text: "Pošlete dostupná data o spotřebě, popis objektu a očekávané scénáře. Řekneme si, co je potřeba ještě změřit nebo zjistit.",
    },
  },

  victron: {
    slug: "victron",
    breadcrumb: "Victron",
    eyebrow: "Victron Energy · návrh a integrace",
    title: "Victron jako základ systému. Ne jako izolovaná sestava.",
    metaTitle: "Victron Energy: návrh, ESS a integrace | svobol",
    metaDescription:
      "Návrh a integrace systémů Victron Energy: MultiPlus, Quattro, GX, Venus OS, MPPT, ESS, baterie, monitoring a vlastní řízení.",
    lead: "Navrhujeme systémy Victron pro akumulaci, zálohu, off-grid i řízený provoz se sítí. Řešíme zapojení, konfiguraci, monitoring a návaznost na další technologie.",
    signal: ["Měnič", "GX", "Řízení"],
    intro: {
      title: "Silná platforma potřebuje správnou architekturu.",
      text: "Victron nabízí stavebnici pro velmi rozdílné provozní scénáře. Výsledek stojí na správném dimenzování, kompatibilitě baterie, nastavení systému, měření a jasné řídicí strategii.",
    },
    situations: [
      {
        title: "Záloha i běžný síťový provoz",
        text: "Určíme, které okruhy mají zůstat v chodu, jak dlouho a jak se má baterie chovat při dostupné síti.",
      },
      {
        title: "ESS s vlastními prioritami",
        text: "Konfiguraci ESS lze rozšířit o měření a nadstavbovou logiku pro konkrétní provozní pravidla.",
      },
      {
        title: "Více zdrojů a různá rozhraní",
        text: "GX zařízení sjednotí přehled, ale celý systém musí mít správně navrženou komunikaci i bezpečné stavy.",
      },
    ],
    systemTitle: "Technologie, se kterými pracujeme",
    systemText:
      "Konkrétní sestava vychází z výkonu, typu sítě, baterie, zdrojů energie a požadovaných režimů.",
    systemItems: [
      {
        code: "VE.BUS",
        title: "MultiPlus a Quattro",
        text: "Střídače a nabíječe pro síťový, záložní i ostrovní provoz včetně vícefázových sestav.",
      },
      {
        code: "GX",
        title: "GX a Venus OS",
        text: "Komunikační a řídicí vrstva systému, lokální přehled a vzdálený monitoring.",
      },
      {
        code: "PV",
        title: "MPPT a fotovoltaika",
        text: "DC-coupled výroba, řízení nabíjení a vazba na stav baterie a spotřebu.",
      },
      {
        code: "ESS",
        title: "Baterie a ESS",
        text: "Akumulace se sítí, vlastní spotřeba, peak shaving, záloha a řízený import či export.",
      },
    ],
    capabilitiesTitle: "Od návrhu po nadstavbové řízení",
    capabilities: [
      "výkonový a energetický návrh sestavy",
      "MultiPlus, Quattro, GX zařízení a MPPT regulátory",
      "ESS, off-grid a záložní provoz",
      "integrace kompatibilního bateriového systému",
      "měření, konfigurace Venus OS a monitoring přes VRM",
      "vlastní řízení a integrace dalších energetických technologií",
    ],
    technologies: ["MultiPlus", "Quattro", "GX", "Venus OS", "MPPT", "ESS", "VRM", "VE.Bus"],
    process: [
      {
        number: "01",
        title: "Režimy systému",
        text: "Síť, záloha, ostrov, generátor, fotovoltaika a priority baterie musí mít jasná pravidla.",
      },
      {
        number: "02",
        title: "Dimenzování",
        text: "Výkon měničů, špičkové zatížení, kapacita baterie a nabíjecí výkon posuzujeme společně.",
      },
      {
        number: "03",
        title: "Konfigurace",
        text: "Nastavíme zařízení, komunikaci, ESS nebo off-grid chování a dohled přes GX.",
      },
      {
        number: "04",
        title: "Integrace",
        text: "Podle potřeby připojíme měření, FVE, nabíjení EV nebo vlastní řídicí logiku.",
      },
    ],
    fit: {
      title: "Technická expertiza bez partnerských nálepek",
      text: "Victron používáme jako technologickou platformu. Netvrdíme autorizované partnerství ani certifikaci; důvěryhodnost stavíme na konkrétním návrhu a pochopení systému.",
      good: [
        "systém kombinuje akumulaci, zálohu a síťový provoz",
        "Victron se má integrovat s FVE, EV nebo dalším měřením",
        "standardní nastavení potřebuje rozšířit o provozní logiku",
      ],
      notFor: [
        "pouhý prodej komponent bez návrhu systému",
        "autorizovaný záruční servis výrobce",
        "partnerská certifikace, kterou netvrdíme",
      ],
    },
    cta: {
      title: "Stavíte nebo rozšiřujete systém Victron?",
      text: "Pošlete jednopólové schéma, typy zařízení, baterii a popis požadovaných režimů. Zkontrolujeme architekturu a navrhneme další postup.",
    },
  },
} as const satisfies Record<string, ServicePageData>;
