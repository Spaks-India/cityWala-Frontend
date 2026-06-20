import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useState, useEffect } from 'react'
// import Header from './components/Header'
// import Footer from './components/Footer'

import Home from './pages/Home'
import AuthSelection from './pages/AuthSelection'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Plan from './pages/Plan'
import AllCategories from './pages/AllCategories'
import ForgotPassword from './pages/ForgotPassword'

// Partner
import PartnerLogin from './pages/partner/PartnerLogin'
import PartnerRegister from './pages/partner/PartnerRegister'
import PartnerDashboard from './pages/partner/PartnerDashboard'
import PartnerDetails from './pages/PartnerDetails'
// import AddMatrimonialProfile from './pages/partner/AddMatrimonialProfile'

// Admin (migrated from the standalone admin-frontend; served under /admin/*)
import AdminLogin, { AdminCategories, AdminUsers } from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import { AdminPartner } from './pages/admin/adminPartner'
import AddPlans from './pages/admin/AddPlans'
import AllPlans from './pages/admin/AllPlans'
import AdminAllCategories from './pages/admin/AdminAllCategories'
import CategoriesTree from './pages/admin/CategoriesTree'
import AdminSubcategories from './pages/admin/AdminSubcategories'
import TermsCondition from './pages/admin/TermsCondition'
import Analytics from './pages/admin/Analytics'

import { ResetPassword } from './pages/ResetPassword'
import VerifyOtp from './components/VerifyOtp'
// import AdminSubcategories from './pages/admin/AdminSubcategories'
// import { AdminSubcategories } from './pages/admin/AdminSubcategories'

// import AdminSubcategories from './pages/admin/AdminSubcategories'
import PartnerLayout from './pages/partner/PartnerLayout'
import AddProfile from './pages/partner/AddProfile'
import Loader from './components/Loader'
import MyPlan from './pages/partner/MyPlan'
import PaymentHistory from './pages/partner/PaymentHistory'
import PublicLayout from './components/PublicLayout'
import TermConditions from './pages/TermConditions'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import API from './api/axios'


// import Loader from './components/Loader'



function AppContent() {

  // const ProtectedUser = ({ children }) => {
//   const { user } = useAuth()
//   return user ? children : <Navigate to="/login" />
// }

const ProtectedUser = ({ children }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


const ProtectedPartner = ({ children }) => {

  const { partner, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!partner) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


const ProtectedAdmin = ({ children }) => {

  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// Wraps every admin route in `.admin-root` so the scoped admin styles in
// admin.css apply only here and never leak onto public/user/partner pages.
const AdminRoot = () => (
  <div className="admin-root">
    <Outlet />
  </div>
);




  return (
    <BrowserRouter>
      <Loader />
      {/* <Header /> */}
      <Routes>
        {/* <Loader /> */}
        {/* Public */}

        <Route element={<PublicLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthSelection />} />
          <Route path="/about-us" element={ <AboutUs /> } />
          <Route path='/contact-us' element={ <ContactUs /> } />
          <Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
          {/* <Route path="/account/login" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
          <Route path="/plan" element={<ProtectedPartner><Plan /></ProtectedPartner>} />
          {/* <Route path="/categories/:slug" element={<AllCategories />} /> */}
          <Route path="/partner/details/:id" element={<PartnerDetails />} />

          <Route path="/account/dashboard" element={<ProtectedUser><Dashboard /></ProtectedUser>} />

          <Route path="/categories/:level1?/:level2?/:level3?" element={<AllCategories />} />
          <Route path="/register-business" element={<PartnerRegister />} />
          <Route path='/terms-and-conditions' element={ <TermConditions /> } />
        </Route>

        {/* <Route path="/daily-necessary" element={<DailyNecessary />} />
        <Route path="/furniture-repair" element={<FurnitureRepairList />} /> */}

        {/* Matrimonial */}
        {/* <Route path="/matrimonial" element={<MatrimonialList />} />
        <Route path="/matrimonial/profile/:id" element={<MatrimonialProfile />} />
        <Route path="/matrimonial/search" element={<MatrimonialSearch />} /> */}

        {/* User Protected */}

        {/* Partner */}
        {/* <Route path="/partner/login" element={<PartnerLogin />} /> */}

        {/* <Route path="/partner/add-profile" element={<ProtectedPartner><AddMatrimonialProfile /></ProtectedPartner>} /> */}
        {/* <Route path="/partner/dashboard" element={<ProtectedPartner><PartnerDashboard /></ProtectedPartner>} /> */}

        <Route path="/partner" element={<PartnerLayout />}>
          <Route path="dashboard" element={<ProtectedPartner><PartnerDashboard /></ProtectedPartner>} />
          <Route path="add-profile" element={<ProtectedPartner><AddProfile /></ProtectedPartner>} />
          <Route path="plan" element={<ProtectedPartner><Plan /></ProtectedPartner>} />
          <Route path='my-plan' element={<ProtectedPartner> <MyPlan /> </ProtectedPartner>} />
          <Route path="payment-history" element={<ProtectedPartner> <PaymentHistory /> </ProtectedPartner>} />
          {/* <Route path='plan' element /> */}


        </Route>

        {/* Admin (migrated standalone admin app; wrapped in .admin-root for scoped styles) */}
        <Route element={<AdminRoot />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
          <Route path="/admin/users" element={<ProtectedAdmin><AdminUsers /></ProtectedAdmin>} />
          <Route path="/admin/partners" element={<ProtectedAdmin><AdminPartner /></ProtectedAdmin>} />
          <Route path="/admin/plans" element={<ProtectedAdmin><AllPlans /></ProtectedAdmin>} />
          <Route path="/admin/plans/add" element={<ProtectedAdmin><AddPlans /></ProtectedAdmin>} />
          <Route path="/admin/plans/edit/:id" element={<ProtectedAdmin><AddPlans /></ProtectedAdmin>} />
          <Route path="/admin/categories/add" element={<ProtectedAdmin><AdminCategories /></ProtectedAdmin>} />
          <Route path="/admin/categories/edit/:id" element={<ProtectedAdmin><AdminCategories /></ProtectedAdmin>} />
          <Route path="/admin/categories/all" element={<ProtectedAdmin><AdminAllCategories /></ProtectedAdmin>} />
          <Route path="/admin/categories-tree" element={<ProtectedAdmin><CategoriesTree /></ProtectedAdmin>} />
          <Route path="/admin/subcategories" element={<ProtectedAdmin><AdminSubcategories /></ProtectedAdmin>} />
          <Route path="/admin/term-and-condition" element={<ProtectedAdmin><TermsCondition /></ProtectedAdmin>} />
          <Route path="/admin/analytics" element={<ProtectedAdmin><Analytics /></ProtectedAdmin>} />
        </Route>

      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}


// jaise transport mai VEHICE SHOW ROOMS & SERVICE CENTERS isme fir car and motor select kr lia  categories ko fir inme is cat wise jsine kia hai data store uski list dikhni hai partners ki ek page pai vo kaise hoga 

{/* <Route path="/categories/:parentSlug/:slug?" element={<AllCategories />} /> y shi is trh s hi hoga pr iske bd sub cat chosse krke usko us sub cat p clik krke us sub cat mai register logo ka dta dikhega aisa krna hain or us list mai s ksisi bhi user p clik p uska deayti page y pura flow hai  */ }