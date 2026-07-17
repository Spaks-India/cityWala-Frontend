import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from '../api/axios';
import { getYoutubeThumbnail, getYoutubeWatchUrl } from '../utils/youtube';
import Seo from '../seo/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { categorySchema, webPageSchema, graph } from '../seo/schema';
import { CATEGORY_LABELS, humanizeSlug } from '../seo/config';

const DESCRIPTION_WORD_LIMIT = 400;

const truncateWords = (text, limit) => {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= limit) return { truncated: text || "", isTruncated: false };
  return { truncated: words.slice(0, limit).join(" ") + "...", isTruncated: true };
};

const AllCategories = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { t } = useTranslation();

  const searchParams = new URLSearchParams(location.search);
  const country = searchParams.get("country");
  const state = searchParams.get('state');
  const city = searchParams.get('city');

  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [showListings, setShowListings] = useState(false);
  const [showMixed, setShowMixed] = useState(false);
  const [mixedCategories, setMixedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryDescExpanded, setCategoryDescExpanded] = useState(false);
  const [expandedSubDescIds, setExpandedSubDescIds] = useState(new Set());
  const { level1, level2, level3 } = useParams();

  const currentSlug = level3 || level2 || level1;

  console.log("📄 AllCategories.jsx mounted");
  console.log("  - location.pathname:", location.pathname);
  console.log("  - location.search:", location.search);
  console.log("  - currentSlug:", currentSlug);
  console.log("  - country:", country);
  console.log("  - state:", state);
  console.log("  - city:", city);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        const list = res.data?.categories || res.data || [];
        setCategories(Array.isArray(list) ? list : []);

        console.log("📋 Categories loaded:", {
          count: list.length,
          categories: list.map(c => ({ name: c.name, slug: c.slug, description: c.description, hasParent: !!c.parentId, id: c._id }))
        });

      } catch (err) {
        console.error("❌ Failed to fetch categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // When route slug changes, resolve its category id (for subcategory tree)
  useEffect(() => {
    setCategoryDescExpanded(false);
  }, [currentSlug]);

  useEffect(() => {
    if (!currentSlug || categories.length === 0) return;
    const current = categories.find((c) => String(c?.slug || "") === String(currentSlug));
    if (current) {
      setSelectedCategoryId(String(current._id));
      setSelectedCategoryName(current);
      console.log("📂 Category found:", {
        name: current.name,
        slug: current.slug,
        id: current._id,
        description: current._description,
        hasParentId: !!current.parentId
      });
    } else {
      console.warn("⚠️ No category found for slug:", currentSlug);
      console.log("Available slugs:", categories.map(c => c.slug));
    }
  }, [currentSlug, categories]);

  // category tree map for quick lookup of subcategories by parentId
  const childrenByParent = useMemo(() => {
    const m = new Map();
    for (const c of categories) {
      // parentId kabhi string hota hai, kabhi populated object ({ _id: ... })
      const pid = c?.parentId
        ? String(c.parentId?._id || c.parentId)
        : "";
      if (!m.has(pid)) m.set(pid, []);
      m.get(pid).push(c);
    }
    for (const [, arr] of m) arr.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
    return m;
  }, [categories]);

  // top-level categories when user visits /categories without slug
  const rootCategories = useMemo(() => {
    return childrenByParent.get("") || [];
  }, [childrenByParent]);

  // current subcategories to show in table (if any)
  const subCategories = useMemo(() => {
    if (!selectedCategoryId) return [];
    return childrenByParent.get(String(selectedCategoryId)) || [];
  }, [childrenByParent, selectedCategoryId]);

  // Fetch listings for current category
  useEffect(() => {
    console.log("🔄 Fetch effect triggered");
    console.log("  - currentSlug:", currentSlug);
    console.log("  - location.search:", location.search);

    if (!currentSlug) {
      console.log("  ⚠️ No currentSlug, skipping fetch");
      setData([]);
      setShowListings(false);
      setShowMixed(false);
      setMixedCategories([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      // reset UI flags for new slug to avoid stale mixed/listing state
      setShowListings(false);
      setShowMixed(false);
      setMixedCategories([]);
      try {
        // const res = await API.get(`/listing/${currentSlug}`);
        const query = new URLSearchParams();

        if (country) query.append("country", country);
        if (state) query.append("state", state);
        if (city) query.append("city", city);

        const apiUrl = `/listing/${currentSlug}?${query.toString()}`;
        console.log("📡 API call starting");
        console.log("  - URL:", apiUrl);
        console.log("  - country param:", country);
        console.log("  - state param:", state);
        console.log("  - city param:", city);

        const res = await API.get(apiUrl);

        console.log("📡 API Response received for", currentSlug);
        console.log("  - response.type:", res.data.type);
        console.log("  - response.data:", res.data);

        if (res.data.type === "listings" && Array.isArray(res.data.data)) {
          // Partners/Businesses found
          setData(res.data.data);
          setShowListings(true);
          setShowMixed(false);
          setMixedCategories([]);
          console.log("✓ Found", res.data.data.length, "partners");
        } else if (res.data.type === "categories" && Array.isArray(res.data.data)) {
          // Subcategories found - hide listings, show subcategories via childrenByParent
          setData([]);
          setShowListings(false);
          setShowMixed(false);
          setMixedCategories([]);
          console.log("ℹ This category has subcategories, showing from tree");
        } else if (res.data.type === "mixed") {
          // Both subcategories and partners found
          setData(res.data.listings || []);
          setMixedCategories(res.data.categories || []);
          setShowListings(false);
          setShowMixed(true);
          console.log("✓ Found", (res.data.listings || []).length, "partners +", (res.data.categories || []).length, "subcategories");
        } else {
          setData([]);
          setShowListings(false);
          setShowMixed(false);
          setMixedCategories([]);
          console.log("✗ No listings or subcategories found for", currentSlug);
        }
      } catch (error) {
        console.error("❌ API Error:", error);
        setData([]);
        setShowListings(false);
        setShowMixed(false);
        setMixedCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentSlug, location.search]);

  // 
  // const handleSubCategoryClick = (sub) => {
  //   navigate(`${location.pathname}/${sub.slug}`);
  // };
  const handleSubCategoryClick = (sub) => {
    navigate(`${location.pathname}/${sub.slug}${location.search}`);
  };
  // 
  // const handlePartnerClick = (partnerId) => {
  //   navigate(`/partner/details/${partnerId}`);
  // };
  const handlePartnerClick = (partnerId) => {
    navigate(`/partner/details/${partnerId}${location.search}`);
  };

  // Build the crawlable path exactly as routed (/categories/:level1/:level2/:level3)
  // so canonical/OG URLs never drop the nested segments.
  const categoryPath = ["/categories", level1, level2, level3].filter(Boolean).join("/");
  const fallbackLabel = currentSlug
    ? CATEGORY_LABELS[currentSlug] || humanizeSlug(currentSlug)
    : "All Categories";
  const displayName = selectedCategoryName?.name || fallbackLabel;
  const seoDescription =
    selectedCategoryName?.description ||
    (currentSlug
      ? `Browse verified ${displayName} businesses, service providers, and partners listed on CityWala.`
      : "Browse all business categories on CityWala — from real estate and education to health, food, and more.");

  // Breadcrumb trail follows the level1/level2/level3 slugs actually in the URL.
  const breadcrumbItems = [level1, level2, level3]
    .filter(Boolean)
    .map((slug, i, arr) => ({
      name:
        (slug === currentSlug && selectedCategoryName?.name) ||
        CATEGORY_LABELS[slug] ||
        humanizeSlug(slug),
      path: i === arr.length - 1 ? undefined : `/categories/${arr.slice(0, i + 1).join("/")}`,
    }));
  if (!currentSlug) breadcrumbItems.push({ name: "All Categories" });

  return (
    <div className="container py-5">
      <Seo
        title={displayName}
        description={seoDescription}
        path={categoryPath}
        jsonLd={graph(
          categorySchema({ path: categoryPath, name: displayName, description: seoDescription }),
          webPageSchema({ path: categoryPath, name: displayName, description: seoDescription })
        )}
      />
      {/* Breadcrumb & Title */}
      <div className="mb-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mb-4">
          {/* <!-- Chota premium top tag --> */}
          <span className="text-uppercase text-primary fw-bold tracking-wider small d-block mb-1" style={{ letterSpacing: '0.1rem', fontSize: '0.75rem' }}>{t("all_categories.browse_collection")}</span>

          {/* <!-- Main Heading --> */}
          <h1 className="fw-extrabold text-dark lh-sm" style={{ letterSpacing: '-0.03em', fontSize: '1.75rem' }}>{displayName}</h1>
          {(() => {
            const rawDesc = selectedCategoryName?.description || "";
            const { truncated, isTruncated } = truncateWords(rawDesc, DESCRIPTION_WORD_LIMIT);
            const shown = categoryDescExpanded ? rawDesc : truncated;
            return (
              <p
                className="mt-3 text-muted"
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.6",
                  maxWidth: "720px",
                  whiteSpace: "pre-line",
                }}
              >
                {shown || "No description available."}
                {isTruncated && (
                  <button
                    type="button"
                    className="btn btn-link p-0 ms-1 align-baseline"
                    style={{ fontSize: "1rem" }}
                    onClick={() => setCategoryDescExpanded((prev) => !prev)}
                  >
                    {categoryDescExpanded ? t("all_categories.read_less") : t("all_categories.read_more")}
                  </button>
                )}
              </p>
            );
          })()}

          {(() => {
            const thumb = getYoutubeThumbnail(selectedCategoryName?.youtubeUrl);
            if (!thumb) return null;
            return (
              <a
                href={getYoutubeWatchUrl(selectedCategoryName?.youtubeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="d-inline-block mt-3 position-relative"
                style={{ width: 240, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}
              >
                <img
                  src={thumb}
                  alt="Category video thumbnail"
                  style={{ width: "100%", height: 135, objectFit: "cover", display: "block" }}
                />
                <span
                  className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
                  style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,0.65)" }}
                >
                  <i className="fa-solid fa-play text-white" style={{ fontSize: 16, marginLeft: 2 }}></i>
                </span>
              </a>
            );
          })()}

        </div>
        {!currentSlug && <p className="text-muted">{t("all_categories.choose_a_category_to_view_subcategories_and_businesses")}</p>}
        {showListings && <p className="text-muted">{t("all_categories.registered_partners_in_this_category")}</p>}

      </div>

      {/* Show root categories when no slug is selected */}
      {!currentSlug && rootCategories.length > 0 ? (
        <div className="row g-3 mb-5">
          {rootCategories.map((cat) => {
            const cardThumb = getYoutubeThumbnail(cat?.youtubeUrl);
            return (
              <div key={cat._id} className="col-lg-3 col-md-4 col-sm-6">
                <div
                  className="card h-100 shadow-sm cursor-pointer hover-shadow"
                  onClick={() => navigate(`/categories/${cat.slug}${location.search}`)}
                  style={{ cursor: 'pointer', minHeight: '180px' }}
                >
                  {cardThumb && (
                    <div className="position-relative">
                      <img
                        src={cardThumb}
                        alt="Video thumbnail"
                        style={{ width: "100%", height: 110, objectFit: "cover", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                      />
                      <span
                        className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
                        style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,0.65)" }}
                      >
                        <i className="fa-solid fa-play text-white" style={{ fontSize: 12, marginLeft: 2 }}></i>
                      </span>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="card-title  fw-bold">{cat.name.charAt(0).toUpperCase() + cat.name.slice(1).toLowerCase()}</h6>
                    </div>
                    <div>
                      <span className="text-muted small">{t("all_categories.view_subcategories")}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : !currentSlug ? (
        <div className="alert alert-info" role="alert">{t("all_categories.no_categories_are_available_right_now")}</div>
      ) : null}

      {subCategories.length > 0 && (
        <div className="mb-5">

          <div className="mb-4">
            <div className="d-flex align-items-center justify-content-between p-2 rounded-3 bg-light-subtle">
              {/* Left Side: Indicator bar + Title */}
              <div className="d-flex align-items-center ps-2 border-start border-4 border-primary rounded-1">
                <h4 className="fw-extrabold text-dark mb-0 tracking-tight text-uppercase fs-5" style={{ letterSpacing: '0.03em' }}>{t("all_categories.subcategories")}</h4>
              </div>

              {/* Right Side: Optional Action Button ya Pill Counter (Dikhne me pro lagta hai) */}
              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1.5 fw-semibold small">{t("all_categories.view_all")}</span>
            </div>
          </div>

          <div className="row g-2">

            {subCategories.map((sub, i) => {
              const rawSubDesc = sub?.description || "";
              const { truncated: subTruncated, isTruncated: subIsTruncated } = truncateWords(rawSubDesc, DESCRIPTION_WORD_LIMIT);
              const isSubExpanded = expandedSubDescIds.has(sub._id);
              const shownSubDesc = isSubExpanded ? rawSubDesc : subTruncated;
              const subThumb = getYoutubeThumbnail(sub?.youtubeUrl);

              const toggleSubDesc = (e) => {
                e.stopPropagation();
                setExpandedSubDescIds((prev) => {
                  const next = new Set(prev);
                  if (next.has(sub._id)) next.delete(sub._id);
                  else next.add(sub._id);
                  return next;
                });
              };

              return (
                <div key={sub._id} className="col-12">

                  <div
                    onClick={() => handleSubCategoryClick(sub)}
                    className="p-3 border rounded-3 bg-white shadow-sm sub-item"
                    style={{ cursor: "pointer" }}
                  >

                    <div className="d-flex justify-content-between align-items-center">

                      {/* Left */}
                      <div className="d-flex align-items-center gap-3">

                        <div
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                          style={{ width: 34, height: 34, fontSize: 13 }}
                        >
                          {i + 1}
                        </div>

                        {subThumb && (
                          <a
                            href={getYoutubeWatchUrl(sub?.youtubeUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="position-relative d-inline-block flex-shrink-0"
                            style={{ width: 64, height: 40, borderRadius: 8, overflow: "hidden" }}
                          >
                            <img
                              src={subThumb}
                              alt="Video thumbnail"
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            />
                            <span
                              className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
                              style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.65)" }}
                            >
                              <i className="fa-solid fa-play text-white" style={{ fontSize: 8, marginLeft: 1 }}></i>
                            </span>
                          </a>
                        )}

                        <span className="fw-semibold">
                          {sub.name.charAt(0).toUpperCase() + sub.name.slice(1).toLowerCase()}
                        </span>

                      </div>

                      {/* Right */}
                      <i className="fa-solid fa-chevron-right text-muted"></i>

                    </div>

                    {rawSubDesc && (
                      <p className="text-muted small mb-0 mt-2 ps-1" style={{ whiteSpace: "pre-line" }}>
                        {shownSubDesc}
                        {subIsTruncated && (
                          <button
                            type="button"
                            className="btn btn-link p-0 ms-1 align-baseline small"
                            onClick={toggleSubDesc}
                          >
                            {isSubExpanded ? t("all_categories.read_less") : t("all_categories.read_more")}
                          </button>
                        )}
                      </p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      )}

      {/* Show partner listings */}
      {showListings && (
        <div className="mt-4">
          {console.log("🎯 Rendering listings section - showListings:", showListings, "data.length:", data.length)}

          <div className="mb-3">

            <div className="d-flex align-items-center justify-content-between">

              <h4 className="fw-bold mb-0 position-relative section-title">
                {t("all_categories.registered_businesses")} ({data.length})
              </h4>

            </div>

          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : data.length === 0 ? (
            <div className="alert alert-info">{t("all_categories.no_businesses_found")}</div>
          ) : (
            <div className="row g-4">

              {data.map((partner) => (
                <div key={partner._id} className="col-12 col-sm-6 col-lg-4">

                  <div
                    onClick={() => handlePartnerClick(partner._id)}
                    className="border rounded-4 p-3 h-100 bg-white shadow-sm d-flex gap-3 align-items-start"
                    style={{ cursor: "pointer" }}
                  >

                    {/* LEFT LOGO */}
                    <div>
                      {partner.company_logo ? (
                        <img
                          src={partner.company_logo}
                          alt={partner.company_name || partner.name || "Business logo"}
                          style={{
                            width: 90,
                            height: 90,
                            objectFit: "contain",
                            borderRadius: 12,
                            border: "1px solid #eee",
                            background: "#fff",
                            padding: "6px"
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 90,
                            height: 90,
                            background: "#1075be",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            fontWeight: 700,
                            fontSize: 20
                          }}
                        >
                          {partner.name?.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex-grow-1">

                      <h6 className="mb-1 fw-bold">
                        {partner.name}
                      </h6>

                      <small className="text-primary d-block mb-1">
                        {partner.company_name}
                      </small>

                      <small className="text-muted d-block mb-2">
                        {partner.company_short_desc?.slice(0, 60)}
                      </small>

                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePartnerClick(partner._id);
                        }}
                      >{t("all_categories.view_details")}</button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      )}

      {showMixed && (
        <>
          {console.log("🎯 Rendering MIXED section - showMixed:", showMixed, "listings count:", data.length, "categories count:", mixedCategories.length)}
          {/* Show subcategories first */}
          {/* <div className="mb-5">
            <h5 className="fw-bold mb-3">{t("subcategories")}</h5>
            <div className="row g-3">
              {mixedCategories.map((sub) => (
                <div key={sub._id} className="col-lg-4 col-md-6">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title fw-bold mb-3">{sub.name}</h6>
                      <div className="mt-auto">
                        <button
                          className="btn btn-outline-primary btn-sm w-100"
                          onClick={() => handleSubCategoryClick(sub)}
                        >
                          View {sub.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Show partner listings */}
          <div className="mt-5">

            <div className="mb-3">

              <div className="d-flex align-items-center justify-content-between ">

                <h5 className="fw-bold mb-0 position-relative section-title">
                  {t("all_categories.registered_businesses")} ({data.length})
                </h5>

              </div>

            </div>

            {data.length === 0 ? (
              <div className="alert alert-info" role="alert">{t("all_categories.no_registered_partners_found_in_this_category")}</div>
            ) : (
              <div className="row g-3">
                {data.map((partner) => (
                  <div key={partner._id} className="col-12 col-sm-6 col-lg-4">

                    <div
                      onClick={() => handlePartnerClick(partner._id)}
                      className="border rounded-4 p-3 h-100 bg-white shadow-sm d-flex gap-3 align-items-start"
                      style={{ cursor: "pointer" }}
                    >

                      {/* LEFT LOGO */}
                      <div>
                        {partner.company_logo ? (
                          <img
                            src={partner.company_logo}
                            alt=""
                            style={{
                              width: 90,
                              height: 90,
                              objectFit: "contain",
                              borderRadius: 12,
                              border: "1px solid #eee",
                              background: "#fff",
                              padding: "6px"
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 90,
                              height: 90,
                              background: "#1075be",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 12,
                              fontWeight: 700,
                              fontSize: 20
                            }}
                          >
                            {partner.name?.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* RIGHT CONTENT */}
                      <div className="flex-grow-1">

                        <h6 className="mb-1 fw-bold">
                          {partner.name}
                        </h6>

                        <small className="text-primary d-block mb-1">
                          {partner.company_name}
                        </small>

                        <small className="text-muted d-block mb-2">
                          {partner.company_short_desc?.slice(0, 60)}
                        </small>

                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePartnerClick(partner._id);
                          }}
                        >{t("all_categories.view_details")}</button>

                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllCategories;