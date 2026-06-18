// Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import { useTranslation } from 'react-i18next';

// export function Login() {
//   const { login } = useAuth()
//   const navigate = useNavigate()
//   const [form, setForm] = useState({ login: '', password: '' })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await login(form.login, form.password);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-6 col-lg-5">
//             <div className="card auth-card p-4">
//               <div className="text-center mb-4">
//                 <img src="https://citywala.com/assets/images/city-wala-logo.png" alt="CityWala" style={{ height: 50 }} />
//                 <h4 className="mt-3 fw-bold">Customer Login</h4>
//               </div>
//               {error && <div className="alert alert-danger py-2">{error}</div>}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-floating mb-3">
//                   <input type="text" className="form-control" id="login" placeholder="Email or Phone"
//                     value={form.login} onChange={e => setForm({ ...form, login: e.target.value })} required />
//                   <label>Email or Phone</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input type="password" className="form-control" id="password" placeholder="Password"
//                     value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
//                   <label>Password</label>
//                 </div>
//                 <div className="text-end mb-3">
//                   <Link to="/forgot-password" style={{ fontSize: 13, color: '#1075be' }}>Forgot password?</Link>
//                 </div>
//                 <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
//                   {loading ? 'Logging in...' : 'Login Now'}
//                 </button>
//               </form>
//               <hr className="my-4" />
//               <div className="text-center" style={{ fontSize: 14 }}>
//                 New here? <Link to="/register" style={{ color: '#1075be' }}>Create Account</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export function Register() {
//   const { register } = useAuth()
//   const navigate = useNavigate()
//   const [form, setForm] = useState({ name: '', email: '', mobile: '', coun , password: '', password_confirmation: ''  })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault(); setErrors({}); setLoading(true)
//     if (form.password !== form.password_confirmation) {
//       setErrors({ password_confirmation: 'Passwords do not match' }); setLoading(false); return
//     }
//     try {
//       await register({ name: form.name, email: form.email, mobile: form.mobile, password: form.password })
//       // navigate('/account/dashboard')
//       navigate('/')
//     } catch (err) {
//       setErrors({ general: err.response?.data?.message || 'Registration failed' })
//     } finally { setLoading(false) }
//   }

//   const f = (field) => ({
//     value: form[field],
//     onChange: e => setForm({ ...form, [field]: e.target.value }),
//     className: `form-control ${errors[field] ? 'is-invalid' : ''}`
//   })

//   return (
//     <div className="auth-wrapper">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-7 col-lg-5">
//             <div className="card auth-card p-4">
//               <div className="text-center mb-4">
//                 <img src="https://citywala.com/assets/images/city-wala-logo.png" alt="CityWala" style={{ height: 50 }} />
//                 <h4 className="mt-3 fw-bold">Create Account</h4>
//               </div>
//               {errors.general && <div className="alert alert-danger py-2">{errors.general}</div>}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-floating mb-3">
//                   <input type="text" {...f('name')} id="name" placeholder="Full Name" required />
//                   <label>Full Name</label>
//                   {errors.name && <div className="invalid-feedback">{errors.name}</div>}
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input type="email" {...f('email')} id="email" placeholder="Email" />
//                   <label>Email</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input type="text" {...f('mobile')} id="mobile" placeholder="Mobile" />
//                   <label>Mobile Number</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input type="password" {...f('password')} id="password" placeholder="Password" required />
//                   <label>Password</label>
//                 </div>
//                 <div className="form-floating mb-4">
//                   <input type="password" {...f('password_confirmation')} id="confirm" placeholder="Confirm" required />
//                   <label>Confirm Password</label>
//                   {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
//                 </div>
//                 <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
//                   {loading ? 'Registering...' : 'Register Now'}
//                 </button>
//               </form>
//               <hr className="my-3" />
//               <div className="text-center" style={{ fontSize: 14 }}>
//                 Already have account? <Link to="/login" style={{ color: '#1075be' }}>Login</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export function ForgotPassword() {
//   const {forgotPassword} = useAuth();
//   const [email, setEmail] = useState('')
//   const [sent, setSent] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await forgotPassword(email);
//       setSent(true);
//     } catch (err) {
//       console.log(err);
//       alert("Error sending reset link");
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-5">
//             <div className="card auth-card p-4 text-center">
//               <i className="fa-solid fa-lock fa-3x mb-3" style={{ color: '#1075be' }}></i>
//               <h4 className="fw-bold mb-1">Forgot Password?</h4>
//               <p className="text-muted mb-4" style={{ fontSize: 14 }}>Enter your email to reset password</p>
//               {sent ? (
//                 <div className="alert alert-success">Reset link sent! Check your email.</div>
//               ) : (
//                 <form onSubmit={handleSubmit}>
//                   <input type="email" className="form-control mb-3" placeholder="Enter your email"
//                     value={email} onChange={e => setEmail(e.target.value)} required />
//                   <button className="btn btn-primary w-100">Send Reset Link</button>
//                 </form>
//               )}
//               <div className="mt-3">
//                 <Link to="/login" style={{ color: '#1075be', fontSize: 14 }}>← Back to Login</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// export function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [inputValue, setInputValue] = useState(''); // Raw input (email or phone)
//   const [isMobile, setIsMobile] = useState(false);  // Toggle state
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Input change handle karne ka logic
//   const handleInputChange = (val) => {
//     setInputValue(val);

