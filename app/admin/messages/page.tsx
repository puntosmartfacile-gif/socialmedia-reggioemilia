import AdminPageHeader from "../../components/admin/AdminPageHeader";
import StatusBadge from "../../components/admin/StatusBadge";
import { contactRequests } from "../../components/admin/adminData";

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Messaggi"
        description="Vista placeholder per richieste contatto e follow-up commerciali."
      />

      <section className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-4">
        <div className="space-y-4">
          {contactRequests.map((request) => (
            <article
              key={request.id}
              className="rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7] p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-[#2C2C2C]">
                    {request.name}
                  </h2>
                  <p className="mt-1 text-sm text-[#2C2C2C]/55">
                    {request.serviceInterest} • {request.date}
                  </p>
                </div>
                <StatusBadge status={request.status} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#2C2C2C]/62">
                {request.message}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}