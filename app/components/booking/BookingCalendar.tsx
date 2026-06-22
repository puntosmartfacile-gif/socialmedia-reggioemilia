"use client";

type BookingCalendarProps = {
  monthLabel: string;
  availableDates: string[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
};

const weekdays = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

export default function BookingCalendar({
  monthLabel,
  availableDates,
  selectedDate,
  onSelectDate,
}: BookingCalendarProps) {
  const availableSet = new Set(availableDates);
  const firstDate = new Date(`${availableDates[0]}T12:00:00`);
  const year = firstDate.getFullYear();
  const month = firstDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;

  const cells = Array.from({ length: startOffset + daysInMonth }, (_, index) => {
    if (index < startOffset) {
      return null;
    }

    const day = index - startOffset + 1;
    const date = new Date(year, month, day, 12);
    const isoDate = date.toISOString().split("T")[0];

    return {
      day,
      isoDate,
      isAvailable: availableSet.has(isoDate),
      isSelected: selectedDate === isoDate,
    };
  });

  return (
    <div className="rounded-[2rem] border border-[#2C2C2C]/8 bg-white p-5 shadow-[0_24px_80px_rgba(44,44,44,0.05)] md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#2C2C2C]">
          {monthLabel}
        </h3>
        <span className="text-sm text-[#2C2C2C]/55">
          Date disponibili evidenziate
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.24em] text-[#2C2C2C]/45">
        {weekdays.map((day) => (
          <span key={day} className="py-2">
            {day}
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        {cells.map((cell, index) =>
          cell ? (
            <button
              key={cell.isoDate}
              type="button"
              onClick={() => cell.isAvailable && onSelectDate(cell.isoDate)}
              disabled={!cell.isAvailable}
              className={[
                "aspect-square rounded-2xl border text-sm transition-all",
                cell.isSelected
                  ? "border-[#B8956B] bg-[#B8956B] text-white shadow-lg shadow-[#B8956B]/20"
                  : cell.isAvailable
                    ? "border-[#B8956B]/25 bg-[#B8956B]/8 text-[#2C2C2C] hover:border-[#B8956B] hover:bg-[#B8956B]/14"
                    : "border-transparent bg-[#FAFAF7] text-[#2C2C2C]/25",
              ].join(" ")}
            >
              {cell.day}
            </button>
          ) : (
            <div key={`empty-${index}`} className="aspect-square" />
          ),
        )}
      </div>
    </div>
  );
}