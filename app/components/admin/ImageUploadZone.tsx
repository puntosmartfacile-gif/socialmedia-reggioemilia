interface ImageUploadZoneProps {
  title: string;
  description: string;
}

export default function ImageUploadZone({
  title,
  description,
}: ImageUploadZoneProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#B8956B]/45 bg-[#B8956B]/6 p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#B8956B] shadow-sm">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <path d="M12 16V4" />
          <path d="M7 9l5-5 5 5" />
          <path d="M4 16.5A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 0-7h-.5A5 5 0 0 0 6.2 11" />
        </svg>
      </div>
      <p className="mt-4 text-sm font-semibold text-[#2C2C2C]">{title}</p>
      <p className="mt-1 text-sm text-[#2C2C2C]/58">{description}</p>
      <button
        type="button"
        className="mt-4 rounded-xl border border-[#2C2C2C]/10 bg-white px-4 py-2 text-sm font-medium text-[#2C2C2C] transition hover:border-[#B8956B]/40 hover:text-[#B8956B]"
      >
        Seleziona file
      </button>
    </div>
  );
}