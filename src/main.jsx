import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'
import './admin.css'
import "./i18n";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback="Loading...">
        <App />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
)
