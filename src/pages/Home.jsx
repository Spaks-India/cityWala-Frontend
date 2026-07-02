import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import SearchableSelect from '../components/SearchableSelect';
import { useAuth } from '../context/AuthContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Logo from '../assets/headerLogo.png'

const POPULAR_CATEGORIES = [
  { id: 1, tKey: 'matrimonial', name: 'Matrimonial', img: 'https://citywala.com/popular_photo/1768286155_matrimonial.svg', link: '/matrimonial' },
  { id: 2, tKey: 'daily_necessity', name: 'Daily Necessity', img: 'https://citywala.com/popular_photo/1768286166_daily-necessary.svg', link: '/daily-necessary' },
  { id: 3, tKey: 'education', name: 'Education', img: 'https://citywala.com/popular_photo/1768286187_education.svg', link: '#' },
  { id: 4, tKey: 'health', name: 'Health', img: 'https://citywala.com/popular_photo/1768286207_health.svg', link: '#' },
  { id: 5, tKey: 'real_estate', name: 'Real Estate', img: 'https://citywala.com/popular_photo/1768286227_Real-Estate.svg', link: '#' },
  { id: 6, tKey: 'transporters', name: 'Transporters', img: 'https://citywala.com/popular_photo/1768286241_transporters.svg', link: '#' },
  { id: 7, tKey: 'industries', name: 'Industries', img: 'https://citywala.com/popular_photo/1768289073_Industries.svg', link: '#' },
  { id: 8, tKey: 'pandit_astrologer', name: 'Pandit & Astrologer', img: 'https://citywala.com/popular_photo/1768289101_pandit-astrologer.svg', link: '#' },
  { id: 9, tKey: 'insurance', name: 'Insurance', img: 'https://citywala.com/popular_photo/1768289120_Insurance.svg', link: '#' },
  { id: 10, tKey: 'import_export', name: 'Import & Export', img: 'https://citywala.com/popular_photo/1768289132_import-export.svg', link: '#' },
  { id: 11, tKey: 'job_placement', name: 'Job Placement', img: 'https://citywala.com/popular_photo/1768289150_jobs.svg', link: '#' },
  { id: 12, tKey: 'wedding_events', name: 'Wedding & Events', img: 'https://citywala.com/popular_photo/1768289504_wedding-event.svg', link: '#' },
  { id: 13, tKey: 'agriculture', name: 'Agriculture', img: 'https://citywala.com/popular_photo/1768372714_agriculture.svg', link: '#' },
  { id: 14, tKey: 'jewellery', name: 'Jewellery', img: 'https://citywala.com/popular_photo/1768374555_jewellery.svg', link: '#' },
  { id: 15, tKey: 'it_software', name: 'IT Software', img: 'https://citywala.com/popular_photo/1768374604_it-software.svg', link: '#' },
  { id: 16, tKey: 'food', name: 'Food', img: 'https://citywala.com/popular_photo/1768374634_food.svg', link: '#' },
  { id: 17, tKey: 'tour_travels', name: 'Tour and Travels', img: 'https://citywala.com/popular_photo/1768374660_tour-travel.svg', link: '#' },
  { id: 18, tKey: 'electrical', name: 'Electrical', img: 'https://citywala.com/popular_photo/1768374685_electricians.svg', link: '#' },
  { id: 19, tKey: 'house_construction', name: 'House Construction', img: 'https://citywala.com/popular_photo/1768374963_House-Construction.svg', link: '#' },
  { id: 20, tKey: 'legal_document', name: 'Legal Document', img: 'https://citywala.com/popular_photo/1768375455_Document.svg', link: '#' },
  { id: 21, tKey: 'packers_movers', name: 'Packers & Movers', img: 'https://citywala.com/popular_photo/1768375474_packers & Movers.svg', link: '#' },
  { id: 22, tKey: 'financial_accounting', name: 'Financial & Accounting', img: 'https://citywala.com/popular_photo/1768375973_Financial-Accounting.svg', link: '#' },
  { id: 23, tKey: 'fitness_yoga', name: 'Fitness and Yoga', img: 'https://citywala.com/popular_photo/1768376102_Fitness-Yoga.svg', link: '#' },
  { id: 24, tKey: 'furniture_services', name: 'Furniture Services', img: 'https://citywala.com/popular_photo/1768384007_Furniture.svg', link: '/furniture-repair' },
]

