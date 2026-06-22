import type { PortfolioMetric } from "@/app/data/portfolio";

interface ResultsGridProps {
  metrics: PortfolioMetric[];
}

export default function ResultsGrid({ metrics }: ResultsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-[24px] border border-[#2C2C2C]/8 bg-white/80 px-6 py-7 shadow-[0_18px_60px_rgba(44,44,44,0.05)]"
        >
          <p className="font-[family-name:var(--font-playfair)] text-4xl text-[#B8956B]">
            {metric.value}
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[#2C2C2C]/62">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}