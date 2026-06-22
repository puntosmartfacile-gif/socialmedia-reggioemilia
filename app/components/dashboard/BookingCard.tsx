import { Booking } from "@/app/lib/dashboard-data";
import BookingStatusBadge from "./BookingStatusBadge";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="rounded-[28px] border border-[#2C2C2C]/8 bg-white p-6 shadow-[0_20px_60px_rgba(44,44,44,0.06)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-[#B8956B]">
            Prossimo appuntamento
          </p>
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#2C2C2C]">
              {booking.serviceName}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#2C2C2C]/65">
              {booking.date} alle {booking.time} · {booking.location}
            </p>
          </div>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="mt-6 grid gap-4 border-t border-[#2C2C2C]/8 pt-5 text-sm text-[#2C2C2C]/70 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/45">
            Referente
          </p>
          <p className="mt-1 text-base text-[#2C2C2C]">{booking.contactPerson}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/45">
            Note
          </p>
          <p className="mt-1 text-base text-[#2C2C2C]">{booking.notes}</p>
        </div>
      </div>
    </div>
  );
}