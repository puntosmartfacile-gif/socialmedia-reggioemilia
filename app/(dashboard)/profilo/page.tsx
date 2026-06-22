import { mockUser } from "@/app/lib/dashboard-data";

export default function ProfiloPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-[#2C2C2C]/8 bg-white p-8 shadow-[0_24px_80px_rgba(44,44,44,0.05)]">
        <p className="text-sm uppercase tracking-[0.28em] text-[#B8956B]">
          Profilo
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-[#2C2C2C]">
          I tuoi dati cliente
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#2C2C2C]/62">
          Questa sezione è pronta per ospitare i dati del profilo cliente quando
          verrà collegata la logica di autenticazione reale.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[28px] border border-[#2C2C2C]/8 bg-[#FFFEFC] p-6 shadow-[0_20px_60px_rgba(44,44,44,0.05)]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#B8956B]/15 text-2xl font-semibold text-[#B8956B]">
            {mockUser.avatarFallback}
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">
            {mockUser.name}
          </h2>
          <p className="mt-2 text-sm text-[#2C2C2C]/60">{mockUser.email}</p>
        </div>

        <div className="rounded-[28px] border border-[#2C2C2C]/8 bg-white p-6 shadow-[0_20px_60px_rgba(44,44,44,0.05)]">
          <div className="grid gap-5 sm:grid-cols-2">
            <ProfileField label="Nome completo" value={mockUser.name} />
            <ProfileField label="Email" value={mockUser.email} />
            <ProfileField label="Telefono" value="+39 333 123 4567" />
            <ProfileField label="Azienda" value="Rossi Atelier" />
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7] px-4 py-4">
      <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/45">{label}</p>
      <p className="mt-2 text-base text-[#2C2C2C]">{value}</p>
    </div>
  );
}