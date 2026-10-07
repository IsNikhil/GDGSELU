import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMeta = {
  title?: string;
  description?: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  largeImage?: boolean;
};

const defaultImage = {
  url: site.logo,
  width: 200,
  height: 200,
  alt: "GDG Southeastern logo",
};

/** Per page metadata with Open Graph and Twitter cards. */
export function pageMetadata({
  title,
  description = site.description,
  path,
  image = defaultImage,
  largeImage,
}: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images: [image],
      locale: "en_US",
    },
    twitter: {
      card: largeImage ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}

/** Renders a JSON-LD script tag. */
export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
