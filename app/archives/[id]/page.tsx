import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchiveDetail from "@/components/archives/ArchiveDetail";
import JsonLd from "@/components/seo/JsonLd";
import { getAllArchives, getArchiveById } from "@/lib/archives/queries";
import { buildCreativeWorkJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

// 빌드 시 모든 아카이브 경로를 정적 생성하고, 그 외 id는 404 처리
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArchives().map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const archive = getArchiveById(id);

  if (!archive) notFound();

  return buildMetadata({
    title: archive.title,
    description: archive.description ?? archive.summary,
    path: `/archives/${archive.id}`,
    image: archive.image?.src,
    type: "article",
  });
}

export default async function ArchiveDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const archive = getArchiveById(id);

  if (!archive) notFound();

  return (
    <>
      <JsonLd
        data={buildCreativeWorkJsonLd({
          name: archive.title,
          description: archive.description ?? archive.summary,
          path: `/archives/${archive.id}`,
          image: archive.image?.src,
          datePublished: archive.date,
        })}
      />
      <ArchiveDetail archive={archive} />
    </>
  );
}
