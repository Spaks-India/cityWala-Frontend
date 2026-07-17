import React from "react";
import Seo from "../seo/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import { webPageSchema, graph } from "../seo/schema";

const TITLE = "About Us";
const DESCRIPTION =
  "Learn about CityWala's mission to connect verified businesses, MSMEs, exporters, importers, and wholesalers across India through our business listing platform and online marketplace.";

const AboutUs = () => {
  return (
    <div>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/about-us"
        jsonLd={graph(webPageSchema({ path: "/about-us", name: TITLE, description: DESCRIPTION }))}
      />
      <div className="container pt-4">
        <Breadcrumbs items={[{ name: "About Us" }]} />
      </div>

      {/* HERO */}
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
                About CityWala
              </span>

              <h1
                className="text-white fw-bold mb-3"
                style={{
                  fontSize: "clamp(2rem,5vw,4rem)",
                  lineHeight: "1.2",
                }}
              >
                Discover Local Services <br />
                Without The Chaos
              </h1>

              <p
                className="text-white mx-auto mb-0"
                style={{
                  maxWidth: "700px",
                  opacity: "0.9",
                  fontSize: "18px",
                }}
              >
                CityWala is built to simplify how people discover nearby businesses, trusted services, local opportunities, and daily essentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-4">

            {/* Left Image */}
            <div className="col-lg-6">
              <div style={{
                overflow: "hidden",
                borderRadius: "24px",
                height: "420px",
                position: "relative"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                  alt="about"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="col-lg-6">
              <span
                className="d-inline-block px-3 py-2 mb-3 rounded-pill"
                style={{
                  background: "rgba(244,111,38,0.1)",
                  color: "#f46f26",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                ✨ About CityWala
              </span>

              <h2
                className="fw-bold mb-3"
                style={{
                  fontSize: "clamp(28px,5vw,48px)",
                  lineHeight: "1.2",
                  color: "#111",
                  fontFamily: "'Playfair Display', serif"
                }}
              >
                Why We Built <span style={{ color: "#f46f26" }}>CityWala</span>
              </h2>

              <p style={{ fontSize: "17px", lineHeight: "1.9", color: "#555", marginBottom: "18px" }}>
                Instead of searching across multiple platforms and wasting time, users can explore everything in one clean and smart ecosystem.
              </p>

              <p style={{ fontSize: "17px", lineHeight: "1.9", color: "#555", marginBottom: "30px" }}>
                Our platform focuses on speed, trust, better visibility for local businesses, and a smooth user experience across every device.
              </p>

              <div className="row g-3">
                <div className="col-md-6">
                  <div style={{
                    background: "#fff",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "1px solid #eee",
                    transition: "0.3s ease"
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <h5 style={{ fontSize: "17px", marginBottom: "10px", color: "#111", fontWeight: "700" }}>⚡ Fast Discovery</h5>
                    <p style={{ fontSize: "14px", margin: "0", lineHeight: "1.7", color: "#666" }}>Find nearby businesses and services instantly.</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div style={{
                    background: "#fff",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "1px solid #eee",
                    transition: "0.3s ease"
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <h5 style={{ fontSize: "17px", marginBottom: "10px", color: "#111", fontWeight: "700" }}>🛡️ Trusted Listings</h5>
                    <p style={{ fontSize: "14px", margin: "0", lineHeight: "1.7", color: "#666" }}>Verified and organized local business profiles.</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div style={{
                    background: "#fff",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "1px solid #eee",
                    transition: "0.3s ease"
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <h5 style={{ fontSize: "17px", marginBottom: "10px", color: "#111", fontWeight: "700" }}>📍 Smart Search</h5>
                    <p style={{ fontSize: "14px", margin: "0", lineHeight: "1.7", color: "#666" }}>Explore services based on categories and location.</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div style={{
                    background: "#fff",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "1px solid #eee",
                    transition: "0.3s ease"
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <h5 style={{ fontSize: "17px", marginBottom: "10px", color: "#111", fontWeight: "700" }}>📱 Modern Experience</h5>
                    <p style={{ fontSize: "14px", margin: "0", lineHeight: "1.7", color: "#666" }}>Responsive, clean, and user-friendly platform.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION MISSION SECTION */}
      <section className="py-5" style={{ background: "#f8fbff" }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div style={{
              background: "#fff",
              padding: "35px 28px",
              borderRadius: "24px",
              border: "1px solid #ececec",
              transition: "0.35s ease",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              height: "100%"
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
              }}
            >
              <h3 style={{ fontSize: "24px", marginBottom: "18px", color: "#111", fontWeight: "700", fontFamily: "'Playfair Display', serif" }}>🚀 Vision</h3>

              <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#666", marginBottom: "18px" }}>
                Build the most trusted local discovery platform where users can quickly connect with businesses and opportunities around them.
              </p>

              <ul style={{ marginBottom: "0", paddingLeft: "18px" }}>
                <li style={{ marginBottom: "10px", color: "#555", lineHeight: "1.6" }}>Easy access to local services</li>
                <li style={{ marginBottom: "10px", color: "#555", lineHeight: "1.6" }}>Better visibility for businesses</li>
                <li style={{ color: "#555", lineHeight: "1.6" }}>Simple and clean user experience</li>
              </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div style={{
                background: "#fff",
                padding: "35px 28px",
                borderRadius: "24px",
                border: "1px solid #ececec",
                transition: "0.35s ease",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                height: "100%"
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                }}
              >
                <h3 style={{ fontSize: "24px", marginBottom: "18px", color: "#111", fontWeight: "700", fontFamily: "'Playfair Display', serif" }}>🎯 Mission</h3>

                <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#666", marginBottom: "18px" }}>
                  Our mission is to remove confusion from local search and create a smarter ecosystem that benefits both users and business owners.
                </p>

                <ul style={{ marginBottom: "0", paddingLeft: "18px" }}>
                  <li style={{ marginBottom: "10px", color: "#555", lineHeight: "1.6" }}>Instant local discovery</li>
                  <li style={{ marginBottom: "10px", color: "#555", lineHeight: "1.6" }}>Reliable information</li>
                  <li style={{ color: "#555", lineHeight: "1.6" }}>Faster business connections</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div style={{
                background: "#fff",
                padding: "35px 28px",
                borderRadius: "24px",
                border: "1px solid #ececec",
                transition: "0.35s ease",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                height: "100%"
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                }}
              >
                <h3 style={{ fontSize: "24px", marginBottom: "18px", color: "#111", fontWeight: "700", fontFamily: "'Playfair Display', serif" }}>⚙️ What We Do</h3>

                <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#666", marginBottom: "18px" }}>
                  CityWala organizes local businesses, services, and opportunities in one powerful platform designed for modern users.
                </p>

                <ul style={{ marginBottom: "0", paddingLeft: "18px" }}>
                  <li style={{ marginBottom: "10px", color: "#555", lineHeight: "1.6" }}>Business listings</li>
                  <li style={{ marginBottom: "10px", color: "#555", lineHeight: "1.6" }}>Category-based browsing</li>
                  <li style={{ color: "#555", lineHeight: "1.6" }}>Location-focused discovery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg,#1075be,#f46f26)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9 text-center">

              <h2 className="text-white fw-bold mb-3" style={{
                fontSize: "clamp(28px,5vw,48px)",
                lineHeight: "1.2",
                fontFamily: "'Playfair Display', serif"
              }}>
                Ready to Explore Local Services?
              </h2>

              <p className="text-white" style={{
                opacity: "0.9",
                fontSize: "18px",
                marginBottom: "30px",
                maxWidth: "700px",
                margin: "0 auto 30px"
              }}>
                Join thousands of users discovering businesses, services, and opportunities faster with CityWala.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">

                <a
                  href="/"
                  className="btn fw-semibold"
                  style={{
                    background: "#fff",
                    color: "#1075be",
                    padding: "12px 32px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "600",
                    transition: "0.3s ease",
                    textDecoration: "none",
                    display: "inline-block"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  🔍 Explore Platform
                </a>

                <a
                  href="mailto:citywala1959@gmail.com"
                  className="btn fw-semibold"
                  style={{
                    background: "transparent",
                    color: "#fff",
                    border: "2px solid rgba(255,255,255,0.3)",
                    padding: "10px 32px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "600",
                    transition: "0.3s ease",
                    textDecoration: "none",
                    display: "inline-block"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#fff";
                    e.target.style.background = "rgba(255,255,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.3)";
                    e.target.style.background = "transparent";
                  }}
                >
                  ✉️ Contact Us
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-5" style={{ background: "#f8fbff" }}>
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div style={{
                padding: "24px",
                borderRadius: "20px",
                background: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}>
                <h3 style={{ fontSize: "30px", color: "#111", marginBottom: "8px", fontWeight: "700", fontFamily: "'Playfair Display', serif" }}>10K+</h3>
                <p style={{ fontSize: "14px", color: "#777", lineHeight: "1.6", margin: "0" }}>Monthly searches across local categories.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div style={{
                padding: "24px",
                borderRadius: "20px",
                background: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}>
                <h3 style={{ fontSize: "30px", color: "#111", marginBottom: "8px", fontWeight: "700", fontFamily: "'Playfair Display', serif" }}>500+</h3>
                <p style={{ fontSize: "14px", color: "#777", lineHeight: "1.6", margin: "0" }}>Businesses and services listed on platform.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div style={{
                padding: "24px",
                borderRadius: "20px",
                background: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}>
                <h3 style={{ fontSize: "30px", color: "#111", marginBottom: "8px", fontWeight: "700", fontFamily: "'Playfair Display', serif" }}>24/7</h3>
                <p style={{ fontSize: "14px", color: "#777", lineHeight: "1.6", margin: "0" }}>Customer support and platform availability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;