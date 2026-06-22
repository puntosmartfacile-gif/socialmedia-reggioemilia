import Link from "next/link";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { deletePortfolioItem } from "@/app/lib/supabase/actions";
import { getAdminPortfolioItems } from "@/app/lib/supabase/queries";

function formatDate(value: string | null) {
  if (!value) return "Bozza";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminPortfolioPage() {
  const { categories, items } = await getAdminPortfolioItems();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Portfolio"
        description="Gestisci casi studio pubblicati e bozze, con ricerca rapida, filtri e azioni massive."
        action={
          <Link
            href="/admin/portfolio/new"
            className="inline-flex rounded-xl bg-[#B8956B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#A07D5A]"
          >
            Nuovo Caso Studio
          </Link>
        }
      />

      <section className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-4">
        <div className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)_auto]">
          <select className="rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm text-[#2C2C2C] outline-none">
            <option>Tutte</option>
            {categories.map((category) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </select>
          <input
            type="search"
            placeholder="Cerca per titolo"
            className="rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm text-[#2C2C2C] outline-none placeholder:text-[#2C2C2C]/35"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-xl border border-[#2C2C2C]/10 px-3 py-2 text-sm font-medium text-[#2C2C2C]"
            >
              Pubblica selezionati
            </button>
            <button
              type="button"
              className="rounded-xl border border-[#2C2C2C]/10 px-3 py-2 text-sm font-medium text-[#2C2C2C]"
            >
              Sposta in bozza
            </button>
          </div>
        </div>

        <div className="mt-4">
          <DataTable
            rowKey={(item) => item.id}
            data={items}
            columns={[
              {
                key: "select",
                header: "",
                className: "w-12",
                render: (item) => (
                  <input
                    aria-label={`Seleziona ${item.title}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#2C2C2C]/20 accent-[#B8956B]"
                  />
                ),
              },
              {
                key: "cover",
                header: "Cover",
                render: (item) => (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="h-14 w-20 rounded-xl object-cover"
                  />
                ),
              },
              {
                key: "titolo",
                header: "Titolo",
                render: (item) => (
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-[#2C2C2C]/48">{item.slug}</p>
                  </div>
                ),
              },
              {
                key: "categoria",
                header: "Categoria",
                render: (item) => item.category,
              },
              {
                key: "stato",
                header: "Stato",
                render: (item) => <StatusBadge status={item.status} />,
              },
              {
                key: "data",
                header: "Data",
                render: (item) => formatDate(item.publishedAt ?? item.updatedAt),
              },
              {
                key: "azioni",
                header: "Azioni",
                render: (item) => (
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/portfolio/${item.id}`}
                      className="rounded-lg border border-[#2C2C2C]/10 px-3 py-1.5 text-xs font-medium text-[#2C2C2C]"
                    >
                      Modifica
                    </Link>
                    <form action={deletePortfolioItem.bind(null, item.id)}>
                      <button
                        type="submit"
                        className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-700"
                      >
                        Elimina
                      </button>
                    </form>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}