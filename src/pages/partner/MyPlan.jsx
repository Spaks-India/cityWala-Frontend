// import React from "react";
// import { useEffect, useState } from "react";
// import API from "../../api/axios";
// import { useParams } from "react-router-dom";

// const MyPlan = () => {

//     const [partnerPlan, setPartnerPlan] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await API.get(`/plans/partner-plan`);
//                 setPartnerPlan(res.data);
//                 console.log("plan details", res.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchData();
//     }, []);

//     // const formatDate = (date) => {
//     //     return new Date(date).toLocaleDateString("en-IN", {
//     //         day: "2-digit",
//     //         month: "short",
//     //         year: "numeric",
//     //     });
//     // };
//     const expiry = partnerPlan?.plan.expiryDate;
//     console.log("expiry date", expiry);

//     const formatDate = (date) => {
//        return new Date(date).toLocaleDateString("eng-IN",{
//         day: "2-digit",
//         month: "short",
//         year: "numeric"
//        })
//     }

//     return (
//         <div className="container py-4">

//             {/* Header */}
//             <div className="mb-4">
//                 <h2 className="fw-bold">My Plan</h2>
//                 <p className="text-muted">
//                     Manage your subscription and track benefits
//                 </p>
//             </div>

//             {/* Main Card */}
//             <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

//                 {/* Top Banner */}
//                 <div className="p-4 text-white bg-dark">

//                     <div className="d-flex justify-content-between align-items-center flex-wrap">

//                         <div>
//                             <h3 className="mb-1 fw-bold">
//                                 {partnerPlan ? partnerPlan?.plan.plan_id.name : "Loading..."}
//                             </h3>

//                             <p className="mb-0">
//                                 ₹{partnerPlan ? partnerPlan?.plan.plan_id.price : "Loading..."} / month
//                             </p>
//                         </div>

//                         <div className="text-end">
//                             <span className="badge bg-success mb-2">
//                                 {/* {partnerPlan ? partnerPlan?.plan.status : "Loading..."} */}
//                                 {partnerPlan?.isExpired ? "Inactive" : "Active"}
//                             </span>

//                             <div className="small">
//                                 {partnerPlan ? partnerPlan?.daysLeft : "Loading..."} days left
//                             </div>
//                         </div>

//                     </div>

//                 </div>

//                 {/* Body */}
//                 <div className="card-body p-4">

//                     <div className="row g-4">

//                         {/* Left Info */}
//                         <div className="col-md-6">

//                             <div className="mb-3">
//                                 <small className="text-muted">Start Date</small>
//                                 <h6>{formatDate(partnerPlan?.plan.startDate)}</h6>
//                             </div>

//                             <div className="mb-3">
//                                 <small className="text-muted">Expiry Date</small>
//                                 <h6>{formatDate(partnerPlan?.plan.expiryDate)}</h6>
//                             </div>

//                             <div className="mb-3">
//                                 <small className="text-muted">Auto Renew</small>
//                                 <h6>
//                                     {partnerPlan ? partnerPlan?.plan.autoRenew ? "Enabled" : "Disabled" : "Loading..."}
//                                 </h6>
//                             </div>

//                         </div>

//                         {/* Right Features */}
//                         <div className="col-md-6">

//                             <h5 className="fw-bold mb-3">
//                                 What's Included
//                             </h5>

//                             <div className="row">

//                                 {partnerPlan ? partnerPlan?.plan.plan_id.features.map((f, i) => (
//                                     <div key={i} className="col-12 mb-2">

//                                         <div className="d-flex align-items-center">

//                                             <i className="fa-solid fa-check text-success me-2"></i>

//                                             <span>{f}</span>

//                                         </div>

//                                     </div>
//                                 )) : "Loading..."}

//                             </div>

//                         </div>

//                     </div>

//                     {/* Actions */}
//                     <div className="mt-4 d-flex gap-3 flex-wrap">

//                         <button className="btn btn-primary px-4">
//                             Renew Plan
//                         </button>

//                         <button className="btn btn-outline-secondary px-4">
//                             Upgrade Plan
//                         </button>

//                         <button className="btn btn-outline-danger px-4">
//                             Cancel
//                         </button>

//                     </div>

//                 </div>



