import React from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiSend,
  FiClock,
} from "react-icons/fi";
import { useState } from "react";
import API from "../api/axios";
import Seo from "../seo/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import { webPageSchema, graph } from "../seo/schema";

const TITLE = "Contact Us";
const DESCRIPTION =
  "Get in touch with CityWala for support, partnership queries, or business listing assistance. Reach our team via phone, email, or the contact form.";

const ContactUs = () => {

  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !messageText) {
    setMessage("⚠️ All fields are required");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    await API.post("/auth/contact", {
      name,
      email,
      subject,
      message: messageText,
    });

    setMessage("✅ Your message has been sent successfully! Our team will get back to you soon.");

    setName("");
    setEmail("");
    setSubject("");
    setMessageText("");

  } catch (err) {
    setMessage(
      err.response?.data?.message ||
      "❌ Failed to send message. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/contact-us"
        jsonLd={graph(webPageSchema({ path: "/contact-us", name: TITLE, description: DESCRIPTION }))}
      />
      <div className="container pt-4">
        <Breadcrumbs items={[{ name: "Contact Us" }]} />
      </div>

      {/* HERO SECTION */}
      <section
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
                Contact CityWala
              </span>

              <h1
                className="text-white fw-bold mb-3"
                style={{
                  fontSize: "clamp(2rem,5vw,4rem)",
                  lineHeight: "1.2",
                  fontFamily: "’Playfair Display’, serif",
                }}
              >
                Get In <br />
                Touch With Us
              </h1>

              <p
                className="text-white mx-auto mb-0"
                style={{
                  maxWidth: "700px",
                  opacity: "0.9",
                  fontSize: "18px",
                }}
              >
                Have questions, feedback, or business inquiries? Our team is ready to help you anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <div className="row g-4">

            {/* LEFT SIDE - INFO BOXES */}
            <div className="col-lg-5">

              <h2
                style={{
                  fontSize: "clamp(28px,5vw,42px)",
                  fontWeight: "700",
                  marginBottom: "18px",
                  color: "#111",
                  fontFamily: "’Playfair Display’, serif",
                }}
              >
                Contact Information
              </h2>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: "1.8",
                  color: "#666",
                  marginBottom: "40px",
                }}
              >
                We’d love to hear from you. Reach out for support, partnerships, listings, or general inquiries.
              </p>

              {/* Phone Info Box */}
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  marginBottom: "28px",
                  alignItems: "flex-start",
                  padding: "24px",
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #ececec",
                  transition: "all 0.3s ease",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.04)";
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    minWidth: "56px",
                    borderRadius: "14px",
                    background: "rgba(244, 111, 38, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f46f26",
                    fontSize: "24px",
                  }}
                >
                  <FiPhone />
                </div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
                    Phone
                  </h4>
                  <p style={{ fontSize: "15px", color: "#666", margin: "0" }}>
                    +91 836 874 1739
                  </p>
                </div>
              </div>

              {/* Email Info Box */}
              <a href="mailto:citywala1959@gmail.com" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                    marginBottom: "28px",
                    alignItems: "flex-start",
                    padding: "24px",
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #ececec",
                    transition: "all 0.3s ease",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.04)";
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      minWidth: "56px",
                      borderRadius: "14px",
                      background: "rgba(244, 111, 38, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f46f26",
                      fontSize: "24px",
                    }}
                  >
                    <FiMail />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
                      Email
                    </h4>
                    <p style={{ fontSize: "15px", color: "#666", margin: "0" }}>
                      citywala1959@gmail.com
                    </p>
                  </div>
                </div>
              </a>

              {/* Location Info Box */}
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  marginBottom: "28px",
                  alignItems: "flex-start",
                  padding: "24px",
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #ececec",
                  transition: "all 0.3s ease",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.04)";
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    minWidth: "56px",
                    borderRadius: "14px",
                    background: "rgba(244, 111, 38, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f46f26",
                    fontSize: "24px",
                  }}
                >
                  <FiMapPin />
                </div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
                    Location
                  </h4>
                  <p style={{ fontSize: "15px", color: "#666", margin: "0" }}>
                    E-38, Budh Vihar, Badarpur, New Delhi 110044
                  </p>
                </div>
              </div>

              {/* Working Hours Info Box */}
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                  padding: "24px",
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #ececec",
                  transition: "all 0.3s ease",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.04)";
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    minWidth: "56px",
                    borderRadius: "14px",
                    background: "rgba(244, 111, 38, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f46f26",
                    fontSize: "24px",
                  }}
                >
                  <FiClock />
                </div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
                    Working Hours
                  </h4>
                  <p style={{ fontSize: "15px", color: "#666", margin: "0" }}>
                    Mon - Sat : 10 AM - 7 PM
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="col-lg-7">

              <div
                style={{
                  background: "#fff",
                  padding: "40px",
                  borderRadius: "20px",
                  border: "1px solid #ececec",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                }}
              >

                <h2
                  style={{
                    fontSize: "clamp(28px,5vw,42px)",
                    fontWeight: "700",
                    marginBottom: "28px",
                    color: "#111",
                    fontFamily: "’Playfair Display’, serif",
                  }}
                >
                  Send Message
                </h2>

                {message && (
                  <div
                    style={{
                      padding: "12px 16px",
                      marginBottom: "20px",
                      borderRadius: "10px",
                      background: message.includes("✅") ? "#d4edda" : "#f8d7da",
                      color: message.includes("✅") ? "#155724" : "#721c24",
                      fontSize: "14px",
                      border: `1px solid ${message.includes("✅") ? "#c3e6cb" : "#f5c6cb"}`,
                    }}
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* Name and Email Row */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          border: "1px solid #e5e5e5",
                          background: "#fafafa",
                          padding: "16px 18px",
                          borderRadius: "12px",
                          outline: "none",
                          fontSize: "15px",
                          transition: "0.3s ease",
                          fontFamily: "Lato, sans-serif",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#f46f26";
                          e.target.style.background = "#fff";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e5e5";
                          e.target.style.background = "#fafafa";
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        placeholder="Your Email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          border: "1px solid #e5e5e5",
                          background: "#fafafa",
                          padding: "16px 18px",
                          borderRadius: "12px",
                          outline: "none",
                          fontSize: "15px",
                          transition: "0.3s ease",
                          fontFamily: "Lato, sans-serif",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#f46f26";
                          e.target.style.background = "#fff";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e5e5";
                          e.target.style.background = "#fafafa";
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      style={{
                        width: "100%",
                        border: "1px solid #e5e5e5",
                        background: "#fafafa",
                        padding: "16px 18px",
                        borderRadius: "12px",
                        outline: "none",
                        fontSize: "15px",
                        transition: "0.3s ease",
                        fontFamily: "Lato, sans-serif",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#f46f26";
                        e.target.style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e5e5";
                        e.target.style.background = "#fafafa";
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <textarea
                      rows="6"
                      placeholder="Write your message here..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      style={{
                        width: "100%",
                        border: "1px solid #e5e5e5",
                        background: "#fafafa",
                        padding: "16px 18px",
                        borderRadius: "12px",
                        outline: "none",
                        fontSize: "15px",
                        transition: "0.3s ease",
                        fontFamily: "Lato, sans-serif",
                        resize: "vertical",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#f46f26";
                        e.target.style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e5e5";
                        e.target.style.background = "#fafafa";
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={loading}
                    type="submit"
                    style={{
                      height: "54px",
                      padding: "0 32px",
                      border: "none",
                      borderRadius: "12px",
                      background: "#f46f26",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "600",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      opacity: loading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => !loading && (e.target.style.transform = "translateY(-3px)")}
                    onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <FiSend />
                  </button>

                </form>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section style={{ padding: "40px 0", background: "#fafafa" }}>
        <div className="container">
          <div
            style={{
              overflow: "hidden",
              borderRadius: "20px",
              height: "500px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
              border: "1px solid #ececec",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.5319696965407!2d77.30482627613364!3d28.493638490373154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce720705c3965%3A0x2c6082cb48df2283!2sspaks%20education!5e0!3m2!1sen!2sin!4v1781154178306!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="location"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;