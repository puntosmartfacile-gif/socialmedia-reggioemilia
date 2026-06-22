"use client";

type BookingSummaryProps = {
  title: string;
  items: Array<{ label: string; value: string }>;
};

export default function BookingSummary({
  title,
  items,
}: BookingSummaryProps) {
  return (
    <aside className="rounded-[2rem] border border-[#2C2C2C]/8 bg-[#FAFAF7] p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-[#B8956B]">
        Riepilogo
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl text-[#2C2C2C]">
        {title}
      </h3>
      <dl className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-4 border-b border-[#2C2C2C]/8 pb-4"
          >
            <dt className="text-sm text-[#2C2C2C]/55">{item.label}</dt>
            <dd className="max-w-[60%] text-right text-sm font-medium text-[#2C2C2C]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}