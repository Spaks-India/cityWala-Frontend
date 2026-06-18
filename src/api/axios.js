// import axios from 'axios'
// import i18n from "i18next";


// const getStorage = () => {
//   if (typeof window === 'undefined') return null
//   return window.localStorage || null
// }

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   // baseURL: import.meta.env.VITE_API_URL || 'https://citywala-backend.onrender.com/api',
// })

// // Auto attach token from localStorage
// // API.interceptors.request.use((config) => {
// //   const storage = getStorage()
// //   const token =
// //     storage?.getItem('token') ||
// //     storage?.getItem('partnerToken') ||
// //     storage?.getItem('adminToken')
// //   if (token) config.headers.Authorization = `Bearer ${token}`
// //    config.headers["Accept-Language"] = i18n.language;

// //   return config
// // })

// API.interceptors.request.use((config) => {
//   const storage = getStorage();

//   const token =
//     storage?.getItem("token") ||
//     storage?.getItem("partnerToken") ||
//     storage?.getItem("adminToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   // ✅ IMPORTANT PART
//   config.headers["Accept-Language"] = i18n.language || "en";

//   return config;
// });

// // API.interceptors.response.use(
// //   (res) => res,

// //   (err) => {
// //     const status = err.response?.status;

// //     if (status === 401 || status === 403) {

// //       const storage = getStorage();

// //       storage?.removeItem("token");
// //       storage?.removeItem("partnerToken");
// //       storage?.removeItem("partner");
// //       storage?.removeItem("adminToken");

// //       window.location.href = "/login";
// //     }

// //     return Promise.reject(err);
// //   }
// // );


// // API.interceptors.response.use(
// //   (res) => res,

// //   (err) => {

// //     const status = err.response?.status;
// //     const message = err.response?.data?.message;

// //     // Only logout suspended partner
// //     if (
// //       status === 403 &&
// //       message === "Account suspended"
// //     ) {

// //       const storage = getStorage();

// //       storage?.removeItem("partnerToken");
// //       storage?.removeItem("partner");

// //       window.location.href = "/login";
// //     }

// //     // Invalid token
// //     if (status === 401) {

// //       const storage = getStorage();

// //       storage?.removeItem("token");
// //       storage?.removeItem("partnerToken");
// //       storage?.removeItem("partner");
// //       storage?.removeItem("adminToken");

// //       window.location.href = "/login";
// //     }

// //     return Promise.reject(err);
// //   }
// // );

// // Auto logout on 401
// // API.interceptors.response.use(
// //   (res) => res,
// //   (err) => {
// //     if (err.response?.status === 401) {
// //       const storage = getStorage()
// //       storage?.removeItem('token')
// //       storage?.removeItem('partnerToken')
// //       storage?.removeItem('adminToken')
// //     }
// //     return Promise.reject(err)
// //   },

// //   (err) => {

// //     if (err.response?.status === 403) {

// //       localStorage.removeItem("partnerToken");

// //       window.location.href = "/partner/login";
// //     }

// //     return Promise.reject(err);
// //   }
// // )

// API.interceptors.response.use(
//   (res) => res,

//   (err) => {
//     const status = err.response?.status;
//     const message = err.response?.data?.message;

//     // ❌ ONLY REAL AUTH FAILURE
//     if (status === 401) {
//       const storage = getStorage();

//       storage?.removeItem("token");
//       storage?.removeItem("partnerToken");
//       storage?.removeItem("adminToken");

//       window.location.href = "/login";
//       return Promise.reject(err);
//     }

//     // ❌ OPTIONAL: ONLY IF YOU WANT FORCE LOGOUT ON SUSPENSION
//     if (status === 403 && message === "Unauthorized") {
//       const storage = getStorage();
//       storage?.removeItem("partnerToken");

//       window.location.href = "/login";
//       return Promise.reject(err);
//     }

//     // ❌ DO NOT AUTO-LOGOUT FOR OTHER 403 CASES (IMPORTANT)
//     return Promise.reject(err);
//   }
// );

// // Auto logout on auth errors
// // API.interceptors.response.use(
// //   (res) => res,

// //   (err) => {
// //     const status = err.response?.status;

// //     if (status === 401) {
// //       const storage = getStorage();

// //       storage?.removeItem("token");
// //       storage?.removeItem("partnerToken");
// //       storage?.removeItem("adminToken");
// //     }

// //     if (status === 403) {
// //       localStorage.removeItem("partnerToken");

// //       // window.location.href = "/partner/login";
// //       window.location.href = "/login";
// //     }

// //     return Promise.reject(err);
// //   }
// // );

// export default API
import axios from 'axios'
import i18n from "i18next";
import { getAccessToken, clearAccessToken } from '../utils/authToken'
import logger from '../utils/logger'

// VITE_API_URL is the bare backend origin (no trailing /api), e.g.
// https://citywala-backend-production.up.railway.app
// Backend mounts all routes under /api, and API calls use paths like
// '/auth/login', so baseURL must always end in '/api'.
//
// - Production (Vercel): set VITE_API_URL to the backend origin.
// - Local dev: leave VITE_API_URL unset; the '/api' fallback is served by
//   the Vite dev proxy (see vite.config.js) to localhost:5000.
const apiOrigin = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

if (import.meta.env.PROD && !apiOrigin) {
  // Fail loudly instead of silently calling the Vercel host (which has no
  // backend) and getting confusing 404s.
  throw new Error(
    'VITE_API_URL is not set. Set it to the backend origin in your Vercel project environment variables.'
  )
}

const API = axios.create({
  // Strip any '/api' the env value may already include, then append it once,
  // so the value works whether it's set with or without the suffix.
  baseURL: apiOrigin ? `${apiOrigin.replace(/\/api$/, '')}/api` : '/api',
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers["Accept-Language"] = i18n.language || "en";
  config.metadata = { start: Date.now() };
  logger.debug(`→ ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

API.interceptors.response.use(
  (res) => {
    const ms = Date.now() - (res.config.metadata?.start ?? Date.now());
    logger.debug(`← ${res.status} ${res.config.url} ${ms}ms`);
    return res;
  },
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url || '';

    // Always surface failed requests in the console, even in production.
    logger.error(
      `API ${err.config?.method?.toUpperCase() || ''} ${url} failed`,
      status || err.message,
      err.response?.data?.message || ''
    );

    if (status === 401 && !url.includes('/auth/me') && !url.includes('/auth/login')) {
      clearAccessToken();
    }

    return Promise.reject(err);
  }
);

export default API;