import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import API from "../api/axios";

export function ResetPassword() {
  const { t } = useTranslation();
  const { token } = useParams(); // email flow
  const location = useLocation(); // phone flow
  const navigate = useNavigate();

  const resetToken = location.state?.resetToken;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isOtpFlow = !token && !!resetToken;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    setLoading(true);
    setMessage("");

    try {
      if (token) {
        // Email reset link flow
        await API.post(
          `/auth/reset-password/${token}`,
          { password }
        );
      } else if (isOtpFlow) {
        // Phone OTP flow
        await API.post(
          `/auth/reset-password-otp`,
          {
            resetToken,
            password,
          }
        );
      } else {
        throw new Error("Invalid reset request");
      }

      setMessage(
        "Password updated successfully"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.message ||
        "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <div className="card p-4 text-center shadow border-0">

              <h4 className="fw-bold mb-2">{t("auth.reset_password")}</h4>

              <p className="text-muted mb-3">
                {token
                  ? t("auth.reset_using_email")
                  : t("auth.reset_using_phone")}
              </p>

              {message && (
                <div className="alert alert-info">
                 {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder={t("auth.new_password")}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder={t("auth.confirm_password")}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <button
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading
                    ? t("auth.updating")
                    : t("auth.update_password")}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}