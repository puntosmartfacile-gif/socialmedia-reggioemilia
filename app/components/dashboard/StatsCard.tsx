import { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  detail: string;
}

export default function StatsCard({
  label,
  value,
  icon,
  detail,
}: StatsCardProps) {
  return (
    <div className="rounded-[24px] border border-[#2C2C2C]/8 bg-[#FFFEFC] p-5 shadow-[0_16px_40px_rgba(44,44,44,0.04)]">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-[#B8956B]/12 p-3 text-[#B8956B]">{icon}</div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/45">
          {label}
        </span>
      </div>
      <p className="mt-5 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">
        {value}
      </p>
      <p className="mt-2 text-sm text-[#2C2C2C]/60">{detail}</p>
    </div>
  );
}