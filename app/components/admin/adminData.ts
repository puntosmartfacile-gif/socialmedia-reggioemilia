import type { ReactNode } from "react";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type PortfolioStatus = "published" | "draft";

export interface MetricItem {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: PortfolioStatus;
  date: string;
  clientName: string;
  description: string;
  content: string;
  cover: string;
  results: Array<{ label: string; value: string }>;
  gallery: string[];
}

export interface BookingItem {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  email: string;
  phone: string;
  notes: string;
  adminNotes: string;
}

export interface ContactRequestItem {
  id: string;
  name: string;
  serviceInterest: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
}

export interface AvailabilitySlot {
  id: string;
  day: string;
  date: string;
  start: string;
  end: string;
  service: string;
  recurring: boolean;
}

export const adminNavItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/sync", label: "Sync WP" },
  { href: "/admin/bookings", label: "Prenotazioni" },
  { href: "/admin/availability", label: "Disponibilità" },
  { href: "/admin/messages", label: "Messaggi" },
];

export const portfolioCategories = [
  "Tutte",
  "Fotografia",
  "Local SEO",
  "Social Strategy",
  "Campagne Ads",
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "case-ristorante-marco",
    title: "Ristorante Da Marco",
    slug: "ristorante-da-marco",
    category: "Fotografia",
    status: "published",
    date: "12 giu 2026",
    clientName: "Ristorante Da Marco",
    description:
      "Restyling visuale completo per menu stagionale, sala e contenuti social.",
    content:
      "Abbiamo realizzato un set fotografico completo per il nuovo menu estivo, ottimizzando anche la resa dei contenuti per Instagram e Google Business Profile.",
    cover: "https://picsum.photos/seed/admin-portfolio-1/320/220",
    results: [
      { label: "Prenotazioni", value: "+38%" },
      { label: "Copertura locale", value: "+22%" },
    ],
    gallery: [
      "https://picsum.photos/seed/admin-gallery-1/240/180",
      "https://picsum.photos/seed/admin-gallery-2/240/180",
      "https://picsum.photos/seed/admin-gallery-3/240/180",
    ],
  },
  {
    id: "case-boutique-eleganza",
    title: "Boutique Eleganza",
    slug: "boutique-eleganza",
    category: "Social Strategy",
    status: "draft",
    date: "08 giu 2026",
    clientName: "Boutique Eleganza",
    description:
      "Piano editoriale trimestrale con shooting capsule collection e reels.",
    content:
      "Il progetto unisce direzione creativa, produzione contenuti e calendario editoriale per aumentare la frequenza di pubblicazione e la qualità percepita del brand.",
    cover: "https://picsum.photos/seed/admin-portfolio-2/320/220",
    results: [
      { label: "Engagement", value: "+64%" },
      { label: "Lead DM", value: "+19%" },
    ],
    gallery: [
      "https://picsum.photos/seed/admin-gallery-4/240/180",
      "https://picsum.photos/seed/admin-gallery-5/240/180",
      "https://picsum.photos/seed/admin-gallery-6/240/180",
    ],
  },
  {
    id: "case-studio-bianchi",
    title: "Studio Dentistico Bianchi",
    slug: "studio-dentistico-bianchi",
    category: "Local SEO",
    status: "published",
    date: "02 giu 2026",
    clientName: "Studio Dentistico Bianchi",
    description:
      "Ottimizzazione scheda Google, contenuti fotografici e pagine local.",
    content:
      "Intervento focalizzato su visibilità locale, recensioni e contenuti evergreen per migliorare il posizionamento sulle ricerche geolocalizzate.",
    cover: "https://picsum.photos/seed/admin-portfolio-3/320/220",
    results: [
      { label: "Click profilo", value: "+47%" },
      { label: "Richieste indicazioni", value: "+31%" },
    ],
    gallery: [
      "https://picsum.photos/seed/admin-gallery-7/240/180",
      "https://picsum.photos/seed/admin-gallery-8/240/180",
      "https://picsum.photos/seed/admin-gallery-9/240/180",
    ],
  },
  {
    id: "case-caffe-teatro",
    title: "Caffè del Teatro",
    slug: "caffe-del-teatro",
    category: "Campagne Ads",
    status: "draft",
    date: "28 mag 2026",
    clientName: "Caffè del Teatro",
    description:
      "Campagna locale per brunch del weekend con creatività statiche e stories.",
    content:
      "Abbiamo impostato una campagna geolocalizzata con creatività dedicate al weekend e landing di prenotazione rapida.",
    cover: "https://picsum.photos/seed/admin-portfolio-4/320/220",
    results: [
      { label: "CTR", value: "4,8%" },
      { label: "Costo lead", value: "-18%" },
    ],
    gallery: [
      "https://picsum.photos/seed/admin-gallery-10/240/180",
      "https://picsum.photos/seed/admin-gallery-11/240/180",
      "https://picsum.photos/seed/admin-gallery-12/240/180",
    ],
  },
];

