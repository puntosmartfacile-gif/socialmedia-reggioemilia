import { BookingStatus, PortfolioStatus } from "./adminData";

interface StatusBadgeProps {
  status: BookingStatus | PortfolioStatus | "new" | "read" | "replied" | "archived";
}

const statusMap: Record<
  StatusBadgeProps["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "In attesa",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  confirmed: {
    label: "Confermata",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  cancelled: {
    label: "Cancellata",
    className: "bg-rose-100 text-rose-800 border-rose-200",
  },
  completed: {
    label: "Completata",
    className: "bg-slate-200 text-slate-700 border-slate-300",
  },
  published: {
    label: "Pubblicato",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  draft: {
    label: "Bozza",
    className: "bg-stone-200 text-stone-700 border-stone-300",
  },
  new: {
    label: "Nuovo",
    className: "bg-sky-100 text-sky-800 border-sky-200",
  },
  read: {
    label: "Letto",
    className: "bg-violet-100 text-violet-800 border-violet-200",
  },
  replied: {
    label: "Risposto",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  archived: {
    label: "Archiviato",
    className: "bg-slate-200 text-slate-700 border-slate-300",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusMap[status];

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}