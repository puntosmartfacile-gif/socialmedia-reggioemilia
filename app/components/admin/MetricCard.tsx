import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  detail: string;
  icon: ReactNode;
}

export default function MetricCard({
  title,
  value,
  detail,
  icon,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-4 shadow-sm shadow-[#2C2C2C]/4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2C2C2C]/45">
            {title}
          </p>
          <p className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2C2C2C]">
            {value}
          </p>
          <p className="mt-2 text-sm text-[#2C2C2C]/58">{detail}</p>
        </div>
        <div className="rounded-xl bg-[#B8956B]/12 p-3 text-[#B8956B]">
          {icon}
        </div>
      </div>
    </div>
  );
}