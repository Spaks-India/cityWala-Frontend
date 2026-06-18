import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../assets/headerLogo.png'

export function AuthSelection() {
  const navigate = useNavigate()
  const { user, partner } = useAuth()

  // If already logged in, redirect based on role
  if (user) navigate('/account/dashboard', { replace: true })
  if (partner) navigate('/partner/dashboard', { replace: true })

  return (
    <div className="auth-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg p-5" style={{ borderRadius: '16px' }}>
              {/* Logo */}
              <div className="text-center mb-4">
                <img src={Logo} alt="CityWala" style={{ height: 60 }} />
              </div>

              {/* Heading */}
              <h3 className="text-center fw-bold mb-2">Welcome to CityWala</h3>
              <p className="text-center text-muted mb-5">Choose how you'd like to continue</p>

              {/* Role Selection Buttons */}
              <div className="row g-3">
                {/* Customer Option */}
                <div className="col-md-6">
                  <button
                    onClick={() => navigate('/login')}
                    className="btn btn-outline-primary w-100 h-100 p-4 d-flex flex-column align-items-center gap-3"
                    style={{ minHeight: '220px', borderRadius: '12px', border: '2px solid', transition: 'all 0.3s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.remove('btn-outline-primary')
                      e.currentTarget.classList.add('btn-primary')
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(16, 117, 190, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.remove('btn-primary')
                      e.currentTarget.classList.add('btn-outline-primary')
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <i className="fa-solid fa-user fa-2x" style={{ color: '#1075be' }}></i>
                    <div>
                      <h5 className="fw-bold mb-1">Customer Login</h5>
                      <small className="text-muted">Find services & connect with partners</small>
                    </div>
                  </button>
                </div>

                {/* Partner Option */}
                <div className="col-md-6">
                  <button
                    onClick={() => navigate('/partner/login')}
                    className="btn btn-outline-success w-100 h-100 p-4 d-flex flex-column align-items-center gap-3"
                    style={{ minHeight: '220px', borderRadius: '12px', border: '2px solid', transition: 'all 0.3s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.remove('btn-outline-success')
                      e.currentTarget.classList.add('btn-success')
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.remove('btn-success')
                      e.currentTarget.classList.add('btn-outline-success')
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <i className="fa-solid fa-briefcase fa-2x" style={{ color: '#10b981' }}></i>
                    <div>
                      <h5 className="fw-bold mb-1">Partner Login</h5>
                      <small className="text-muted">Manage your business & reach customers</small>
                    </div>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 text-center">
                <span className="text-muted" style={{ fontSize: '14px' }}>Don't have an account?</span>
              </div>

              {/* Registration Links */}
              <div className="row g-3">
                <div className="col-md-6">
                  <button
                    onClick={() => navigate('/register')}
                    className="btn btn-light w-100"
                    style={{ border: '1px solid #ddd', borderRadius: '8px' }}
                  >
                    Create Customer Account
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    onClick={() => navigate('/register-business')}
                    className="btn btn-light w-100"
                    style={{ border: '1px solid #ddd', borderRadius: '8px' }}
                  >
                    Register as Partner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthSelection
