
import React from "react";

const PaymentHistory = () => {
   
    const payments = [
        {
            id: "TXN001",
            plan: "Diamond",
            amount: 999,
            status: "paid",
            date: "25 May 2026",
            method: "Razorpay"
        },
        {
            id: "TXN002",
            plan: "Ruby",
            amount: 499,
            status: "pending",
            date: "10 June 2026",
            method: "PayPal"
        },
        {
            id: "TXN003",
            plan: "Emerald",
            amount: 1999,
            status: "failed",
            date: "15 June 2026",
            method: "Razorpay"
        }
    ];

    const getBadge = (status) => {
        if (status === "paid") return "bg-success";
        if (status === "pending") return "bg-warning text-dark";
        if (status === "failed") return "bg-danger";
        return "bg-secondary";
    };

    return (
        <div className="container py-4">

            <h2 className="fw-bold mb-3">{t("payment_history")}</h2>
            <p className="text-muted mb-4">{t("all_your_transactions_are_shown_below")}</p>

            <div className="card shadow-sm border-0 rounded-4">

                <div className="table-responsive">
                    <table className="table align-middle mb-0">

                        <thead className="table-light">
                            <tr>
                                <th>{t("transaction_id")}</th>
                                <th>{t("plan")}</th>
                                <th>{t("amount")}</th>
                                <th>{t("status")}</th>
                                <th>{t("method")}</th>
                                <th>{t("date")}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((p, i) => (
                                <tr key={i}>
                                    <td>{p.id}</td>
                                    <td>{p.plan}</td>
                                    <td>₹{p.amount}</td>
                                    <td>
                                        <span className={`badge ${getBadge(p.status)}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td>{p.method}</td>
                                    <td>{p.date}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    );
};

export default PaymentHistory;