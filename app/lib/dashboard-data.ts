export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: BookingStatus;
  location: string;
  contactPerson: string;
  notes: string;
}

export interface DashboardUser {
  name: string;
  email: string;
  avatarFallback: string;
}

export const mockUser: DashboardUser = {
  name: "Giulia Rossi",
  email: "giulia.rossi@email.it",
  avatarFallback: "GR",
};

export const mockBookings: Booking[] = [
  {
    id: "BK-2026-001",
    serviceName: "Consulenza Social Strategy",
    date: "18 Luglio 2026",
    time: "10:30",
    status: "confirmed",
    location: "Studio SocialMediaRE, Reggio Emilia",
    contactPerson: "Marco Ferri",
    notes: "Analisi piano editoriale e revisione campagne locali.",
  },
  {
    id: "BK-2026-002",
    serviceName: "Sessione Fotografica Brand",
    date: "02 Agosto 2026",
    time: "15:00",
    status: "pending",
    location: "Presso sede cliente",
    contactPerson: "Elena Bianchi",
    notes: "Scatti per sito, social e materiali promozionali stagionali.",
  },
  {
    id: "BK-2026-003",
    serviceName: "Audit Local SEO",
    date: "11 Giugno 2026",
    time: "09:00",
    status: "completed",
    location: "Videochiamata Google Meet",
    contactPerson: "Luca Rinaldi",
    notes: "Consegna report finale con priorità operative.",
  },
  {
    id: "BK-2026-004",
    serviceName: "Consulenza Campagne Meta Ads",
    date: "28 Maggio 2026",
    time: "14:30",
    status: "cancelled",
    location: "Online",
    contactPerson: "Sara Conti",
    notes: "Appuntamento annullato su richiesta del cliente.",
  },
];

export const upcomingBooking =
  mockBookings.find((booking) => booking.status === "confirmed") ?? mockBookings[0];