// const TESTIMONIALS = [
//   { name: 'Dev', text: 'Amazing platform! Found exactly what I was looking for. Highly recommend CityWala to everyone.', img: 'https://citywala.com/assets/images/testimonial-1.jpg' },
//   { name: 'Esther Hills', text: 'The matrimonial service is outstanding. Very easy to use and find the right match.', img: 'https://citywala.com/assets/images/testimonial-2.jpg' },
//   { name: 'Hannah Schmitt', text: 'Great experience! The local business directory helped me find services quickly.', img: 'https://citywala.com/assets/images/testimonial-1.jpg' },
//   { name: 'Hannah Schmitt', text: 'Great experience! The local business directory helped me find services quickly.', img: 'https://citywala.com/assets/images/testimonial-1.jpg' },
// ]


export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const { user, partner } = useAuth();
  const [popularCategories, setPopularCategories] = useState([])
  const [banners, setBanners] = useState([])
  const [advertises, setAdvertises] = useState([])
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [search, setSearch] = useState({ country: '', state: '', city: '', category: '' })
  const [bannerIdx, setBannerIdx] = useState(0)
  const [adIdx, setAdIdx] = useState(0)
  const [testiIdx, setTestiIdx] = useState(0)
  const scrollRef = useRef(null)

  const TESTIMONIALS = t("testimonials", { returnObjects: true });

  const sortCategoriesByName = (cats = []) =>
    [...cats].sort((a, b) =>
      String(a?.name || '').localeCompare(String(b?.name || ''), undefined, {
        sensitivity: 'base',
      })
    );

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // useEffect(() => {
  //   API.get('/banners').then(r => setBanners(r.data)).catch(() => { })
  //   API.get('/advertise').then(r => setAdvertises(r.data)).catch(() => { })
  //   API.get('/location/countries').then(r => setCountries(r.data)).catch(() => { })
  //   // API.get('/location/categories').then(r => setPopularCategories(r.data.categories || [])).catch(() => { })
  //   // API.get('/location/categories').then(r => setPopularCategories(r.data.categories || [])).catch(() => { })
  //   API.get('/categories').then(r => setPopularCategories(r.data.categories.filter(c => !c.parentId) || [])).catch(() => { })

  //   // console.log("category data :::", popularCategories);
  //   // API.get('/categories').then(r => setCategories(r.data.categories.filter(c => !c.parentId) || [])).catch(() => { })

  //   console.log("category data :", popularCategories);

  //   // Auto-slide banners
  //   const t1 = setInterval(() => setBannerIdx(p => (p + 1) % Math.max(banners.length, 1)), 4000)
  //   const t2 = setInterval(() => setAdIdx(p => (p + 1) % Math.max(advertises.length, 1)), 5000)
  //   const t3 = setInterval(() => setTestiIdx(p => (p + 1) % TESTIMONIALS.length), 4000)
  //   return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3) }
  // }, [banners.length, advertises.length])

  useEffect(() => {
    API.get('/location/countries')
      .then(r => setCountries(r.data))
      .catch(() => { })

    API.get('/categories')
      .then(r => {
        const data = r.data.categories || [];
        const filtered = sortCategoriesByName(
          data.filter(c => !c.parentId).filter(cat => cat.status)
        );
        setPopularCategories(filtered || []);
      })
      .catch((err) => {
        console.error("CATEGORY FETCH ERROR:", err.message);
      });

    // Auto-slide testimonials
    const t3 = setInterval(
      () => setTestiIdx(p => (p + 1) % TESTIMONIALS.length),
      4000
    );

    return () => {
      clearInterval(t3);
    };

  }, [TESTIMONIALS.length]);

  // derive root categories for horizontal scroll
  const rootCategories = useMemo(
    () => popularCategories.filter((c) => !c.parentId),
    [popularCategories]
  );

  // translated fallback categories (used when API returns no data)
  const translatedFallbackCats = useMemo(
    () => sortCategoriesByName(
      POPULAR_CATEGORIES.map(cat => ({ ...cat, name: t(`home.popular_cats.${cat.tKey}`) }))
    ),
    [t]
  );

  // handleCountry
  const handleCountryChange = async (countryId) => {
    setSearch(p => ({ ...p, country: countryId, state: '', city: '' }))
    setStates([])
    setCities([])
    if (countryId) {
      try {
        const r = await API.get(`/location/states/${countryId}`)
        setStates(r.data.states || [])

      } catch (_) {
        setStates([])
      }
    }
  }

  // state chnage
  const handleStateChange = async (stateId, countryId) => {
    setSearch(p => ({ ...p, state: stateId, city: '' }))
    setCities([])

    if (stateId) {
      try {
        const r = await API.get(`/location/cities/${stateId}?country_id=${countryId}`)
        setCities(r.data.cities || [])

        console.log("city data: ", r)
      } catch (_) {
        setCities([])
      }
    }
  }


  // handlesearch
  const handleSearch = (e) => {
    e.preventDefault();

    console.log("🔍 SEARCH CLICKED - Step 1: Search button fired");
    console.log("Current search object:", search);

    if (!user && !partner) {
      console.log("❌ Not logged in, redirecting to login");
      navigate("/login");
      return;
    }

    console.log("✓ Step 2: User is logged in");
    console.log("  - search.country:", search.country);
    console.log("  - search.state:", search.state);
    console.log("  - search.city:", search.city);
    console.log("  - search.category:", search.category);

    const params = new URLSearchParams();

    if (search.country) params.append("country", search.country);
    if (search.state) params.append("state", search.state);
    if (search.city) params.append("city", search.city);

    console.log("✓ Step 3: Query string created:", params.toString());

    // selected category find karo
    const selectedCategory = (
      popularCategories.length > 0
        ? popularCategories
        : translatedFallbackCats
    ).find(
      (c) => (c._id || c.id) === search.category
    );

    console.log("✓ Step 4: Category lookup results:");
    console.log("  - selectedCategory:", selectedCategory);
    console.log("  - selectedCategory?.slug:", selectedCategory?.slug);
    console.log("  - selectedCategory?.status:", selectedCategory?.status);

    if (selectedCategory?.slug) {
      const navigateUrl = `/categories/${selectedCategory.slug}?${params.toString()}`;
      console.log("✓ Step 5: Navigating to:", navigateUrl);
      navigate(navigateUrl);

    } else {
      const navigateUrl = `/listing?${params.toString()}`;
      console.log("⚠️ Step 5: No category slug found, navigating to:", navigateUrl);
      navigate(navigateUrl);
    }
  };
  // add handleSearch

  // const handleCategory = (cat) => {
  //   const isLoggedIn = localStorage.getItem("token");

  //   if (!isLoggedIn) {
  //     navigate("/login");
  //     return;
  //   }

  //   // navigate(`/categories/${cat.slug}`);
  //   navigate(`/categories/${cat.slug}`)
  // };

  // const handleCategory = (cat) => {
  //   const isLoggedIn = localStorage.getItem("token");
  //   const isLoggedInPartner = localStorage.getItem("partnerToken");

  //   if (!isLoggedIn && !isLoggedInPartner) {
  //     navigate("/login");
  //     return;
  //   }

  //   // navigate(`/categories/${cat.slug}`);
  //   navigate(`/categories/${cat.slug}`)
  // };

  const handleCategory = async (cat) => {
    try {
      const res = await API.get("/auth/me", {
        withCredentials: true,
      });
  
      if (!res.data) {
        navigate("/login");
        return;
      }
  
      navigate(`/categories/${cat.slug}`);
    } catch (err) {
      navigate("/login");
    }
  };
  
  const scrollCats = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 200
  }

  return (
    <div>

      <section
        id="hero-section"
        className="banner-section position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#1075be 0%,#f46f26 45%,#29528c 100%)",
          padding: "90px 0 80px",
        }}
      >
        {/* Background Shapes */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        ></div>

        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">

              <span
                className="d-inline-block px-4 py-2 mb-3 rounded-pill"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  backdropFilter: "blur(8px)",
                }}
              >
                {t('home.trusted_label')}
              </span>

              <h1
                className="text-white fw-bold mb-3"
                style={{
                  fontSize: "clamp(2rem,5vw,4rem)",
                  lineHeight: "1.2",
                }}
              >
                {t('home.hero_title')} <br />
                {t('home.hero_title2')}
              </h1>

              <p
                className="text-white mx-auto mb-5"
                style={{
                  maxWidth: "700px",
                  opacity: "0.9",
                  fontSize: "18px",
                }}
              >
                {t('home.hero_subtitle')}
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="row justify-content-center">
            <div className="col-xl-11">
              <div
                className="p-4 p-lg-5 rounded-4 shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <form onSubmit={handleSearch}>
                  <div className="row g-3 align-items-center">

                    <div className="col-lg-3 col-md-6">

                      {/* countries */}
                      <div className="col-lg-12">
                        <SearchableSelect
                          options={[
                            ...countries.filter((c) => c.name === "India"),
                            ...countries.filter((c) => c.name !== "India"),
                          ]}

                          value={search.country}
                          onChange={handleCountryChange}
                          placeholder={t('home.select_country')}
                          valueKey="iso2"
                          labelKey="name"
                          className="form-select border-0 shadow-sm py-3"
                        />
                      </div>


                    </div>

                    <div className="col-lg-3 col-md-6">

                      <SearchableSelect
                        options={states}
                        placeholder={t('home.search_state')}
                        value={search.state}
                        onChange={(value) => handleStateChange(value, search.country)}
                        valueKey='_id'
                        labelKey='name'
                      />

                    </div>

                    <div className="col-lg-3 col-md-6">

                      <SearchableSelect
                        options={cities}
                        value={search.city}
                        placeholder={t('home.search_city')}
                        onChange={(value) => setSearch((p) => ({ ...p, city: value }))}
                        valueKey='_id'
                        labelKey='name'
                      />
                    </div>

                    <div className="col-lg-2 col-md-6">

                      <SearchableSelect
                        options={popularCategories.length > 0 ? popularCategories : translatedFallbackCats}
                        value={search.category}
                        placeholder={t('home.category')}
                        valueKey={popularCategories.length > 0 ? '_id' : 'id'}
                        labelKey='name'
                        onChange={(e) => setSearch((p) => ({ ...p, category: e }))}
                      />

                    </div>

                    <div className="col-lg-1 col-md-12">
                      <button
                        type="submit"
                        className="btn w-100 p-2 fw-semibold"
                        style={{
                          background: "#ffb703",
                          color: "#000",
                          borderRadius: "12px",
                        }}
                      >
                        <i className="fa-solid fa-search"></i>
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="row mt-4 g-3 text-center">
            {[
              { number: "10K+", text: t('home.businesses') },
              { number: "50+", text: t('home.cities') },
              { number: "24/7", text: t('home.support') },
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="py-3 px-3 rounded-3 h-100"

                >
                  <h3 className="fw-bold text-white mb-1">{item.number}</h3>
                  <p className="mb-0 text-white-50 small">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BANNER CAROUSEL ===== */}
      {/* {banners.length > 0 && (
        <section className="py-3">
          <div className="container">
            <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
              <img
                src={`/${banners[bannerIdx]?.image}`}
                alt={banners[bannerIdx]?.title}
                style={{ width: '100%', height: 300, objectFit: 'cover', transition: 'all 0.5s' }}
                onError={e => e.target.style.display = 'none'}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(0,0,0,0.5))', padding: 20 }}>
                <h3 className="text-white">{banners[bannerIdx]?.title}</h3>
              </div>
              <button onClick={() => setBannerIdx(p => (p - 1 + banners.length) % banners.length)}
                style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', borderRadius: '50%', width: 35, height: 35 }}>‹</button>
              <button onClick={() => setBannerIdx(p => (p + 1) % banners.length)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', borderRadius: '50%', width: 35, height: 35 }}>›</button>
            </div>
          </div>
        </section>
      )} */}

      {/* ===== POPULAR CATEGORIES ===== */}
      {/* <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="section-title mb-1">Popular Category</h2>
              <p className="section-subtitle">Find Global Experts & Services Anyone, Anywhere, Anytime.</p>
            </div>
            <Link to="/categories" className="btn btn-outline-primary btn-sm">View All</Link>
          </div>
          <div className="row g-3">
            {(popularCategories.length > 0 ? popularCategories : translatedFallbackCats).map(cat => (
              <div key={cat._id || cat.id || cat.name} className="col-lg-2 col-md-3 col-4">
                <Link to={cat.link || '#'} className="category-card">
                  <img src={cat.img || cat.image || cat.svg_path || 'https://via.placeholder.com/60'} alt={cat.name} onError={e => e.target.src = 'https://via.placeholder.com/60'} />
                  <h6>{cat.name}</h6>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="py-5 category-section">
        <div className="container">

          {/* Heading */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
            <div>
              <span className="small text-uppercase fw-semibold text-primary letter-space">
                {t('home.explore')}
              </span>
              <h2 className="section-title fw-bold mb-2">{t('home.popular_categories')}</h2>
              <p className="section-subtitle mb-0 text-muted">
                {t('home.popular_subtitle')}
              </p>
            </div>

            {/* <Link to="/categories" className="btn btn-viewall px-4 py-2">
              View All
            </Link> */}
          </div>

          {/* Categories */}
          <div className="row g-4">
            {(rootCategories.length > 0 ? rootCategories : translatedFallbackCats).map(cat => (
              <div
                key={cat._id || cat.id || cat.name}
                className="col-xl-2 col-lg-3 col-md-4 col-6"
              >
                {/* <Link to={cat.slug || '#'} className="category-card-v2 text-decoration-none"> */}
                <div onClick={() => handleCategory(cat)} className="category-card-v2 text-decoration-none cursor-pointer ">
                  <div className="icon-box">
                    <img
                      src={cat.img || cat.image || cat.svg_path || Logo}
                      alt={cat.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = Logo;
                      }
                      }
                    />

                  </div>

                  <h6 className='text-truncate'>{cat.name}</h6>
                  <span className='text-truncate'>{t('home.explore_now')}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ===== ADVERTISE CAROUSEL ===== */}
      {/* {advertises.length > 0 && (
        <div className="container pb-4">
          <div onClick={() => handleCategory(cat)} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
            <img src={`/${advertises[adIdx]?.image}`} alt={advertises[adIdx]?.advertise_name}
              style={{ width: '100%', height: 200, objectFit: 'cover' }}
              onError={e => e.target.style.display = 'none'} />
            <button onClick={() => setAdIdx(p => (p - 1 + advertises.length) % advertises.length)}
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', borderRadius: '50%', width: 30, height: 30 }}>‹</button>
            <button onClick={() => setAdIdx(p => (p + 1) % advertises.length)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', borderRadius: '50%', width: 30, height: 30 }}>›</button>
          </div>
        </div>
      )} */}

      {/* ===== FIND EXPERTS SCROLL ===== */}
      {/* <section className="py-4" style={{ background: '#fff' }}>
        <div className="container">
          <h2 className="section-title text-center mb-4">Find Experts Fast</h2>
          <div className="d-flex align-items-center gap-2">
            <button onClick={() => scrollCats(-1)} className="btn btn-outline-secondary btn-sm">‹</button>
            <div ref={scrollRef} style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollBehavior: 'smooth', padding: '8px 0' }}
              className="hide-scrollbar">
              {(popularCategories.length > 0 ? popularCategories : translatedFallbackCats).map(cat => (
                <div key={cat._id || cat.id} style={{ minWidth: 100, background: '#f8f9fa', borderRadius: 10, padding: '12px 8px', textAlign: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  <img src={cat.img || cat.image || cat.svg_path || 'https://via.placeholder.com/40'} alt={cat.name} style={{ width: 40, height: 40, objectFit: 'contain' }}
                    onError={e => e.target.style.display = 'none'} />
                  <p style={{ fontSize: 11, margin: 0, marginTop: 6, fontWeight: 600 }}>{cat.name}</p>
                </div>
              ))}
            </div>
            <button onClick={() => scrollCats(1)} className="btn btn-outline-secondary btn-sm">›</button>
          </div>
        </div>
      </section> */}
      <section className="py-4 fast-expert-section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h2 className="section-title mb-1 playwrite-no">{t('home.find_experts')}</h2>
              <p className="text-muted small mb-0">{t('home.browse_cats')}</p>
            </div>

            <div className="d-flex gap-2">
              <button onClick={() => scrollCats(-1)} className="scroll-btn">
                ‹
              </button>
              <button onClick={() => scrollCats(1)} className="scroll-btn">
                ›
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="expert-scroll hide-scrollbar"
          >
            {(popularCategories.length > 0
              ? popularCategories
              : translatedFallbackCats).map(cat => (
                <div
                  key={cat._id || cat.id || cat.name}
                  className="expert-card"
                  onClick={() => handleCategory(cat)}
                >
                  <Link to={cat.slug} className='text-decoration-none' >
                    <img
                      src={
                        cat.img ||
                        cat.image ||
                        cat.svg_path ||
                        "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                      }
                      alt={cat.name}
                      onError={e => (e.target.style.display = "none")}
                    />
                    <p>{cat.name}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ===== REPAIRS & DAILY NEEDS ===== */}
      {/* <section className="py-5">
        <div className="container">
          <div className="row g-4">
           
            <div className="col-lg-6">
              <div className="need-box">
                <h3 className="mb-3 fw-bold">🔧 Repairs & Services</h3>
                <div className="row g-2">
                  {[
                    { name: 'AC Service', img: 'https://citywala.com/assets/images/repair1.jpg' },
                    { name: 'Car Service', img: 'https://citywala.com/assets/images/repair2.jpg' },
                    { name: 'Bike Service', img: 'https://citywala.com/assets/images/repair3.jpg' },
                  ].map(item => (
                    <div key={item.name} className="col-4">
                      <div style={{ borderRadius: 8, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: 100, objectFit: 'cover' }}
                          onError={e => { e.target.src = 'https://via.placeholder.com/200x100?text=' + item.name }} />
                        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 8px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                          <p style={{ color: '#fff', margin: 0, fontSize: 11, fontWeight: 600 }}>{item.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-end">
                  <Link to="/furniture-repair" className="btn btn-sm btn-outline-primary">View All</Link>
                </div>
              </div>
            </div>

           
            <div className="col-lg-6">
              <div className="need-box">
                <h3 className="mb-3 fw-bold">🛒 Daily Needs</h3>
                <div className="row g-2">
                  {[
                    { name: 'Labour Worker', img: 'https://citywala.com/assets/images/daily-need1.jpg' },
                    { name: 'Grocery', img: 'https://citywala.com/assets/images/daily-need2.jpg' },
                    { name: 'Electricians', img: 'https://citywala.com/assets/images/daily-need3.jpg' },
                  ].map(item => (
                    <div key={item.name} className="col-4">
                      <div style={{ borderRadius: 8, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: 100, objectFit: 'cover' }}
                          onError={e => { e.target.src = 'https://via.placeholder.com/200x100?text=' + item.name }} />
                        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 8px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                          <p style={{ color: '#fff', margin: 0, fontSize: 11, fontWeight: 600 }}>{item.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-end">
                  <Link to="/daily-necessary" className="btn btn-sm btn-outline-primary">View All</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-5 service-section">
        <div className="container">
          <div className="row g-4">

            {/* Repairs & Services */}
            <div className="col-12 col-lg-6 mb-4">
              <div className="service-card-wrap h-100">

                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <div>
                    <span className="mini-label">{t('home.top_picks')}</span>
                    <h3 className="service-title">{t('home.repairs')}</h3>
                  </div>

                  <Link to="/categories/furniture-business-and-services" className="view-btn">
                    {t('home.view_all')}
                  </Link>
                </div>

                <div className="row g-3">
                  {[
                    {
                      id: 'ac',
                      name: t('home.svc_ac'),
                      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq5mkB5-h-716IXKXsWaAv2qq-o0uhtet0iKTClw3Emd0GI1EdjAJ52WA&s=10',
                      url: '/categories/furniture-business-and-services',
                    },
                    {
                      id: 'car',
                      name: t('home.svc_car'),
                      img: 'https://www.fasthelp.in/wp-content/uploads/2022/09/Home-Maintenance.jpg',
                      url: '/categories/furniture-business-and-services',
                    },
                    {
                      id: 'bike',
                      name: t('home.svc_bike'),
                      img: 'https://wandlcollision.com/wp-content/uploads/2023/02/Why-a-Dent-Needs-Immediate-Repair-North-Umberland-PA-Auto-Body-Shop.jpg',
                      url: '/categories/furniture-business-and-services',
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="col-6 col-sm-4"
                    >
                      <a href={item.url} className="service-box">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="img-fluid"
                          // onError={(e) => {
                          //   e.target.src =
                          //     "https://via.placeholder.com/200x100?text=" +
                          //     item.id;
                          // }}
                            onError={(e) => {
                            e.target.src =
                              "https://stokecoll.ac.uk/wp-content/uploads/sites/138/2021/11/BCL_1149-1280x720.jpg" +
                              item.id;
                          }}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Needs */}
            <div className="col-12 col-lg-6 mb-4">
              <div className="service-card-wrap h-100">

                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <div>
                    <span className="mini-label">{t('home.essentials')}</span>
                    <h3 className="service-title">{t('home.daily_needs')}</h3>
                  </div>

                  <Link to="/categories/daily-necessity" className="view-btn">
                    {t('home.view_all')}
                  </Link>
                </div>

                <div className="row g-3">
                  {[
                    {
                      id: 'labour',
                      name: t('home.svc_labour'),
                      img: 'https://ebclearning.com/asset-v1:EBC-Learning+labour-and-employment-laws+2023+type@asset+block@labour-and-employment-laws-tile.webp',
                      url: '/categories/daily-necessity',
                    },
                    {
                      id: 'grocery',
                      name: t('home.svc_grocery'),
                      img: 'https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/1/2015/02/21182111/210317CheeseStoresInDelhi04.jpg',
                      url: '/categories/daily-necessity/local-shops',
                    },
                    {
                      id: 'electricians',
                      name: t('home.svc_electricians'),
                      img: 'https://skilled.peopleready.com/wp-content/uploads/sites/2/2024/02/CS-2843_PR_Q1-2024-QuestionsBlogPostImages_1000x460_Electrician.png',
                      url: '/categories/daily-necessity/electrician',
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="col-6 col-sm-4"
                    >
                      <a href={item.url} className="service-box">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="img-fluid"
                          // onError={(e) => {
                          //   e.target.src =
                          //     "https://stokecoll.ac.uk/wp-content/uploads/sites/138/2021/11/BCL_1149-1280x720.jpg" +
                          //     item.id;
                          // }}
                            onError={(e) => {
                            e.target.src =
                              "https://stokecoll.ac.uk/wp-content/uploads/sites/138/2021/11/BCL_1149-1280x720.jpg" +
                              item.id;
                          }}
                        />
                      </a>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ===== TESTIMONIALS ===== */}
      {/* ===== TESTIMONIALS ===== */}
      <section
        className="py-5"
        style={{
          background:
            "linear-gradient(135deg,#1075be11,#f46f2611)",
        }}
      >
        <div className="container">

          <h2 className="section-title text-center mb-5">
            {t('home.testimonials')}
          </h2>

          <Slider {...settings}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="px-2">

                <div className="testimonial-card">

                  <i
                    className="fa-solid fa-quote-left mb-3"
                    style={{
                      color: "#1075be",
                      fontSize: 28,
                    }}
                  ></i>

                  <p className="testimonial-text">
                    {t.text}
                  </p>

                  <div className="d-flex align-items-center gap-3 mt-3">

                    <img
                      src={t.img}
                      alt={t.name}
                      className="testimonial-img"
                      onError={(e) =>
                      (e.target.src =
                        "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=")
                      }
                    />

                    <div>
                      <h6 className="mb-0 fw-bold">
                        {t.name}
                      </h6>

                      <div className="text-warning small">
                        ★★★★★
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </Slider>

        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        className="py-5"
        style={{
          background:
            "linear-gradient(135deg,#1075be,#f46f26)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9 text-center">

              <h2 className="text-white fw-bold mb-3 cta-heading">
                {t('home.cta_title')}
              </h2>

              <p className="text-white opacity-75 mb-4 cta-text">
                {t('home.cta_subtitle')}
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">

                <Link
                  to="/register-business"
                  className="btn btn-light btn-lg fw-semibold cta-btn w-100 w-sm-auto"
                >
                  <i className="fa-solid fa-handshake me-2"></i>
                  {t('home.register_partner')}
                </Link>

                <a
                  href="https://wa.me/919875677667"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-light btn-lg cta-btn w-100 w-sm-auto"
                >
                  <i className="fa-solid fa-phone me-2"></i>
                  {t('home.contact_us')}
                </a>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

