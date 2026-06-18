import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/headerLogo.png";

export default function PartnerLayout() {
  const { logout, navigate } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="d-lg-none w-100 px-3 py-2 bg-dark text-white d-flex justify-content-between align-items-center shadow-sm">

        <div className="d-flex align-items-center gap-2">
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "#1075be",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold"
            }}
          >
            P
          </div>

          <span style={{ fontWeight: 600 }}>
            {t("partner_layout.mobile_title")}
          </span>
        </div>

        <button
          className="btn btn-outline-light btn-sm"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="d-flex">

        {/* DESKTOP SIDEBAR */}
        <div
          className="d-none d-lg-block"
          style={{
            width: "260px",
            background: "linear-gradient(180deg,#0f172a,#111827)",
            color: "#fff",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            overflowY: "auto"
          }}
        >
          {sidebarContent(t, logout, navigate)}
        </div>

        {/* MOBILE OFFCANVAS */}
        <div
          className="offcanvas offcanvas-start bg-dark text-white"
          id="mobileSidebar"
          style={{ width: "250px" }}
        >
          <div className="offcanvas-header border-bottom border-secondary">
            <h5 className="mb-0">
              {t("partner_layout.menu")}
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            {sidebarContent(t, logout, navigate)}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div
          className="partner-main flex-grow-1"
          style={{
            marginLeft: "260px",
            background: "#f5f5f5",
            minHeight: "100vh",
            padding: "10px"
          }}
        >
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .partner-main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </>
  );
}

/* ---------------- SIDEBAR ---------------- */

const sidebarContent = (t, logout, navigate) => (
  <>
    <div className="text-center p-4 border-bottom border-secondary">

      <a href="/">
        <img
          src={Logo}
          alt="img"
          className="mb-2"
          style={{ maxWidth: "150px", height: "auto", objectFit: "contain" }}
        />
      </a>

      <h6 className="mb-1 fw-semibold">
        {t("partner_dashboard.sidebar.panel_title")}
      </h6>
    </div>

    <nav className="p-3 d-flex flex-column gap-2">

      <Link to="/partner/dashboard" className="text-white text-decoration-none sidebar-item">
        <i className="fa-solid fa-gauge me-2"></i>
        {t("partner_dashboard.sidebar.dashboard")}
      </Link>

      <Link to="/partner/add-profile" className="text-white text-decoration-none sidebar-item">
        <i className="fa-solid fa-user-plus me-2"></i>
        {t("partner_dashboard.sidebar.add_profile")}
      </Link>

      {/* PLANS */}
      <div className="sidebar-item">

        <a
          className="text-white text-decoration-none d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse"
          href="#plansMenu"
        >
          <span>
            <i className="fa-solid fa-crown me-2"></i>
            {t("partner_dashboard.sidebar.plans.title")}
          </span>
          <i className="fa-solid fa-chevron-down"></i>
        </a>

        <div className="collapse mt-2" id="plansMenu">

          <div className="d-flex flex-column gap-2 ms-3">

            <Link
              to="/partner/plan"
              className="text-white text-decoration-none small sidebar-subitem"
            >
              {t("partner_dashboard.sidebar.plans.all_plans")}
            </Link>

            <Link
              to="/partner/my-plan"
              className="text-white text-decoration-none small sidebar-subitem"
            >
              {t("partner_dashboard.sidebar.plans.my_plan")}
            </Link>

          </div>

        </div>

      </div>

      {/* LOGOUT */}
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="btn btn-danger mt-3 w-100"
      >
        {t("partner_dashboard.sidebar.logout")}
      </button>

    </nav>
  </>
);