//             </div>
//         </div>
//     );
// };

// export default MyPlan;

import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useTranslation } from "react-i18next";

const MyPlan = () => {

    const [partnerPlan, setPartnerPlan] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get(`/plans/partner-plan`);
                setPartnerPlan(res.data);
                console.log("plan details", res.data);
                console.log("payment details", res.data.plan?.payment_id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // Format date for display
    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // Sample payment history data (replace with API data)
    const openRazorpay = (data) => {
        const order = data.order || data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: order.amount,
            currency: order.currency || "INR",
            order_id: order.id,

            handler: async function (response) {
                await API.post("/plans/verify-payment", {
                    ...response,
                    partnerId: partnerPlan?.plan?.partner_id,
                    planId: data.planId || partnerPlan?.plan?.plan_id?._id
                });

                alert("Payment success");

                window.location.reload(); // IMPORTANT
            }
        };

        new window.Razorpay(options).open();
    };

    const handleRenew = async (planId) => {
        try {
            const res = await API.post(
                "/plans/create-order",
                {
                    planId
                }
            );

            // Razorpay open
            openRazorpay({
                order: res.data.order,
                amount: res.data.order?.amount,
                planId
            });
            console.log(res.data);
        } catch (error) {

            console.log(error);
        }
    };


    const [showAllHistory, setShowAllHistory] = useState(false);

    const toggleHistory = () => {
        setShowAllHistory(prev => !prev);
    };

    const visibleHistory = showAllHistory
        ? partnerPlan?.plan?.planHistory || []
        : partnerPlan?.plan?.planHistory?.slice(0, 2) || [];


    return (
        <div className="container py-4">

            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-bold">{t("my_plan.title")}</h2>
                <p className="text-muted">
                    {t("my_plan.subtitle")}
                </p>
            </div>

            {/* Main Card */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                {/* Top Banner */}
                <div className="p-4 text-white bg-dark d-flex justify-content-between">

                    <div>
                        <h3 className="fw-bold text-white ">
                            {partnerPlan?.plan.plan_id?.name || "Loading..."}
                        </h3>

                        <p className="mb-0 text-white">
                            {partnerPlan?.plan.plan_id?.price === 0
                                ? "Free"
                                : `${partnerPlan?.plan.payment_id?.currency === "USD" ? "$" : "₹"}${partnerPlan?.plan.plan_id?.price ?? "-"}`} / month
                        </p>
                    </div>

                    <div className="text-end">

                        {/* STATUS */}
                        <span
                            className={`badge mb-2 ${partnerPlan?.isExpired
                                    ? "bg-danger"
                                    : partnerPlan?.plan?.nextPlan_id
                                        ? "bg-warning"
                                        : "bg-success"
                                }`}
                        >
                            {partnerPlan?.isExpired
                                ? t("my_plan.status.expired")
                                : partnerPlan?.plan?.nextPlan_id
                                    ? t("my_plan.status.upgrading")
                                    : t("my_plan.status.active")}
                        </span>

                        <div className="small">
                            {partnerPlan?.daysLeft ?? "-"} {t("my_plan.status.days_left")}
                        </div>
                    </div>

                </div>

                {/* Body */}
                <div className="card-body p-4">

                    <div className="row g-4">

                        {/* LEFT */}
                        <div className="col-md-6">

                            <div className="mb-3">
                                <small className="text-muted">
                                    {t("my_plan.labels.start_date")}
                                </small>
                                <h6>{formatDate(partnerPlan?.plan.startDate)}</h6>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">
                                    {t("my_plan.labels.expiry_date")}
                                </small>
                                <h6>{formatDate(partnerPlan?.plan.expiryDate)}</h6>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">
                                    {t("my_plan.labels.auto_renew")}
                                </small>
                                <h6>
                                    {partnerPlan?.plan.autoRenew ? "Enabled" : "Disabled"}
                                </h6>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">
                                    {t("my_plan.labels.payment_provider")}
                                </small>
                                <h6>{partnerPlan?.plan.payment_id?.provider || "-"}</h6>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">
                                    {t("my_plan.labels.currency")}
                                </small>
                                <h6>{partnerPlan?.plan.payment_id?.currency || "-"}</h6>
                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="col-md-6">

                            <h5 className="fw-bold mb-3">
                                {t("my_plan.features.title")}
                            </h5>

                            {partnerPlan?.plan.plan_id?.features?.length ? (
                                partnerPlan.plan.plan_id.features.map((f, i) => (
                                    <div key={i} className="mb-2">
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        {f}
                                    </div>
                                ))
                            ) : (
                                <p>{t("my_plan.features.no_features")}</p>
                            )}

                        </div>

                    </div>

                    {/* PENDING PLAN */}
                    {partnerPlan?.plan.nextPlan_id && (
                        <div className="alert alert-warning mt-4">
                            <strong>{t("my_plan.pending.text")}</strong>
                        </div>
                    )}

                    {/* ACTIONS */}
                    <div className="mt-4 d-flex gap-3 flex-wrap">

                        <button className="btn btn-primary px-4">
                            {t("my_plan.actions.renew")}
                        </button>

                        <button className="btn btn-outline-secondary px-4">
                            {t("my_plan.actions.upgrade")}
                        </button>

                        <button className="btn btn-outline-danger px-4">
                            {t("my_plan.actions.cancel")}
                        </button>

                    </div>

                </div>

            </div>

            {/* PLAN HISTORY */}
            <div className="mt-5">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">

                    <div>
                        <h4 className="fw-bold mb-1">
                            {t("my_plan.history.title")}
                        </h4>

                        <p className="text-muted small mb-0">
                            {t("my_plan.history.subtitle")}
                        </p>
                    </div>

                    <div className="d-flex gap-3 align-items-center">

                        <span className="badge bg-dark px-3 py-2 rounded-pill">
                            {partnerPlan?.plan?.planHistory?.length || 0}{" "}
                            {t("my_plan.history.records")}
                        </span>

                        <span
                            className="badge bg-dark px-3 py-2 rounded-pill"
                            onClick={toggleHistory}
                            style={{ cursor: "pointer" }}
                        >
                            {showAllHistory
                                ? t("my_plan.history.show_less")
                                : t("my_plan.history.show_all")}
                        </span>

                    </div>
                </div>

                {/* HISTORY LIST */}
                {visibleHistory.length ? (

                    <div className="row g-4">

                        {visibleHistory.map((item, index) => (

                            <div className="col-12" key={index}>

                                <div className="card border-0 shadow-sm rounded-4 h-100">

                                    <div className="card-body p-4">

                                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                                            {/* LEFT */}
                                            <div className="d-flex gap-3">

                                                <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
                                                    style={{ width: "55px", height: "55px" }}>
                                                    <i className="fa-solid fa-crown"></i>
                                                </div>

                                                <div>

                                                    <h5 className="fw-bold mb-0">
                                                        {item.plan_id?.name || "Plan"}
                                                    </h5>

                                                    <div className="mt-1 mb-3 fw-semibold fs-5">
                                                        {item.plan_id?.price === 0
                                                            ? "Free"
                                                            : item.plan_id?.price != null
                                                                ? `${item.plan_id?.currency === "USD" ? "$" : "₹"}${item.plan_id.price}`
                                                                : "N/A"}
                                                    </div>

                                                    <div className="row g-3">

                                                        <div className="col-sm-4">
                                                            <small className="text-muted">
                                                                {t("my_plan.history.started")}
                                                            </small>
                                                            <div>{formatDate(item.startDate)}</div>
                                                        </div>

                                                        <div className="col-sm-4">
                                                            <small className="text-muted">
                                                                {t("my_plan.history.expired")}
                                                            </small>
                                                            <div>{formatDate(item.expiryDate)}</div>
                                                        </div>

                                                        <div className="col-sm-4">
                                                            <small className="text-muted">
                                                                {t("my_plan.history.ended_at")}
                                                            </small>
                                                            <div>{formatDate(item.endedAt)}</div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            {/* RIGHT */}
                                            <div className="text-end">

                                                <span className="badge bg-danger px-3 py-2 rounded-pill text-capitalize">
                                                    {item.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body text-center py-5">

                            <h5 className="fw-bold">
                                {t("my_plan.history.no_history")}
                            </h5>

                            <p className="text-muted mb-0">
                                {t("my_plan.history.empty_text")}
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default MyPlan;