import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export default function FormField({
  label,
  hint,
  error = "Validazione disponibile con backend",
  children,
}: FormFieldProps) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-[#2C2C2C]">{label}</span>
        {hint ? <span className="text-xs text-[#2C2C2C]/45">{hint}</span> : null}
      </div>
      {children}
      <p className="mt-1.5 text-xs text-[#2C2C2C]/38">{error}</p>
    </label>
  );
}