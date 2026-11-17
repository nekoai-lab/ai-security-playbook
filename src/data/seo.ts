import { creator } from "./creator";
export interface Breadcrumb {
  name: string;
  path: string;
}
export interface ArticleMetadata {
  published: string;
  updated: string;
}
interface Input {
  site: URL;
  base: string;
  canonical: string;
  title: string;
  description: string;
  image: string;
  article?: ArticleMetadata;
  breadcrumbs?: Breadcrumb[];
}
export function structuredData(input: Input) {
  const {
    site,
    base,
    canonical,
    title,
    description,
    image,
    article,
    breadcrumbs = [],
  } = input;
  const home = new URL(`${base}/`, site).href;
  const person = `${new URL(`${base}/about/`, site).href}#creator`;
  const website = `${home}#website`;
  const page = `${canonical}#webpage`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": person,
      name: creator.name,
      url: person,
      sameAs: creator.links
        .filter((l) => l.label !== "お問い合わせ")
        .map((l) => l.href),
    },
    {
      "@type": "WebSite",
      "@id": website,
      name: "AI Security Playbook",
      url: home,
      description: "AIを使う人と作る人のための、日本語セキュリティ実践ガイド。",
      inLanguage: "ja",
      publisher: { "@id": person },
    },
    {
      "@type": "WebPage",
      "@id": page,
      url: canonical,
      name: title,
      description,
      inLanguage: "ja",
      isPartOf: { "@id": website },
      ...(breadcrumbs.length > 1
        ? { breadcrumb: { "@id": `${canonical}#breadcrumb` } }
        : {}),
    },
  ];
  if (article)
    graph.push({
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: title,
      description,
      mainEntityOfPage: { "@id": page },
      url: canonical,
      inLanguage: "ja",
      author: { "@id": person },
      publisher: { "@id": person },
      datePublished: article.published,
      dateModified: article.updated,
      image: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      license: new URL(`${base}/terms/`, site).href,
    });
  if (breadcrumbs.length > 1)
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: new URL(b.path, site).href,
      })),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
export const serializeStructuredData = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");