//     // Agar pehla character number hai, to mobile mode on kar do
//     // Input agar khali hai to wapas default (email) mode par le jao
//     if (val.length > 0) {
//       const firstChar = val.charAt(0);
//       if (/^\d+$/.test(firstChar) || firstChar === '+') {
//         setIsMobile(true);
//       } else {
//         setIsMobile(false);
//       }
//     } else {
//       setIsMobile(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // PhoneInput se value bina '+' ke bhi aa sakti hai, 
//       // isliye safe side ke liye check kar lete hain
//       const finalLogin = isMobile && !inputValue.startsWith('+')
//         ? `+${inputValue}`
//         : inputValue;

//       await login(finalLogin, password);
//       console.log("LOGIN INPUT:", login);
//       console.log("PASSWORD:", password);
//       console.log("USER FOUND:", user);
//       navigate('/');
//     } catch (err) {
//       setError('Invalid Email/Phone or Password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-5">
//             <div className="card auth-card p-4 shadow-sm border-0">
//               <div className="text-center mb-4">
//                 <h4 className="fw-bold">Login to CityWala</h4>
//                 <p className="text-muted small">Enter email or mobile number to continue</p>
//               </div>

//               {error && <div className="alert alert-danger py-2">{error}</div>}

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3 position-relative">
//                   {/* AGAR MOBILE HAI TO PHONE INPUT DIKHAO */}
//                   {isMobile ? (
//                     <div className="phone-input-container">
//                       <label className="small text-primary fw-bold">Mobile Mode Detected</label>
//                       <PhoneInput
//                         country={'in'}
//                         value={inputValue}
//                         onChange={(phone) => setInputValue(phone)}
//                         inputStyle={{ width: '100%', height: '55px' }}
//                         autoFocus // Taaki cursor jump na kare
//                       />
//                       <button
//                         type="button"
//                         className="btn btn-link btn-sm p-0 mt-1 text-decoration-none"
//                         onClick={() => { setIsMobile(false); setInputValue(''); }}
//                       >
//                         Switch to Email
//                       </button>
//                     </div>
//                   ) : (
//                     /* AGAR STRING HAI TO NORMAL INPUT DIKHAO */
//                     <div className="form-floating">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Email or Phone"
//                         value={inputValue}
//                         onChange={(e) => handleInputChange(e.target.value)}
//                         required
//                       />
//                       <label>Email or Mobile</label>
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-floating mb-3 z-1">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <label>Password</label>
//                 </div>
//                 <div className="text-end mb-3">
//                   <Link to="/forgot-password" style={{ fontSize: 13, color: '#1075be' }}>Forgot password?</Link>
//                 </div>
//                 <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
//                   {loading ? 'Logging in...' : 'Login Now'}
//                 </button>
//               </form>
//               <hr className="my-4" />
//               <div className="text-center" style={{ fontSize: 14 }}>
//                 New here? <Link to="/register" style={{ color: '#1075be' }}>Create Account</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   // 1. Form state: Mobile field ko handle karne ke liye
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     country_code: '91', // Default India
//     password: '',
//     password_confirmation: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setLoading(true);

//     if (form.password !== form.password_confirmation) {
//       setErrors({ password_confirmation: 'Passwords do not match' });
//       setLoading(false);
//       return;
//     }

//     try {
//       // 2. Yahan mobile number full format mein jayega (e.g., 919876543210)
//       await register({
//         name: form.name,
//         email: form.email,
//         mobile: form.mobile,
//         password: form.password,
//         country_code: `+${form.country_code}`, // Backend requirement
//       });
//       navigate('/');
//     } catch (err) {
//       setErrors({ general: err.response?.data?.message || 'Registration failed' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function for normal inputs
//   const f = (field) => ({
//     value: form[field],
//     onChange: e => setForm({ ...form, [field]: e.target.value }),
//     className: `form-control ${errors[field] ? 'is-invalid' : ''}`
//   });

