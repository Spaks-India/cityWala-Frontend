// Central SEO config. Values mirror the GSC/GA4/GTM + metadata spec agreed for
// the site. Keep this the single source of truth — page components should
// import from here rather than hardcoding site-wide values.

export const SITE_URL = "https://www.citywala.com";
export const SITE_NAME = "CityWala";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/headerLogo-BDJ5SL8-.png`;
export const DEFAULT_LOCALE = "en_IN";
export const TWITTER_CARD = "summary_large_image";

export const DEFAULT_TITLE =
  "Business Listing Website in India | Business Directory & Online Marketplace | CityWala";

export const TITLE_TEMPLATE = "%s | CityWala";

export const DEFAULT_DESCRIPTION =
  "CityWala is a leading business listing website and online marketplace in India. Discover verified businesses, B2B companies, MSMEs, exporters, importers, wholesalers, and list your business for free.";

export const DEFAULT_KEYWORDS = [
  "Business Listing Website",
  "online marketplace in india",
  "india business listing website",
  "b2b business to business",
  "business listing sites for india",
  "wholesale websites india",
  "market in india today",
  "Business Directory India",
  "business directory website in india",
  "exporter importer directory",
  "free business listings in india",
  "India Business Directory",
  "micro small enterprises",
  "Small Business Directory",
  "exporters business directory",
];

// Google Search Console + GA4 verification/measurement identifiers.
// Prefer env vars so staging/preview deployments don't ship prod verification.
export const GSC_VERIFICATION =
  import.meta.env.VITE_GSC_VERIFICATION || "google02a48cab93c28462";
export const GA4_MEASUREMENT_ID =
  import.meta.env.VITE_GA4_MEASUREMENT_ID || "G-6G8DPV7NXZ";
export const GTM_CONTAINER_ID =
  import.meta.env.VITE_GTM_CONTAINER_ID || "GTM-TCRGF6BG";

export const buildCanonical = (path = "/") => {
  const cleanPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${cleanPath}`;
};

// Human-readable labels for category slugs, used as a fallback when the API
// category record hasn't loaded yet (keeps first-paint <title>/<h1> meaningful).
export const CATEGORY_LABELS = {
  "abroad-education--jobs": "Abroad Education & Jobs",
  agriculture: "Agriculture",
  "daily-necessity": "Daily Necessity",
  education: "Education",
  "electrical--electronics": "Electrical & Electronics",
  "financial--accounting": "Financial & Accounting",
  food: "Food",
  "furniture-business-and-services": "Furniture Business & Services",
  health: "Health",
  industries: "Industries",
  "insurance-agents--companies": "Insurance Agents & Companies",
  "it-web-developer--digital-marketing": "IT, Web Developer & Digital Marketing",
  "jewellery--clothes": "Jewellery & Clothes",
  "job-placement--vacancies": "Job Placement & Vacancies",
  "legal-document-writer": "Legal Document Writer",
  matrimonial: "Matrimonial",
  "pandit--astrologer": "Pandit & Astrologer",
  "real-estate": "Real Estate",
  "tour-and-travels": "Tour & Travels",
  transporters: "Transporters",
  "wedding-and-events": "Wedding & Events",
};

export const humanizeSlug = (slug = "") =>
  slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