export const bookings: BookingItem[] = [
  {
    id: "BK-2401",
    clientName: "Giulia Ferri",
    service: "Consulenza Social",
    date: "22 giu 2026",
    time: "09:30",
    status: "pending",
    email: "giulia@atelierferri.it",
    phone: "+39 333 120 4455",
    notes: "Vorrei capire come migliorare Instagram e Google Business.",
    adminNotes: "Lead caldo, arriva da referral cliente attivo.",
  },
  {
    id: "BK-2402",
    clientName: "Marco Rinaldi",
    service: "Shooting Food",
    date: "22 giu 2026",
    time: "11:00",
    status: "confirmed",
    email: "marco@trattoriarinaldi.it",
    phone: "+39 348 555 1122",
    notes: "Nuovo menu estivo, focus su piatti signature.",
    adminNotes: "Confermare lista shot entro martedì.",
  },
  {
    id: "BK-2403",
    clientName: "Sara Belli",
    service: "Audit Local SEO",
    date: "23 giu 2026",
    time: "15:30",
    status: "completed",
    email: "sara@studiobelli.it",
    phone: "+39 340 778 9911",
    notes: "Analisi presenza locale e recensioni.",
    adminNotes: "Inviare report PDF entro venerdì.",
  },
  {
    id: "BK-2404",
    clientName: "Luca Monti",
    service: "Consulenza Ads",
    date: "24 giu 2026",
    time: "10:00",
    status: "cancelled",
    email: "luca@montiarredo.it",
    phone: "+39 392 441 2200",
    notes: "Richiesta spostamento a settimana prossima.",
    adminNotes: "Ricontattare per nuova disponibilità.",
  },
  {
    id: "BK-2405",
    clientName: "Elena Rossi",
    service: "Shooting Team",
    date: "25 giu 2026",
    time: "14:00",
    status: "confirmed",
    email: "elena@rossiassociati.it",
    phone: "+39 347 220 8899",
    notes: "Foto corporate per sito e LinkedIn.",
    adminNotes: "Portare fondale chiaro e luci continue.",
  },
  {
    id: "BK-2406",
    clientName: "Davide Neri",
    service: "Consulenza Strategica",
    date: "26 giu 2026",
    time: "16:30",
    status: "pending",
    email: "davide@nericafe.it",
    phone: "+39 351 998 7711",
    notes: "Vuole lanciare un nuovo format aperitivo.",
    adminNotes: "Preparare benchmark competitor locali.",
  },
];

export const contactRequests: ContactRequestItem[] = [
  {
    id: "MSG-101",
    name: "Francesca Guidi",
    serviceInterest: "Fotografia",
    message: "Cerco un preventivo per shooting prodotti e contenuti reels.",
    date: "22 giu 2026",
    status: "new",
  },
  {
    id: "MSG-102",
    name: "Officina 21",
    serviceInterest: "Local SEO",
    message: "Vorremmo migliorare la visibilità su Google Maps.",
    date: "21 giu 2026",
    status: "read",
  },
  {
    id: "MSG-103",
    name: "Hotel San Prospero",
    serviceInterest: "Social Strategy",
    message: "Ci serve supporto per piano editoriale estate 2026.",
    date: "20 giu 2026",
    status: "new",
  },
];

export const availabilitySlots: AvailabilitySlot[] = [
  {
    id: "slot-1",
    day: "Lun",
    date: "22 giu",
    start: "09:00",
    end: "11:00",
    service: "Consulenza",
    recurring: true,
  },
  {
    id: "slot-2",
    day: "Lun",
    date: "22 giu",
    start: "14:00",
    end: "17:00",
    service: "Shooting",
    recurring: false,
  },
  {
    id: "slot-3",
    day: "Mar",
    date: "23 giu",
    start: "10:00",
    end: "12:00",
    service: "Audit SEO",
    recurring: true,
  },
  {
    id: "slot-4",
    day: "Mer",
    date: "24 giu",
    start: "15:00",
    end: "18:00",
    service: "Shooting",
    recurring: false,
  },
  {
    id: "slot-5",
    day: "Gio",
    date: "25 giu",
    start: "09:30",
    end: "12:30",
    service: "Consulenza",
    recurring: true,
  },
  {
    id: "slot-6",
    day: "Ven",
    date: "26 giu",
    start: "13:00",
    end: "16:00",
    service: "Produzione contenuti",
    recurring: false,
  },
];