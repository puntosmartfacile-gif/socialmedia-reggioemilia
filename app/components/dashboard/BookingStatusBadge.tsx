import { BookingStatus } from "@/app/lib/dashboard-data";

const statusMap: Record<
  BookingStatus,
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
    label: "Annullata",
    className: "bg-rose-100 text-rose-800 border-rose-200",
  },
  completed: {
    label: "Completata",
    className: "bg-stone-200 text-stone-700 border-stone-300",
  },
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export default function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {
  const config = statusMap[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}