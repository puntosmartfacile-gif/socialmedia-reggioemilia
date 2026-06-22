import AdminPageHeader from "@/app/components/admin/AdminPageHeader";
import WordPressSyncPanel from "@/app/components/admin/WordPressSyncPanel";
import { getWordPressSyncHistory } from "@/app/lib/wordpress-sync";

export default async function AdminSyncPage() {
  const history = await getWordPressSyncHistory(10);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Sync WordPress"
        description="Gestisci la sincronizzazione di tutti gli articoli WordPress verso la sezione Pillole e Appunti di Viaggio."
      />
      <WordPressSyncPanel history={history} />
    </div>
  );
}