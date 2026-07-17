import { Helmet } from "react-helmet-async";
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_LOCALE,
  TWITTER_CARD,
  buildCanonical,
} from "./config";

/**
 * Single declarative entry point for per-page <head> tags. Every routed page
 * should render this once with page-specific values; global/static tags
 * (verification, GA4, GTM, default OG) live in index.html and are overridden
 * here per-page via react-helmet-async's last-wins merge order.
 *
 * `path` must be the canonical app path (e.g. "/categories/real-estate"),
 * not a full URL — buildCanonical() prefixes the site origin.
 */
export default function Seo({
  title,
  fullTitle,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  imageAlt = `${SITE_NAME} - Business Listing Website in India`,
  type = "website",
  noindex = false,
  keywords,
  jsonLd,
  children,
}) {
  const canonical = buildCanonical(path);
  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const jsonLdList = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  // `fullTitle` is used verbatim (e.g. the homepage title, which already
  // includes "| CityWala" per the SEO spec). `title` is a short page label
  // that gets the site suffix appended here explicitly — we don't rely on
  // react-helmet-async's titleTemplate since merge order across nested
  // Helmet instances (DefaultSeo -> page Seo) makes double-suffixing easy
  // to introduce by accident.
  const resolvedTitle = fullTitle || (title ? `${title} | ${SITE_NAME}` : undefined);

  return (
    <Helmet>
      {resolvedTitle && <title>{resolvedTitle}</title>}
      {description && <meta name="description" content={description} />}
      {keywords?.length ? (
        <meta name="keywords" content={keywords.join(", ")} />
      ) : null}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      {resolvedTitle && <meta property="og:title" content={resolvedTitle} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content={DEFAULT_LOCALE} />

      {/* Twitter */}
      <meta name="twitter:card" content={TWITTER_CARD} />
      {resolvedTitle && <meta name="twitter:title" content={resolvedTitle} />}
      {description && (
        <meta name="twitter:description" content={description} />
      )}
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {jsonLdList.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {children}
    </Helmet>
  );
}
