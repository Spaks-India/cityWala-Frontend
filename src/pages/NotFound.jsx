import { Link } from "react-router-dom";
import Seo from "../seo/Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
        noindex
      />
      <div className="container py-5 text-center">
        <h1 className="fw-extrabold display-5 mb-3">404</h1>
        <p className="text-muted fs-5 mb-4">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/" className="btn btn-primary rounded-pill px-4">
          Back to Home
        </Link>
      </div>
    </>
  );
}
