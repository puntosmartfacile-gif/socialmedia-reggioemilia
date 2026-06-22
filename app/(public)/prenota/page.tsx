import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const services = [
  {
    title: "Sessione Fotografica",
    description:
      "Scatti editoriali e contenuti visuali per raccontare il tuo brand con eleganza e coerenza.",
    duration: "90 min",
    href: "/prenota/fotografia",
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="3" y="6" width="18" height="13" rx="2.5" />
        <circle cx="12" cy="12.5" r="3.5" />
        <path d="M8 6l1.2-2h5.6L16 6" />
      </svg>
    ),
  },
  {
    title: "Consulenza Strategica",
    description:
      "Un confronto dedicato per definire priorità, posizionamento e prossimi passi della tua presenza digitale.",
    duration: "60 min",
    href: "/prenota/consulenza",
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M12 3a7 7 0 0 0-7 7c0 4.8 6 10.2 6.3 10.4a1 1 0 0 0 1.4 0C13 20.2 19 14.8 19 10a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

const steps = [
  "Scegli il servizio più adatto alle tue esigenze.",
  "Seleziona una data disponibile e la fascia oraria preferita.",
  "Conferma i tuoi dati e ricevi il riepilogo della richiesta.",
];

export default function BookingSelectionPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="px-6 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.32em] text-[#B8956B]">
                Prenotazioni
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl leading-tight text-[#2C2C2C] md:text-6xl">
                Prenota un Servizio
              </h1>
              <p className="mt-6 text-base leading-8 text-[#2C2C2C]/65 md:text-lg">
                Scegli il percorso più adatto al tuo brand e prenota in pochi
                passaggi un momento dedicato con il nostro team.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="group rounded-[2rem] border border-[#2C2C2C]/8 bg-white p-8 shadow-[0_24px_80px_rgba(44,44,44,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B8956B]/30 hover:shadow-[0_28px_90px_rgba(184,149,107,0.12)] md:p-10"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B8956B]/10 text-[#B8956B]">
                    {service.icon}
                  </div>
                  <h2 className="mt-8 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#2C2C2C]/62">
                    {service.description}
                  </p>
                  <div className="mt-8 flex items-center justify-between border-t border-[#2C2C2C]/8 pt-6">
                    <span className="text-sm uppercase tracking-[0.24em] text-[#2C2C2C]/45">
                      Durata {service.duration}
                    </span>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-3 rounded-full border border-[#B8956B] px-5 py-3 text-sm font-medium text-[#B8956B] transition-colors hover:bg-[#B8956B] hover:text-white"
                    >
                      Prenota
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#2C2C2C]/6 bg-white px-6 py-16 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#B8956B]">
                Come funziona
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C] md:text-5xl">
                Un processo semplice, pensato per farti risparmiare tempo.
              </h2>
            </div>
            <div className="grid gap-5">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-5 rounded-[1.75rem] border border-[#2C2C2C]/8 bg-[#FAFAF7] p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B8956B] text-sm font-medium text-white">
                    0{index + 1}
                  </div>
                  <p className="pt-2 text-base leading-7 text-[#2C2C2C]/68">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}