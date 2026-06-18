import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

export default function Plan() {
  const { t } = useTranslation();
  const [plans, setPlans] = useState([]);
  const [profile, setProfile] = useState(null);


  // handlepaymnt with verification
  const handlePayment = async (plan, gateway) => {

    try {

      const { data } = await API.post(
        "/plans/create-order",
        {
          planId: plan._id,
          gateway,
          partnerId: profile?._id,
          email: profile?.email,
          phone: profile?.mobile,
          name: profile?.name,
          country: profile?.country_id,
          state: profile?.state_id,
          city: profile?.city_id,
        }
      );


      if (gateway === "paypal") {
        window.location.href = data.approvalUrl;
        return;
      }

      if (gateway === "razorpay") {
        // Razorpay checkout open
        const options = {

          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: data.order.amount,
          currency: data.order.currency,
          order_id: data.order.id,
          name: plan.name,
          description: `${plan.duration} Month Plan`,

          handler: async function (response) {

            console.log(response, "response from razorpay");

            const verify = await API.post("/plans/verify-payment", {
              ...response,
              partnerId: profile._id,
              planId: plan._id,
              amount: plan.price
            })

            console.log(verify.data);

            if (verify.data.success) {
              alert("Payment Successful");
              await getPlans();
            }

          }
        };
        console.log(import.meta.env.VITE_RAZORPAY_KEY)
        const razorpay = new window.Razorpay(options);

        razorpay.open();
      }

    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  };



  // handlePayment end
  const getPlans = async () => {
    try {
      const profileRes = await API.get('/partner/profile');
      const partner = profileRes.data;
      setProfile(partner);

      const categoryId = partner?.category_id?._id || partner?.category_id;
      const subCategoryId = partner?.subcategory_id?._id || partner?.subcategory_id;
      const subSubCategoryId = partner?.sub_subcategory_id?._id || partner?.sub_subcategory_id;

      let query = '';

      if (subSubCategoryId) {
        query = `sub_subCategory_id=${subSubCategoryId}`;
      } else if (subCategoryId) {
        query = `subCategory_id=${subCategoryId}`;
      } else if (categoryId) {
        query = `category_id=${categoryId}`;
      } else {
        setPlans([]);
        return;
      }

      const plansRes = await API.get(`/plans?${query}`);
      setPlans(plansRes.data.plans || []);
    } catch (error) {
      console.log('Plan fetch error:', error.response?.data || error.message || error);
      setPlans([]);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);



  return (
    <div>

      {/* Plans */}
      <div className="container py-5">

        <div className="row g-4 justify-content-center">
          <PayPalScriptProvider
            options={{ clientId: PAYPAL_CLIENT_ID || 'loading', currency: "USD" }}
          >
            {plans.map((plan, index) => (

              <div
                key={plan._id || index}
                className="col-xl-3 col-lg-4 col-md-6"
              >

                <div
                  className="h-100 position-relative shadow-sm"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background:
                      plan.name === "Diamond"
                        ? "linear-gradient(135deg,#111827,#374151)"
                        : plan.name === "Ruby"
                          ? "linear-gradient(135deg,#be123c,#fb7185)"
                          : "linear-gradient(135deg,#065f46,#10b981)",

                    color: "#fff",
                    padding: "30px 25px",
                    transition: "0.3s",
                    border:
                      plan.name === "Diamond"
                        ? "2px solid #9ca3af"
                        : plan.name === "Ruby"
                          ? "2px solid #fecdd3"
                          : "2px solid #6ee7b7",
                  }}
                >

                  {/* Badge */}
                  {/* {index === 1 && (
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-warning text-dark px-3 py-2">{t("most_popular")}</span>
                    </div>
                  )} */}
                  {index === 1 && (
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-warning text-dark px-3 py-2">
                        {t("plans.most_popular")}
                      </span>
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className="fw-bold mb-3">
                    {plan.name}
                  </h3>

                  <div className="mb-4">
                    <span style={{ fontSize: "52px", fontWeight: "700" }}>
                      ₹{plan.price}
                    </span>

                    <div style={{ opacity: 0.8, marginTop: "-5px", fontSize: "14px" }}>
                      /{" "}
                      {plan.duration === 12
                        ? `1 ${t("plans.year")}`
                        : `${plan.duration} ${t("plans.month")}`}
                    </div>
                  </div>

                  <hr
                    style={{
                      borderColor: "rgba(255,255,255,0.2)",
                    }}
                  />

                  {/* Features */}
                  <ul className="list-unstyled mt-4 mb-5">

                    {plan.features?.map((feature, i) => (

                      <li
                        key={i}
                        className="d-flex align-items-start mb-3"
                        style={{ fontSize: "15px" }}
                      >

                        <i
                          className="fa-solid fa-circle-check me-2 mt-1"
                          style={{
                            color:
                              plan.name === "Diamond"
                                ? "#d1d5db"
                                : plan.name === "Ruby"
                                  ? "#ffe4e6"
                                  : "#bbf7d0",
                          }}
                        ></i>

                        <span>{feature}</span>

                      </li>

                    ))}

                  </ul>


                  {/* <button
                    className="btn btn-primary w-100 fw-semibold"
                    onClick={() => handlePayment(plan, "razorpay")}
                  >{t("pay_with_razorpay")}</button> */}
                  <button
                    className="btn btn-primary w-100 fw-semibold"
                    onClick={() => handlePayment(plan, "razorpay")}
                  >
                    {t("plans.pay_with_razorpay")}
                  </button>


                  {PAYPAL_CLIENT_ID && <div className="mt-2">
                    <PayPalButtons
                      style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
                      createOrder={async () => {
                        const res = await API.post("/plans/create-order", {
                          planId: plan._id,
                          gateway: "paypal",
                          partnerId: profile?._id,
                          email: profile?.email,
                          phone: profile?.mobile,
                          name: profile?.name,
                          country: profile?.country_id,
                          state: profile?.state_id,
                          city: profile?.city_id,
                        });
                        return res.data.order.id;
                      }}

                      onApprove={async (data) => {
                        try {
                          const captureRes = await API.post("/plans/paypal/capture-order", {
                            orderId: data.orderID,
                            planId: plan._id,
                            partnerId: profile?._id,
                          });

                          if (captureRes.data.success) {
                            alert("PayPal payment successful");
                            await getPlans();
                          } else {
                            alert("PayPal payment failed: " + captureRes.data.message);
                          }
                        } catch (err) {
                          console.error("PayPal capture error", err);
                          alert("PayPal payment failed. Check console.");
                        }
                      }}
                      onError={(err) => {
                        console.error("PayPal error", err);
                        alert("PayPal checkout error. Try again.");
                      }}
                      onCancel={() => {
                        alert("PayPal payment canceled");
                      }}
                    />


                  </div>}




                  {/* <button
                    className="btn w-100 fw-semibold mt-2"
                    onClick={() => handlePayment(plan, "razorpay")}
                  >{t("pay_with_razorpay")}</button> */}

                  {/* <button
                  className="btn w-100 fw-semibold"
                  style={{
                    borderRadius: "12px",
                    padding: "12px",
                    background: "#fff",
                    color:
                      plan.name === "Diamond"
                        ? "#111827"
                        : plan.name === "Ruby"
                          ? "#be123c"
                          : "#065f46",
                    border: "none",
                  }}
                >{t("get_started")}</button> */}

                </div>

              </div>

            ))}
          </PayPalScriptProvider>
        </div>

      </div>
    </div>
  )
}
