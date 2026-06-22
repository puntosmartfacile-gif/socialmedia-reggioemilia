import { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#2C2C2C]/8 pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2C2C2C]">
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-[#2C2C2C]/58">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}