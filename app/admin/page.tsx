import Link from "next/link";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import DataTable from "../components/admin/DataTable";
import MetricCard from "../components/admin/MetricCard";
import StatusBadge from "../components/admin/StatusBadge";
import { getAdminOverviewData } from "@/app/lib/supabase/queries";

export default async function AdminOverviewPage() {
  const overview = await getAdminOverviewData();
  const today = new Date().toISOString().slice(0, 10);
  const todaysBookings = overview.recentBookings.filter((booking) => booking.date === today);
  const metrics = [
    {
      title: "Prenotazioni Oggi",
      value: String(todaysBookings.length),
      detail: "Dati live da Supabase",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      ),
    },
    {
      title: "Disponibilità Future",
      value: String(overview.upcomingAvailabilityCount),
      detail: "Slot disponibili caricati",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 19h16" />
          <path d="M7 16V9" />
          <path d="M12 16V5" />
          <path d="M17 16v-3" />
        </svg>
      ),
    },
    {
      title: "Portfolio Items",
      value: String(overview.portfolioItemsCount),
      detail: `${overview.publishedPortfolioCount} pubblicati`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z" />
          <path d="M8 11l2.5 2.5L16 8" />
        </svg>
      ),
    },
    {
      title: "Messaggi Non Letti",
      value: String(overview.unreadMessagesCount),
      detail: "Richieste contatto nuove",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 6h16v12H4z" />
          <path d="M4 8l8 6 8-6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Overview"
        description="Panoramica operativa della settimana con prenotazioni, richieste recenti e scorciatoie rapide."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            detail={metric.detail}
            icon={metric.icon}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
        <div className="space-y-4 rounded-2xl border border-[#2C2C2C]/8 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[#2C2C2C]">
                Prenotazioni recenti
              </h2>
              <p className="text-sm text-[#2C2C2C]/55">
                Ultime 5 richieste ricevute.
              </p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-sm font-medium text-[#B8956B] hover:text-[#A07D5A]"
            >
              Vedi tutte
            </Link>
          </div>

          <DataTable
            rowKey={(item) => item.id}
            data={overview.recentBookings}
            columns={[
              {
                key: "cliente",
                header: "Cliente",
                render: (item) => (
                  <div>
                    <p className="font-medium">{item.user_id}</p>
                    <p className="text-xs text-[#2C2C2C]/48">{item.id}</p>
                  </div>
                ),
              },
              {
                key: "servizio",
                header: "Servizio",
                render: (item) => item.service_type_id,
              },
              {
                key: "quando",
                header: "Quando",
                render: (item) => (
                  <div>
                    <p>{item.date}</p>
                    <p className="text-xs text-[#2C2C2C]/48">{item.start_time}</p>
                  </div>
                ),
              },
              {
                key: "stato",
                header: "Stato",
                render: (item) => <StatusBadge status={item.status} />,
              },
            ]}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-4">
            <h2 className="text-lg font-semibold text-[#2C2C2C]">
              Richieste contatto recenti
            </h2>
            <div className="mt-4 space-y-3">
              {overview.recentMessages.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{request.name}</p>
                      <p className="text-xs text-[#2C2C2C]/48">
                        {request.service_interest} • {new Date(request.created_at).toLocaleDateString("it-IT")}
                      </p>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#2C2C2C]/62">
                    {request.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-4">
            <h2 className="text-lg font-semibold text-[#2C2C2C]">
              Azioni rapide
            </h2>
            <div className="mt-4 grid gap-3">
              <Link
                href="/admin/portfolio/new"
                className="rounded-2xl bg-[#2C2C2C] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1f1f1f]"
              >
                Nuovo Caso Studio
              </Link>
              <Link
                href="/admin/availability"
                className="rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-4 py-3 text-sm font-medium text-[#2C2C2C] transition hover:border-[#B8956B]/40 hover:text-[#B8956B]"
              >
                Gestisci Disponibilità
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}