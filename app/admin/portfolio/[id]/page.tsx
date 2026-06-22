import PortfolioEditorPage from "../../../components/admin/PortfolioEditorPage";
import { getAdminPortfolioItem } from "@/app/lib/supabase/queries";

export default async function EditPortfolioItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { item, categories, images } = await getAdminPortfolioItem(id);

  return (
    <PortfolioEditorPage
      mode="edit"
      itemId={id}
      title="Modifica Caso Studio"
      description="Aggiorna contenuti, immagini e stato di pubblicazione del caso studio selezionato."
      item={item}
      categories={categories}
      images={images}
    />
  );
}