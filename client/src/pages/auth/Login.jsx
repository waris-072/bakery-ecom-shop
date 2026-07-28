import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./Auth.css";

import useAuth from "../../hooks/useAuth";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/validators";
import Loader from "../../components/loader/Loader";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
      isValid,
    },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (formData) => {
    try {
      setServerError("");

      const data = await login(formData);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    }
  };

  if (isSubmitting) {
    return <Loader message="Signing you in..." />
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to continue shopping.
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >

          {/* Email */}

          <div className="form-group">
            <input
              className={
                errors.email
                  ? "input-error"
                  : watch("email")
                  ? "input-success"
                  : ""
              }
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Enter a valid email",
                },
              })}
            />

            {errors.email && (
              <small className="error">
                {errors.email.message}
              </small>
            )}

          </div>

          {/* Password */}

          <div className="form-group">
            <div className="password-input">

              <input
                className={
                  errors.password
                    ? "input-error"
                    : watch("password")
                    ? "input-success"
                    : ""
                }
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: PASSWORD_REGEX,
                    message: "Enter a valid email",
                  },
                })}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            {errors.password && (
              <small className="error">
                {errors.password.message}
              </small>
            )}

          </div>

          {serverError && (
            <div className="server-error">
              {serverError}
            </div>
          )}

          <button
            className="auth-btn"
            disabled={!isValid || isSubmitting}
          >
          Login
          </button>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;