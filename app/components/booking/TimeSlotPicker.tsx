"use client";

type TimeSlotPickerProps = {
  slots: string[];
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
};

export default function TimeSlotPicker({
  slots,
  selectedSlot,
  onSelectSlot,
}: TimeSlotPickerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {slots.map((slot) => {
        const isSelected = selectedSlot === slot;

        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelectSlot(slot)}
            className={[
              "rounded-2xl border px-5 py-4 text-left transition-all",
              isSelected
                ? "border-[#B8956B] bg-[#B8956B] text-white shadow-lg shadow-[#B8956B]/20"
                : "border-[#2C2C2C]/10 bg-white text-[#2C2C2C] hover:border-[#B8956B]/40 hover:bg-[#B8956B]/6",
            ].join(" ")}
          >
            <span className="block text-sm uppercase tracking-[0.24em] opacity-70">
              Fascia oraria
            </span>
            <span className="mt-2 block text-lg font-medium">{slot}</span>
          </button>
        );
      })}
    </div>
  );
}