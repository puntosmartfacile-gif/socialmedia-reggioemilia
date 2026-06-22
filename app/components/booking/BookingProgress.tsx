"use client";

type BookingProgressProps = {
  currentStep: number;
  totalSteps: number;
  labels: string[];
};

export default function BookingProgress({
  currentStep,
  totalSteps,
  labels,
}: BookingProgressProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div key={step} className="flex flex-1 items-center gap-3">
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors",
                  isActive || isCompleted
                    ? "border-[#B8956B] bg-[#B8956B] text-white"
                    : "border-[#2C2C2C]/15 bg-white text-[#2C2C2C]/50",
                ].join(" ")}
              >
                {step}
              </div>
              {step < totalSteps ? (
                <div className="h-px flex-1 bg-[#2C2C2C]/10" />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="grid gap-2 text-xs uppercase tracking-[0.24em] text-[#2C2C2C]/55 md:grid-cols-5">
        {labels.map((label, index) => (
          <span
            key={label}
            className={index + 1 === currentStep ? "text-[#B8956B]" : undefined}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}