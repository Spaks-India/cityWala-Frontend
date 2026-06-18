import { useTranslation } from "react-i18next";
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth()
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="card p-3 text-center">
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#1075be', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-user fa-2x text-white"></i>
            </div>
            <h5 className="fw-bold mb-0">{user?.name}</h5>
            <p className="text-muted" style={{ fontSize: 13 }}>{user?.email || user?.mobile}</p>
            <hr />
            <div className="d-grid gap-2">
              <Link to="/matrimonial" className="btn btn-outline-primary btn-sm">{t("browse_matrimonial")}</Link>
              <Link to="/plan" className="btn btn-outline-success btn-sm">{t("view_plans")}</Link>
              <button onClick={logout} className="btn btn-outline-danger btn-sm">{t("logout")}</button>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <h3 className="fw-bold mb-4">Welcome, {user?.name}! 👋</h3>
          <div className="row g-3 mb-4">
            {[
              { label: 'Matrimonial Profiles', val: 0, icon: 'fa-heart', color: '#1075be' },
              { label: 'Saved Profiles', val: 0, icon: 'fa-bookmark', color: '#f46f26' },
              { label: 'Messages', val: 0, icon: 'fa-envelope', color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} className="col-md-4">
                <div className="card p-3 text-center">
                  <i className={`fa-solid ${s.icon} fa-2x mb-2`} style={{ color: s.color }}></i>
                  <h4 className="fw-bold mb-0">{s.val}</h4>
                  <p className="text-muted mb-0" style={{ fontSize: 13 }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card p-4">
            <h5 className="fw-bold mb-3">{t("quick_links")}</h5>
            <div className="row g-2">
              <div className="col-6 col-md-3">
                <Link to="/matrimonial" className="btn btn-light w-100 d-flex flex-column align-items-center py-3">
                  <i className="fa-solid fa-heart fa-lg mb-2" style={{ color: '#1075be' }}></i>
                  <span style={{ fontSize: 12 }}>{t("matrimonial")}</span>
                </Link>
              </div>
              <div className="col-6 col-md-3">
                <Link to="/categories" className="btn btn-light w-100 d-flex flex-column align-items-center py-3">
                  <i className="fa-solid fa-th-large fa-lg mb-2" style={{ color: '#f46f26' }}></i>
                  <span style={{ fontSize: 12 }}>{t("categories")}</span>
                </Link>
              </div>
              <div className="col-6 col-md-3">
                <Link to="/plan" className="btn btn-light w-100 d-flex flex-column align-items-center py-3">
                  <i className="fa-solid fa-crown fa-lg mb-2" style={{ color: '#f59e0b' }}></i>
                  <span style={{ fontSize: 12 }}>{t("plans")}</span>
                </Link>
              </div>
              <div className="col-6 col-md-3">
                <Link to="/partner/register" className="btn btn-light w-100 d-flex flex-column align-items-center py-3">
                  <i className="fa-solid fa-handshake fa-lg mb-2" style={{ color: '#10b981' }}></i>
                  <span style={{ fontSize: 12 }}>{t("be_partner")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
