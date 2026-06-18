import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function PartnerDetails() {
  const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                setLoading(true);
                const res = await API.get(`/partner/${id}`);
                setPartner(res.data.partner);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load partner details');
                setPartner(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPartner();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">{t("loading")}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <h5>{t("error")}</h5>
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={() => navigate(-1)}>{t("go_back")}</button>
                </div>
            </div>
        );
    }

    if (!partner) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning" role="alert">
                    <p>{t("partner_information_not_available")}</p>
                    <button className="btn btn-primary" onClick={() => navigate(-1)}>{t("go_back")}</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4 py-md-5">
            {/* Top Navigation & Back Button */}
            <div className="mb-4">
                <button
                    className="btn btn-light border-light-subtle btn-sm rounded-pill px-3 shadow-sm text-secondary d-flex align-items-center gap-2 fw-medium"
                    onClick={() => navigate(-1)}
                >
                    <i className="fa-solid fa-arrow-left fs-7"></i>{t("go_back")}</button>
            </div>

            {/* Profile Hero Header Card */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                {/* Decorative Modern Top Banner (Background Cover) */}
                <div className="bg-gradient bg-primary position-relative" style={{ height: '160px', opacity: 0.95 }}>
                    <div className="position-absolute top-0 end-0 p-3">
                        <span className={`badge px-3 py-2 rounded-pill shadow-sm bg-${partner.status === 'approved' ? 'success' : partner.status === 'pending' ? 'warning' : partner.status === 'rejected' ? 'danger' : 'secondary'
                            }`}>
                            <span className="text-uppercase tracking-wider fw-bold" style={{ fontSize: '0.7rem' }}>
                                {partner.status || 'Pending'}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Profile Details Content */}
                <div className="card-body px-4 pb-4 pt-0 position-relative">
                    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-end text-center text-md-start gap-4" style={{ marginTop: '-70px' }}>

                        {/* Logo Frame with Flawless Image Logic & Fallback */}
                        <div className="bg-white p-2 rounded-4 shadow-sm border border-light-subtle d-flex align-items-center justify-content-center overflow-hidden"
                            style={{ width: '140px', height: '140px', zIndex: 2 }}>
                            <img
                                src={partner.company_logo || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop"} // Default premium office building placeholder if URL is null
                                alt={partner.company_name || "Company Logo"}
                                className="w-100 h-100 object-fit-cover rounded-3"
                                onError={(e) => {
                                    // Agar image url crash ho jaye toh live fallback load hoga
                                    e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop";
                                }}
                            />
                        </div>

                        {/* Main Titles */}
                        <div className="flex-grow-1 mt-2 mt-md-0">
                            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 flex-wrap mb-1">
                                <h2 className="fw-extrabold text-dark mb-0 fs-3">{partner.company_name || partner.name}</h2>
                                <span className="badge bg-info-subtle text-info rounded-pill px-2.5 py-1 fw-bold text-capitalize" style={{ fontSize: '0.75rem' }}>
                                    {partner.plan || '-'} Plan
                                </span>
                            </div>
                            <p className="text-muted mb-0 fs-6 fw-medium">{partner.company_short_desc || "Verified Corporate Partner"}</p>
                        </div>

                        {/* Quick Actions (Call / Email) */}
                        <div className="d-flex gap-2 w-100 w-md-auto mt-3 mt-md-0 justify-content-center">
                            <a href={`tel:${partner.mobile}`} className="btn btn-primary rounded-3 px-4 py-2.5 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 flex-grow-1 flex-md-grow-0">
                                <i className="fa-solid fa-phone"></i>{t("call_partner")}</a>
                            <a href={`mailto:${partner.email}`} className="btn btn-outline-primary rounded-3 px-4 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 flex-grow-1 flex-md-grow-0">
                                <i className="fa-solid fa-envelope"></i>{t("email")}</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid: Details & Overview */}
            <div className="row g-4">
                {/* Left Side Info Panel */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
                        <h5 className="fw-extrabold text-dark mb-3 ps-2 border-start border-3 border-primary fs-6 text-uppercase tracking-wider">{t("contact_details")}</h5>

                        <div className="list-group list-group-flush">
                            {/* Contact Person */}
                            <div className="list-group-item border-0 px-2 py-2.5">
                                <small className="text-muted d-block fw-semibold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>{t("contact_person")}</small>
                                <span className="text-dark fw-bold fs-7"><i className="fa-solid fa-user text-secondary me-2"></i>{partner.name || "—"}</span>
                            </div>

                            {/* Email */}
                            <div className="list-group-item border-0 px-2 py-2.5">
                                <small className="text-muted d-block fw-semibold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>{t("official_email")}</small>
                                <a href={`mailto:${partner.email}`} className="text-decoration-none fw-semibold text-break fs-7">
                                    <i className="fa-solid fa-envelope text-secondary me-2"></i>{partner.email}
                                </a>
                            </div>

                            {/* Mobile */}
                            <div className="list-group-item border-0 px-2 py-2.5">
                                <small className="text-muted d-block fw-semibold text-uppercase tracking-wide mb-1" style={{ fontSize: '0.65rem' }}>{t("mobile_number")}</small>
                                <a href={`tel:${partner.mobile}`} className="text-decoration-none fw-semibold fs-7">
                                    <i className="fa-solid fa-phone text-secondary me-2"></i>{partner.country_code || '+91'} {partner.mobile}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Website widget card if available */}
                    {partner.company_url && (
                        <div className="card border-0 shadow-sm rounded-4 p-3 bg-light-subtle">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-white shadow-sm rounded-3 p-2 text-primary d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                                    <i className="fa-solid fa-globe fs-5"></i>
                                </div>
                                <div className="overflow-hidden">
                                    <small className="text-muted d-block fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>{t("company_website")}</small>
                                    <a
                                        href={
                                            partner.company_url
                                                ? partner.company_url.startsWith("http")
                                                    ? partner.company_url
                                                    : `https://${partner.company_url}`
                                                : "#"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none fw-bold text-truncate d-block fs-7"
                                    >
                                        {partner.company_url
                                            ? partner.company_url.replace(
                                                /https?:\/\/(www\.)?/,
                                                ""
                                            )
                                            : "-"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side Info Panel */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                        <h5 className="fw-extrabold text-dark mb-4 pb-2 border-bottom border-light-subtle fs-5">{t("business_overview")}</h5>

                        {/* About Description Block */}
                        {partner.company_short_desc && (
                            <div className="mb-4 bg-light-subtle p-3 rounded-3 border-start border-3 border-primary-subtle">
                                <h6 className="fw-bold text-dark mb-2 fs-6">{t("about_company")}</h6>
                                <p className="text-secondary mb-0 lh-base fs-7" style={{ textAlign: 'justify' }}>
                                    {partner.company_short_desc}
                                </p>
                            </div>
                        )}

                        {/* Detailed Metadata Grid */}
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <div className="p-3 border border-light-subtle rounded-3 h-100 bg-light-subtle">
                                    <div className="text-muted small fw-bold text-uppercase tracking-wider mb-1" style={{ fontSize: '0.65rem' }}>{t("full_registered_name")}</div>
                                    <div className="fw-bold text-dark fs-6">{partner.company_name || "—"}</div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="p-3 border border-light-subtle rounded-3 h-100 bg-light-subtle">
                                    <div className="text-muted small fw-bold text-uppercase tracking-wider mb-1" style={{ fontSize: '0.65rem' }}>{t("postal_zip_code")}</div>
                                    <div className="fw-bold text-dark fs-6">{partner.postal_code || "—"}</div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="p-3 border border-light-subtle rounded-3 bg-light-subtle">
                                    <div className="text-muted small fw-bold text-uppercase tracking-wider mb-1" style={{ fontSize: '0.65rem' }}>{t("office_address")}</div>
                                    <div className="fw-semibold text-dark-emphasis fs-7">
                                        <i className="fa-solid fa-location-dot text-danger me-2"></i>
                                        {partner.address || "No address provided"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