//   return (
//     <div className="auth-wrapper">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-7 col-lg-5">
//             <div className="card auth-card p-4">
//               <div className="text-center mb-4">
//                 <img src="https://citywala.com/assets/images/city-wala-logo.png" alt="CityWala" style={{ height: 50 }} />
//                 <h4 className="mt-3 fw-bold">Create Account</h4>
//               </div>

//               {errors.general && <div className="alert alert-danger py-2">{errors.general}</div>}

//               <form onSubmit={handleSubmit}>
//                 {/* Full Name */}
//                 <div className="form-floating mb-3">
//                   <input type="text" {...f('name')} id="name" placeholder="Full Name" required />
//                   <label>Full Name</label>
//                   {errors.name && <div className="invalid-feedback">{errors.name}</div>}
//                 </div>

//                 {/* Email */}
//                 <div className="form-floating mb-3">
//                   <input type="email" {...f('email')} id="email" placeholder="Email" required />
//                   <label>Email Address</label>
//                 </div>

//                 {/* 3. Phone Input (Label ko upar rakha hai adjust karne ke liye) */}
//                 <div className="mb-3 text-start">
//                   <label className="text-muted small mb-1">Mobile Number</label>
//                   <PhoneInput
//                     country={'in'}
//                     value={form.country_code + form.mobile} // Dono ko mila ke dikhao
//                     onChange={(value, country) => {
//                       // value = poora number (e.g. 919876543210)
//                       // country.dialCode = sirf code (e.g. 91)

//                       const actualMobile = value.slice(country.dialCode.length); // Sirf number bachega

//                       setForm({
//                         ...form,
//                         country_code: country.dialCode,
//                         mobile: actualMobile
//                       });
//                     }}
//                     inputStyle={{ width: '100%', height: '58px' }}
//                     containerClass="mb-3"
//                     placeholder="Enter mobile number"
//                   />
//                   {errors.mobile && <div className="text-danger small">{errors.mobile}</div>}
//                 </div>

//                 {/* Password */}
//                 <div className="form-floating mb-3 z-1">
//                   <input type="password" {...f('password')} id="password" placeholder="Password" required />
//                   <label>Password</label>
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="form-floating mb-4 z-1">
//                   <input type="password" {...f('password_confirmation')} id="confirm" placeholder="Confirm" required />
//                   <label>Confirm Password</label>
//                   {errors.password_confirmation && <div className="text-danger small mt-1">{errors.password_confirmation}</div>}
//                 </div>

//                 <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
//                   {loading ? 'Registering...' : 'Register Now'}
//                 </button>
//               </form>

//               <hr className="my-3" />
//               <div className="text-center" style={{ fontSize: 14 }}>
//                 Already have account? <Link to="/login" style={{ color: '#1075be' }}>Login</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 
// export function ForgotPassword() {
//   const { forgotPassword } = useAuth();

//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [sent, setSent] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await forgotPassword(emailOrPhone);
//       setSent(true);
//     } catch (err) {
//       console.log(err);
//       alert("Error sending reset link / OTP");
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-5">
//             <div className="card auth-card p-4 text-center">

//               <i className="fa-solid fa-lock fa-3x mb-3" style={{ color: "#1075be" }}></i>

//               <h4 className="fw-bold mb-1">Forgot Password?</h4>

//               <p className="text-muted mb-4" style={{ fontSize: 14 }}>
//                 Enter Email or Mobile Number
//               </p>

//               {sent ? (
//                 <div className="alert alert-success">
//                   Reset link / OTP sent successfully.
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit}>
//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="Enter email or mobile"
//                     value={emailOrPhone}
//                     onChange={(e) => setEmailOrPhone(e.target.value)}
//                     required
//                   />

//                   <button className="btn btn-primary w-100">
//                     Continue
//                   </button>
//                 </form>
//               )}

//               <div className="mt-3">
//                 <Link to="/login" style={{ color: "#1075be", fontSize: 14 }}>
//                   ← Back to Login
//                 </Link>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('email');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   let finalLogin = loginValue;

  //   if (mode === 'phone' && !loginValue.startsWith('+')) {
  //     finalLogin = '+' + loginValue;
  //   }

  //   await login(finalLogin, password);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await login(loginValue, password);
    
  //   setLoading(true);
  //   setError('');

  //   try {
  //     let finalLogin = loginValue.trim();

  //     if (mode === 'phone' && !finalLogin.startsWith('+')) {
  //       finalLogin = '+' + finalLogin;
  //     }

  //     await login(finalLogin, password);

  //     navigate('/'); 
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   setLoading(true);
//   setError("");

