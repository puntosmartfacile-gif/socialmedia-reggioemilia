"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminPageHeader from "./AdminPageHeader";
import FormField from "./FormField";
import ImageUploadZone from "./ImageUploadZone";
import { savePortfolioItem, type PortfolioFormState } from "@/app/lib/supabase/actions";
import type { CategoryRow, PortfolioImageRow, PortfolioItemRow } from "@/app/types/database";

interface PortfolioEditorPageProps {
  mode: "new" | "edit";
  itemId?: string;
  title: string;
  description: string;
  item?: PortfolioItemRow | null;
  categories: CategoryRow[];
  images: PortfolioImageRow[];
}

const initialState: PortfolioFormState = {
  success: false,
  message: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseResults(results: PortfolioItemRow["results"]) {
  if (!Array.isArray(results)) return JSON.stringify([], null, 2);
  return JSON.stringify(results, null, 2);
}

export default function PortfolioEditorPage({
  mode,
  itemId,
  title,
  description,
  item,
  categories,
  images,
}: PortfolioEditorPageProps) {
  const [state, formAction, pending] = useActionState(savePortfolioItem, initialState);
  const [titleValue, setTitleValue] = useState(item?.title ?? "");
  const [slugValue, setSlugValue] = useState(item?.slug ?? "");
  const [isPublished, setIsPublished] = useState(item?.is_published ?? false);
  const [galleryUrls, setGalleryUrls] = useState(
    images.map((image) => image.image_url).join("\n"),
  );

  useEffect(() => {
    if (mode === "new") {
      setSlugValue(slugify(titleValue));
    }
  }, [mode, titleValue]);

  const fallbackCategory = useMemo(
    () => item?.category_id ?? categories[0]?.id ?? "",
    [categories, item?.category_id],
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={title}
        description={description}
        action={
          <div className="flex gap-2">
            <Link
              href="/admin/portfolio"
              className="rounded-xl border border-[#2C2C2C]/10 bg-white px-4 py-2.5 text-sm font-medium text-[#2C2C2C]"
            >
              Torna alla lista
            </Link>
            <button
              type="submit"
              form="portfolio-editor-form"
              disabled={pending}
              className="rounded-xl bg-[#B8956B] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {pending ? "Salvataggio..." : "Salva"}
            </button>
          </div>
        }
      />

      <form
        id="portfolio-editor-form"
        action={formAction}
        className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]"
      >
        <input type="hidden" name="itemId" value={itemId ?? ""} />
        <input type="hidden" name="isPublished" value={String(isPublished)} />

        <section className="space-y-5 rounded-2xl border border-[#2C2C2C]/8 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Titolo">
              <input
                name="title"
                value={titleValue}
                onChange={(event) => setTitleValue(event.target.value)}
                className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
              />
            </FormField>
            <FormField label="Slug" hint="Auto-generato dal titolo, modificabile">
              <input
                name="slug"
                value={slugValue}
                onChange={(event) => setSlugValue(event.target.value)}
                className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
              />
            </FormField>
          </div>

          <FormField label="Descrizione">
            <textarea
              name="description"
              defaultValue={item?.description ?? ""}
              rows={4}
              className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
            />
          </FormField>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Categoria">
              <select
                name="categoryId"
                defaultValue={fallbackCategory}
                className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Cliente">
              <input
                name="clientName"
                defaultValue={item?.client_name ?? ""}
                className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
              />
            </FormField>
          </div>

          <FormField label="Contenuto">
            <textarea
              name="content"
              defaultValue={item?.content ?? ""}
              rows={12}
              className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
            />
          </FormField>

          <FormField label="Risultati JSON" hint='Formato: [{"label":"Lead","value":"+20%"}]'>
            <textarea
              name="resultsJson"
              defaultValue={parseResults(item?.results ?? [])}
              rows={10}
              className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 font-mono text-sm outline-none"
            />
          </FormField>

          <FormField label="URL galleria esistenti" hint="Una URL per riga">
            <textarea
              name="existingGalleryUrls"
              value={galleryUrls}
              onChange={(event) => setGalleryUrls(event.target.value)}
              rows={6}
              className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
            />
          </FormField>

          {state.message ? (
            <p className={`text-sm ${state.success ? "text-emerald-700" : "text-rose-700"}`}>
              {state.message}
            </p>
          ) : null}
        </section>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-5">
            <h2 className="text-base font-semibold text-[#2C2C2C]">Stato pubblicazione</h2>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7] px-4 py-3">
              <div>
                <p className="text-sm font-medium text-[#2C2C2C]">
                  {isPublished ? "Pubblicato" : "Bozza"}
                </p>
                <p className="text-xs text-[#2C2C2C]/48">Attiva per pubblicare subito.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublished((current) => !current)}
                className={`relative h-7 w-13 rounded-full transition ${
                  isPublished ? "bg-[#B8956B]" : "bg-[#2C2C2C]/18"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    isPublished ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-5">
            <h2 className="text-base font-semibold text-[#2C2C2C]">Cover image</h2>
            <input type="hidden" name="existingCoverImageUrl" value={item?.cover_image_url ?? ""} />
            {item?.cover_image_url ? (
              <img
                src={item.cover_image_url}
                alt={item.title}
                className="mt-4 h-40 w-full rounded-2xl object-cover"
              />
            ) : null}
            <div className="mt-4">
              <ImageUploadZone
                title="Carica immagine copertina"
                description="L'immagine verrà salvata nel bucket portfolio."
              />
              <input
                name="coverImage"
                type="file"
                accept="image/*"
                className="mt-4 block w-full text-sm text-[#2C2C2C]"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-[#2C2C2C]">Galleria immagini</h2>
                <p className="text-sm text-[#2C2C2C]/55">Aggiungi nuove immagini opzionali.</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7] p-2"
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text ?? `Gallery ${index + 1}`}
                    className="h-24 w-full rounded-xl object-cover"
                  />
                </div>
              ))}
            </div>
            <input
              name="galleryImages"
              type="file"
              accept="image/*"
              multiple
              className="mt-4 block w-full text-sm text-[#2C2C2C]"
            />
          </section>
        </aside>
      </form>
    </div>
  );
}