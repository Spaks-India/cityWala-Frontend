import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'
import Logo from '../assets/headerLogo.png'

import { useTranslation } from "react-i18next";
import { languages } from "../i18n/config/languages";
import GoogleTranslate from './googleTranslate'


export default function Header() {
  const { t, i18n } = useTranslation();

  // const changeLanguage = (lang) => {
  //   i18n.changeLanguage(lang);
  //   localStorage.setItem("lang", lang);
  //   document.dir = lang === "ar" ? "rtl" : "ltr";
  //   document.documentElement.lang = lang;
  // };

  // const changeLanguage = (lang) => {
  //   i18n.changeLanguage(lang);
  //   localStorage.setItem("lang", lang);

  //   const isRTL = lang === "ar";

  //   document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  //   document.documentElement.setAttribute("lang", lang);
  // };

  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  const { user, partner, logout } = useAuth();

  const currentUser = partner || user;
  const currentRole = partner ? "partner" : user ? "user" : null;

  const handleLogout = () => {
    logout();
  };

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const r = await API.get('/categories');
        const data = r.data?.categories || [];
        setAllCategories(data);
        const rootCats = data
          .filter((c) => !c.parentId)
          .filter((c) => c.status === true)
          .sort((a, b) => a.name.localeCompare(b.name));
        setCategories(rootCats);
      } catch (err) {
        console.error('Failed to fetch categories:', err.message);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const flattenCategories = (data) => {
    let result = [];
    data.forEach((item) => {
      result.push(item);
      if (item.subcategories?.length > 0) {
        result = [...result, ...flattenCategories(item.subcategories)];
      }
    });
    return result;
  };

  const allSearchData = flattenCategories(allCategories);

  const handleSearchChange = (value) => {
    setQuery(value);
    const q = value.toLowerCase();
    if (!q) {
      setFilteredResults([]);
      return;
    }
    const results = allSearchData.filter((item) =>
      item.name?.toLowerCase().includes(q)
    );
    setFilteredResults(results);
  };

  const handleItemClick = (item) => {
    setQuery(item.name);
    setFilteredResults([]);
    navigate(`/categories/${item.slug}`);
  };

  const handleSearch = () => {
    if (filteredResults.length > 0) {
      navigate(filteredResults[0].slug);
    }
  };

  const handleCategories = (cat) => {
    if (!user && !partner) {
      return navigate('/login');
    }
    navigate(`/categories/${cat.slug}`);
  }

  const getCatName = (cat) => {
    const key = cat.slug?.replace(/-/g, '_');
    return key ? t(`home.popular_cats.${key}`, { defaultValue: cat.name }) : cat.name;
  };


const [users, setUsers] = useState([])

useEffect(() => {
  API.get(`/admin/users`)
    .then((res) => {
      setUsers(res.data.users || [])
    })
    .catch((err) => {
      console.log(err)
    })
}, [])
  return (
    <>
      {/* ===== TOP HEADER ===== */}
      <div className="header-top py-2">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2">

            <ul className="top-contact mb-0">
              <li>
                <i className="fa-solid fa-phone"></i>
                +91 836 874 1739
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:citywala1959@gmail.com">
                  citywala1959@gmail.com
                </a>
              </li>
            </ul>

            {/* Language Selector */}
            {/* <div className="dropdown lang-selector">
              <button
                className="btn btn-light btn-sm dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ minWidth: "140px" }}
              >
                <i className="fa-solid fa-globe text-muted"></i>
                <span className="text-capitalize">
                  {languages.find((l) => l.code === i18n.language)?.name || "Language"}
                </span>
              </button>

              <ul
                className="dropdown-menu shadow-sm"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {languages.map((lng) => (
                  <li key={lng.code}>
                    <button
                      className={`dropdown-item d-flex align-items-center gap-2 ${i18n.language === lng.code ? "active" : ""
                        }`}
                      onClick={() => changeLanguage(lng.code)}
                    >
                      <i className="fa-solid fa-check" style={{ opacity: i18n.language === lng.code ? 1 : 0 }}></i>
                      {lng.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div> */}

            <GoogleTranslate />
          </div>
        </div>
      </div>

      {/* ===== MAIN HEADER ===== */}
       <header className="main-header sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg py-3">

            {/* Logo */}
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="CityWala" className="logo-img" />
            </Link>

            {/* Mobile Toggle */}
            <button
              className="navbar-toggler border-0 shadow-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>

              {/* Search Area */}
              <div className="header-search-area">

                {/* Category */}
                <select
                  className="form-select category-select"
                  onChange={(e) => {
                    const selected = categories.find((c) => c._id === e.target.value);
                    if (selected) handleCategories(selected);
                  }}
                >
                  <option value="">{t('header.categories')}</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>

                {/* Search */}
                <div className="search-box position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t('header.search_placeholder')}
                    value={query}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                  />

                  <button
                    className="search-btn"
                    onClick={() => {
                      const selected = categories.find(
                        (c) => c.name.toLowerCase() === query.trim().toLowerCase()
                      );
                      if (selected) handleCategories(selected);
                    }}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>

                  {/* Search Dropdown */}
                  {filteredResults.length > 0 && (
                    <div className="search-dropdown">
                      {filteredResults.map((item) => (
                        <div
                          key={item._id}
                          className="search-item"
                          onClick={() => {
                            handleItemClick(item);
                            handleCategories(item);
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
<ul className="header-actions ms-auto">

  {/* Total Users */}
  <li>
    <div className="nav-btn outline">
      Total Users: {users?.length || 0}
    </div>
  </li>

  {/* Partner Dashboard */}
  {currentRole === "partner" && (
    <li>
      <Link
        to="/partner/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-btn outline"
      >
        {t('header.dashboard')}
      </Link>
    </li>
  )}

  {/* Login/Profile */}
  {currentUser ? (
    <li>
      <div className="dropdown">
        <button
          className="nav-btn primary dropdown-toggle d-flex align-items-center gap-2"
          data-bs-toggle="dropdown"
        >
          <span className="avatar">
            {currentUser?.name?.charAt(0)?.toUpperCase()}
          </span>

          <span className="d-none d-md-inline">
            {currentUser?.name}
          </span>
        </button>

        <ul className="dropdown-menu dropdown-menu-end shadow border-0">
          <li className="px-3 py-2 border-bottom">
            <div className="fw-semibold">{currentUser?.name}</div>
            <small className="text-muted">{currentUser?.email}</small>
          </li>

          <li>
            <button
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              {t('header.logout')}
            </button>
          </li>
        </ul>
      </div>
    </li>
  ) : (
    <>
      <li>
        <Link to="/login" className="nav-btn primary" style={{ fontSize: '13px' }}>
          👤 {t('header.customer_login')}
        </Link>
      </li>
      <li>
        <Link to="/partner/login" className="nav-btn outline" style={{ fontSize: '13px' }}>
          💼 {t('header.partner_login')}
        </Link>
      </li>
    </>
  )}

  {/* Register */}
  <li>
    <Link to="/register-business" className="nav-btn success">
      {t('header.list_business')}
    </Link>
  </li>

</ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
