import PortfolioEditorPage from "../../../components/admin/PortfolioEditorPage";
import { getAdminPortfolioItems } from "@/app/lib/supabase/queries";

export default async function NewPortfolioItemPage() {
  const { categories } = await getAdminPortfolioItems();

  return (
    <PortfolioEditorPage
      mode="new"
      title="Nuovo Caso Studio"
      description="Crea un nuovo caso studio con contenuti, risultati e galleria immagini."
      categories={categories}
      images={[]}
    />
  );
}