//   try {
//     let finalLogin = loginValue.trim();

//     if (mode === "phone" && !finalLogin.startsWith("+")) {
//       finalLogin = "+" + finalLogin;
//     }

//     const res = await login(finalLogin, password);

//     if (res.role === "partner") {
//       navigate("/partner/dashboard");
//     } else {
//       navigate("/");
//     }

//   } catch (err) {
//      alert(err.message);
//     setError(
//       err.response?.data?.message || "Login failed"
//     );
//   } finally {
//     setLoading(false);
//   }
// }; 

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    let finalLogin = loginValue.trim();

    if (mode === "phone" && !finalLogin.startsWith("+")) {
      finalLogin = "+" + finalLogin;
    }

    const res = await login(finalLogin, password);

    // partner check
    if (res.role === "partner") {

    
      navigate("/partner/dashboard");

    } else {
      navigate("/");
    }
    
    // if (res.role === "partner") {

    
    //   navigate("/partner/dashboard");

    // } else {
    //   navigate("/");
    // }

  } catch (err) {

  alert(
    err.response?.data?.message ||
    "Your profile is not approved yet"
  );

  setError(
    err.response?.data?.message || "Login failed"
  );
}finally {
    setLoading(false);
  }
};

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     await login(form.login, form.password);
  //     navigate('/');
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card p-4">

              <h4 className="text-center mb-1">{t('login.title')}</h4>
              <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>Customer Login</p>

              <div className="d-flex gap-2 mb-3">
                <button
                  type="button"
                  className={`btn w-50 ${mode === 'email' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setMode('email')}
                >
                  {t('login.email')}
                </button>

                <button
                  type="button"
                  className={`btn w-50 ${mode === 'phone' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setMode('phone')}
                >
                  {t('login.phone')}
                </button>
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleSubmit}>

                {/* PHONE WITH FLAG */}
                {/* <div className="mb-3">
                  <label className="form-label">Phone (with country code)</label>
                  <PhoneInput
                    country={'in'}
                    value={loginValue}
                    onChange={(val) => setLoginValue('+' + val)}
                  />
                </div>

                <div className="text-center my-2">OR</div>

               
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setLoginValue(e.target.value)}
                  />
                  <label>Email</label>
                </div> */}

                {mode === 'email' && (
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={t('login.email_label')}
                      value={loginValue}
                      onChange={(e) => setLoginValue(e.target.value)}
                    />
                    <label>{t('login.email_label')}</label>
                  </div>
                )}

                {mode === 'phone' && (
                  <div className="mb-3">
                    <PhoneInput
                      country={'in'}
                      value={loginValue}
                      // onChange={(val) => setLoginValue('+' + val)}
                      onChange={(val) => setLoginValue(val)}
                      inputStyle={{ width: '100%', height: '55px' }}
                    />
                  </div>
                )}

                <div className="form-floating mb-3 z-1">
                  <input
                    type="password"
                    className="form-control"
                    placeholder={t('login.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label>{t('login.password')}</label>
                </div>

                <div className="text-end mb-3">
                  <Link to="/forgot-password" style={{ fontSize: 13, color: '#1075be' }}>{t('login.forgot_password')}</Link>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
                  {loading ? t('login.logging_in') : t('login.login_btn')}
                </button>
              </form>
              <hr className="my-4" />
              <div className="text-center" style={{ fontSize: 14 }}>
                {t('login.new_here')} <Link to="/register" style={{ color: '#1075be' }}>{t('login.create_account')}</Link>
              </div>
              <div className="text-center mt-3" style={{ fontSize: 13 }}>
                <span className="text-muted">Are you a partner? </span>
                <Link to="/partner/login" style={{ color: '#1075be', fontWeight: '500' }}>Partner Login</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    country_code: '91',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (form.password !== form.password_confirmation) {
      setErrors({ password_confirmation: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      // BACKEND REQUIREMENT: Hum 'mobile' aur 'country_code' dono bhej rahe hain
      await register({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        country_code: `+${form.country_code}`, // Yahan '+' add karke bhej rahe hain
        password: form.password
      });
      navigate('/');
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container py-5">
        <div className="card auth-card p-4 mx-auto" style={{ maxWidth: '500px' }}>
          <h4 className="text-center fw-bold mb-1">{t('register.title')}</h4>
          <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>Customer Registration</p>

          {errors.general && <div className="alert alert-danger">{errors.general}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" placeholder={t('register.full_name')} required
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <label>{t('register.full_name')}</label>
            </div>

            <div className="form-floating mb-3">
              <input type="email" className="form-control" placeholder={t('register.email')} required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <label>{t('register.email')}</label>
            </div>

            <div className="mb-3">
              <label className="small text-muted mb-1">{t('register.mobile')}</label>
              <PhoneInput
                country={'in'}
                // Dono ko mila kar dikhayega
                value={form.country_code + form.mobile}
                // data se hum code aur number alag karenge
                onChange={(value, data) => {
                  const code = data.dialCode; // e.g. "91"
                  const number = value.slice(data.dialCode.length); // e.g. "9876543210"

                  setForm({
                    ...form,
                    country_code: code,
                    mobile: number
                  });
                }}
                inputStyle={{ width: '100%', height: '58px' }}
              />
              {errors.mobile && <div className="text-danger small">{errors.mobile}</div>}
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" placeholder={t('register.password')} required
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              <label>{t('register.password')}</label>
            </div>

            <div className="form-floating mb-4">
              <input type="password" className="form-control" placeholder={t('register.confirm_password')} required
                value={form.password_confirmation} onChange={e => setForm({ ...form, password_confirmation: e.target.value })} />
              <label>{t('register.confirm_password')}</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
              {loading ? t('register.registering') : t('register.register_btn')}
            </button>
          </form>
          <hr className="my-3" />
          <div className="text-center" style={{ fontSize: 14 }}>
            {t('register.have_account')} <Link to="/login" style={{ color: '#1075be' }}>{t('register.login')}</Link>
          </div>
          <div className="text-center mt-3" style={{ fontSize: 13 }}>
            <span className="text-muted">Want to register a business? </span>
            <Link to="/register-business" style={{ color: '#1075be', fontWeight: '500' }}>Register as Partner</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- DETECTION LOGIC ---
  const handleInputChange = (val) => {
    setInputValue(val);

    if (val.length > 0) {
      const firstChar = val.charAt(0);
      // Agar pehla character number (0-9) ya '+' hai, toh Mobile Input dikhao
      if (/^\d+$/.test(firstChar) || firstChar === '+') {
        setIsMobile(true);

      } else {
        setIsMobile(false);
      }
    } else {
      setIsMobile(false); // Khali hone par wapas normal input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const finalValue = isMobile && !inputValue.startsWith('+')
        ? `+${inputValue}`
        : inputValue;

      await forgotPassword(finalValue);
      setSent(true);
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <div className="card auth-card p-4 text-center border-0 shadow">

              <i
                className="fa-solid fa-lock fa-3x mb-3"
                style={{ color: "#1075be" }}
              ></i>

              <h4 className="fw-bold mb-1">{t('forgot.title')}</h4>

              <p className="text-muted mb-4" style={{ fontSize: 14 }}>
                {t('forgot.subtitle')}
              </p>

              {sent ? (
                <div className="alert alert-success">
                  {t('forgot.reset_sent')} <b>{inputValue}</b>

                  {isMobile && (
                    <div className="mt-2">
                      <Link
                        to="/verify-otp"
                        state={{ phone: inputValue }}
                        className="btn btn-sm btn-outline-success"
                      >
                        {t('forgot.enter_otp')}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 text-start">
                    {isMobile ? (
                      <div>
                        <label className="small fw-bold text-primary mb-1">
                          {t('forgot.mobile_mode')}
                        </label>

                        <PhoneInput
                          country={"in"}
                          value={inputValue}
                          onChange={(phone) => setInputValue(phone)}
                          inputStyle={{
                            width: "100%",
                            height: "45px",
                          }}
                          autoFocus
                        />

                        <button
                          type="button"
                          className="btn btn-link btn-sm p-0 mt-1 text-decoration-none"
                          onClick={() => {
                            setIsMobile(false);
                            setInputValue("");
                          }}
                        >
                          {t('forgot.use_email')}
                        </button>
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        style={{ height: "45px" }}
                        placeholder={t('forgot.placeholder')}
                        value={inputValue}
                        onChange={(e) =>
                          handleInputChange(e.target.value)
                        }
                        required
                      />
                    )}
                  </div>

                  <button
                    className="btn btn-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? t('forgot.sending') : t('forgot.continue')}
                  </button>
                </form>
              )}

              <div className="mt-3">
                <Link
                  to="/login"
                  style={{
                    color: "#1075be",
                    fontSize: 14,
                  }}
                >
                  {t('forgot.back_login')}
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Login
