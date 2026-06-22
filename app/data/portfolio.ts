export type PortfolioCategory = "Tutti" | "Fotografia" | "Local SEO" | "Strategy";

export interface PortfolioMetric {
  label: string;
  value: string;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  category: Exclude<PortfolioCategory, "Tutti">;
  clientName: string;
  shortDescription: string;
  excerpt: string;
  coverImage: string;
  gallery: string[];
  results: PortfolioMetric[];
  content: string[];
}

export const portfolioCategories: PortfolioCategory[] = [
  "Tutti",
  "Fotografia",
  "Local SEO",
  "Strategy",
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "osteria-del-viandante",
    title: "Osteria del Viandante",
    category: "Fotografia",
    clientName: "Osteria del Viandante",
    shortDescription:
      "Un racconto visivo caldo e raffinato per valorizzare l’esperienza in sala e la stagionalità del menu.",
    excerpt:
      "Shooting editoriale, direzione creativa e contenuti social per un ristorante che voleva distinguersi online con immagini autentiche.",
    coverImage: "https://picsum.photos/seed/osteria-cover/1600/1000",
    gallery: [
      "https://picsum.photos/seed/osteria-1/1200/900",
      "https://picsum.photos/seed/osteria-2/1200/900",
      "https://picsum.photos/seed/osteria-3/1200/900",
      "https://picsum.photos/seed/osteria-4/1200/900",
      "https://picsum.photos/seed/osteria-5/1200/900",
    ],
    results: [
      { label: "Prenotazioni da Instagram", value: "+38%" },
      { label: "Copertura organica", value: "+124%" },
      { label: "Tempo medio sul profilo", value: "+52%" },
      { label: "Contenuti salvati", value: "3.1x" },
    ],
    content: [
      "L’obiettivo era trasformare la presenza digitale dell’osteria in un’estensione coerente dell’esperienza vissuta in sala. Abbiamo costruito un linguaggio visivo fatto di luce naturale, dettagli materici e inquadrature capaci di evocare atmosfera e qualità.",
      "Il progetto ha incluso uno shooting fotografico completo, linee guida per la pubblicazione dei contenuti e una selezione di asset pensati per feed, stories e campagne stagionali. Ogni immagine è stata progettata per raccontare il ritmo del servizio e la cura del brand.",
      "Il risultato è una comunicazione più riconoscibile, elegante e memorabile, capace di aumentare l’interesse verso il locale e migliorare la percezione del valore dell’esperienza proposta.",
    ],
  },
  {
    slug: "meraki-skincare",
    title: "Meraki Skincare",
    category: "Strategy",
    clientName: "Meraki Skincare",
    shortDescription:
      "Strategia editoriale e visual storytelling per un brand beauty essenziale, contemporaneo e premium.",
    excerpt:
      "Abbiamo definito posizionamento, rubriche e contenuti fotografici per rendere il marchio più desiderabile e coerente.",
    coverImage: "https://picsum.photos/seed/meraki-cover/1600/1000",
    gallery: [
      "https://picsum.photos/seed/meraki-1/1200/900",
      "https://picsum.photos/seed/meraki-2/1200/900",
      "https://picsum.photos/seed/meraki-3/1200/900",
      "https://picsum.photos/seed/meraki-4/1200/900",
    ],
    results: [
      { label: "Follower qualificati", value: "+180%" },
      { label: "Engagement medio", value: "4.2%" },
      { label: "CTR campagne lancio", value: "+67%" },
      { label: "Richieste prodotto", value: "+41%" },
    ],
    content: [
      "Meraki aveva bisogno di una presenza digitale più matura, capace di riflettere la qualità del prodotto e la sensibilità estetica del brand. Siamo partiti da un lavoro di strategia per definire tono di voce, pilastri editoriali e priorità di comunicazione.",
      "Successivamente abbiamo sviluppato un sistema di contenuti che unisce still life, texture, close-up e messaggi educativi. La combinazione tra direzione creativa e pianificazione ha reso il feed più armonico e immediatamente riconoscibile.",
      "La nuova identità editoriale ha migliorato la percezione premium del marchio e favorito una crescita più sana, con interazioni di qualità e maggiore interesse verso i prodotti di punta.",
    ],
  },
  {
    slug: "studio-arch-bianchi",
    title: "Studio Arch. Bianchi",
    category: "Strategy",
    clientName: "Studio Arch. Bianchi",
    shortDescription:
      "Un portfolio digitale più autorevole per raccontare progetti, metodo e visione di uno studio di architettura.",
    excerpt:
      "Abbiamo ripensato il racconto dei progetti con contenuti visuali e una strategia social più istituzionale ma coinvolgente.",
    coverImage: "https://picsum.photos/seed/bianchi-cover/1600/1000",
    gallery: [
      "https://picsum.photos/seed/bianchi-1/1200/900",
      "https://picsum.photos/seed/bianchi-2/1200/900",
      "https://picsum.photos/seed/bianchi-3/1200/900",
      "https://picsum.photos/seed/bianchi-4/1200/900",
    ],
    results: [
      { label: "Lead inbound", value: "+29%" },
      { label: "Richieste da LinkedIn", value: "+54%" },
      { label: "Tempo medio lettura case study", value: "+61%" },
      { label: "Salvataggi portfolio", value: "+88%" },
    ],
    content: [
      "Per lo studio era fondamentale comunicare rigore progettuale senza rinunciare a una presenza digitale calda e accessibile. Abbiamo costruito una narrazione che alterna dettagli architettonici, materiali e momenti di processo.",
      "Il lavoro ha coinvolto la selezione delle immagini, la definizione di caption più strategiche e la creazione di format dedicati ai progetti completati. Questo ha permesso di valorizzare sia l’estetica sia il metodo.",
      "La nuova presenza online ha reso il brand più credibile agli occhi di clienti e partner, aumentando la qualità delle richieste ricevute e la memorabilità dei contenuti pubblicati.",
    ],
  },
  {
    slug: "atelier-luce",
    title: "Atelier Luce",
    category: "Fotografia",
    clientName: "Atelier Luce",
    shortDescription:
      "Immagini luminose e sofisticate per una boutique che desiderava elevare il proprio posizionamento.",
    excerpt:
      "Uno shooting lifestyle e prodotto pensato per campagne stagionali, e-commerce e contenuti social coordinati.",
    coverImage: "https://picsum.photos/seed/atelier-cover/1600/1000",
    gallery: [
      "https://picsum.photos/seed/atelier-1/1200/900",
      "https://picsum.photos/seed/atelier-2/1200/900",
      "https://picsum.photos/seed/atelier-3/1200/900",
      "https://picsum.photos/seed/atelier-4/1200/900",
    ],
    results: [
      { label: "Visualizzazioni prodotto", value: "+73%" },
      { label: "Condivisioni stories", value: "+46%" },
      { label: "Sessioni da social", value: "+58%" },
      { label: "Tasso di ritorno utenti", value: "+22%" },
    ],
    content: [
      "Atelier Luce cercava un immaginario più coerente con il proprio target: femminile, raffinato e contemporaneo. Abbiamo progettato uno shooting con palette neutra, styling minimale e attenzione ai dettagli di tessuti e silhouette.",
      "Le immagini sono state pensate per vivere su più touchpoint: sito, newsletter, campagne e social. Questo approccio ha garantito continuità visiva e maggiore efficienza nella produzione dei contenuti.",
      "Il risultato finale è un archivio fotografico versatile che sostiene il brand nel tempo e rafforza la percezione di qualità in ogni punto di contatto digitale.",
    ],
  },
  {
    slug: "clinica-sorriso",
    title: "Clinica Sorriso",
    category: "Local SEO",
    clientName: "Clinica Sorriso",
    shortDescription:
      "Ottimizzazione locale e contenuti informativi per aumentare visibilità e fiducia nelle ricerche di zona.",
    excerpt:
      "Abbiamo lavorato su Google Business Profile, contenuti geolocalizzati e struttura delle pagine per intercettare nuove richieste.",
    coverImage: "https://picsum.photos/seed/clinica-cover/1600/1000",
    gallery: [
      "https://picsum.photos/seed/clinica-1/1200/900",
      "https://picsum.photos/seed/clinica-2/1200/900",
      "https://picsum.photos/seed/clinica-3/1200/900",
      "https://picsum.photos/seed/clinica-4/1200/900",
    ],
    results: [
      { label: "Click da Google Maps", value: "+112%" },
      { label: "Richieste di indicazioni", value: "+64%" },
      { label: "Telefonate dal profilo", value: "+49%" },
      { label: "Keyword in top 3", value: "+17" },
    ],
    content: [
      "La clinica aveva una buona reputazione offline ma una presenza locale poco strutturata. Abbiamo iniziato con un audit completo delle ricerche locali, delle schede concorrenti e delle opportunità di contenuto.",
      "Il progetto ha incluso ottimizzazione del profilo Google Business, revisione delle informazioni NAP, creazione di contenuti orientati alle intenzioni di ricerca e supporto alla raccolta di recensioni.",
      "Nel giro di pochi mesi la struttura digitale è diventata più solida, con una crescita tangibile delle interazioni locali e una maggiore capacità di intercettare utenti pronti a prenotare.",
    ],
  },
  {
    slug: "caffe-del-teatro",
    title: "Caffè del Teatro",
    category: "Local SEO",
    clientName: "Caffè del Teatro",
    shortDescription:
      "Una strategia locale pensata per aumentare passaggio in negozio e notorietà nel centro storico.",
    excerpt:
      "SEO locale, contenuti stagionali e ottimizzazione delle schede per rendere il locale più visibile nei momenti chiave.",
    coverImage: "https://picsum.photos/seed/caffe-cover/1600/1000",
    gallery: [
      "https://picsum.photos/seed/caffe-1/1200/900",
      "https://picsum.photos/seed/caffe-2/1200/900",
      "https://picsum.photos/seed/caffe-3/1200/900",
      "https://picsum.photos/seed/caffe-4/1200/900",
    ],
    results: [
      { label: "Visite al profilo", value: "+91%" },
      { label: "Richieste percorso", value: "+57%" },
      { label: "Keyword locali presidiate", value: "+23" },
      { label: "Recensioni raccolte", value: "+36%" },
    ],
    content: [
      "Per il Caffè del Teatro abbiamo costruito una presenza locale più ordinata e competitiva, capace di intercettare sia residenti sia visitatori in cerca di un luogo curato nel cuore della città.",
      "Abbiamo lavorato su contenuti stagionali, aggiornamenti del profilo locale e ottimizzazione delle pagine informative per migliorare la rilevanza nelle ricerche geolocalizzate.",
      "La combinazione tra contenuti e SEO locale ha aumentato la visibilità del locale nei momenti di maggiore intenzione, favorendo più visite e interazioni concrete.",
    ],
  },
  {
    slug: "villa-aurora-events",
    title: "Villa Aurora Events",
    category: "Fotografia",
    clientName: "Villa Aurora Events",
    shortDescription:
      "Un set di immagini editoriali per raccontare eventi, spazi e atmosfera con eleganza senza tempo.",
    excerpt:
      "Fotografia di location e dettagli per supportare wedding planner, eventi privati e collaborazioni premium.",
    coverImage: "https://picsum.photos/seed/villa-cover/1600/1000",
    gallery: [
      "https://picsum.photos/seed/villa-1/1200/900",
      "https://picsum.photos/seed/villa-2/1200/900",
      "https://picsum.photos/seed/villa-3/1200/900",
      "https://picsum.photos/seed/villa-4/1200/900",
    ],
    results: [
      { label: "Richieste eventi", value: "+44%" },
      { label: "Tempo medio in gallery", value: "+69%" },
      { label: "Condivisioni Pinterest", value: "+81%" },
      { label: "Lead qualificati", value: "+27%" },
    ],
    content: [
      "Villa Aurora desiderava un archivio fotografico capace di trasmettere atmosfera, luce e qualità degli spazi. Abbiamo costruito uno shooting editoriale che valorizza sia le viste d’insieme sia i dettagli più emozionali.",
      "Le immagini sono state progettate per supportare il sito, i social e il materiale commerciale destinato a wedding planner e partner. La coerenza visiva ha reso il brand più desiderabile e distintivo.",
      "Il nuovo racconto fotografico ha migliorato la qualità percepita della location e favorito richieste più in linea con il posizionamento premium della struttura.",
    ],
  },
  {
    slug: "bottega-verde-locale",
    title: "Bottega Verde Locale",
    category: "Strategy",
    clientName: "Bottega Verde Locale",
    shortDescription:
      "Strategia contenuti e calendario editoriale per un brand artigianale che voleva crescere con coerenza.",
    excerpt:
      "Abbiamo definito rubriche, tono di voce e contenuti visuali per trasformare la comunicazione in uno strumento di vendita.",
    coverImage: "https://picsum.photos/seed/bottega-cover/1600/1000",
    gallery: [
      "https://picsum.photos/seed/bottega-1/1200/900",
      "https://picsum.photos/seed/bottega-2/1200/900",
      "https://picsum.photos/seed/bottega-3/1200/900",
      "https://picsum.photos/seed/bottega-4/1200/900",
    ],
    results: [
      { label: "Ordini da social", value: "+33%" },
      { label: "Reach media mensile", value: "+142%" },
      { label: "Messaggi diretti", value: "+48%" },
      { label: "Tasso di risposta", value: "97%" },
    ],
    content: [
      "Bottega Verde Locale aveva bisogno di una strategia semplice ma solida, capace di raccontare il valore artigianale del brand senza disperdere energie in contenuti poco efficaci.",
      "Abbiamo costruito un piano editoriale basato su rubriche ricorrenti, storytelling di prodotto e contenuti dietro le quinte. Questo ha reso la comunicazione più costante e più utile per il pubblico.",
      "Con una direzione chiara e asset visivi coerenti, il brand ha iniziato a convertire meglio l’attenzione in conversazioni e richieste concrete.",
    ],
  },
];

export function getPortfolioItemBySlug(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}