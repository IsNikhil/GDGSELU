import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

const routes = [
  "/",
  "/about/",
  "/events/",
  "/liondevs/",
  "/liondevs/register/",
  "/team/",
  "/contact/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "weekly",
    priority: path === "/" || path === "/liondevs/" ? 1 : 0.7,
  }));
}
