import { Helmet } from "react-helmet-async";

/**
 * Wrap a route's element with this to force noindex on private/auth pages
 * (login, dashboard, profile, admin, partner areas) without touching the
 * page component itself. Belt-and-suspenders alongside the robots.txt
 * Disallow rules: robots.txt stops crawling, this stops indexing if a page
 * is ever linked to or reached some other way.
 */
export default function NoIndex({ children }) {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {children}
    </>
  );
}
