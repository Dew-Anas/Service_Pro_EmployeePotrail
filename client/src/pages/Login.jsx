import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiTool,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();
const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return setError("Enter a valid email address");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    
   try {
  await login(form.email, form.password);
  navigate("/", { replace: true });
} catch (err) {
  setError(
    err.response?.data?.message ||
      (err.request ? "Cannot reach the server" : err.message)
  );
} finally {
  setLoading(false);
}
  };

if (user) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-ink">
      <section className="relative overflow-hidden px-6 pb-16 pt-14 text-white">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/40 blur-3xl" />
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand">
            <FiTool className="text-2xl" />
          </div>
          <h1 className="mt-6 text-3xl font-bold leading-tight">
            Ready for
            <br />
            today's jobs?
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to the ServicePro field crew portal.
          </p>
        </div>
      </section>

      <section className="-mt-6 flex-1 rounded-t-[2rem] bg-surface px-6 pt-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Email</span>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
              <FiMail className="text-lg text-slate-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                autoComplete="email"
                className="w-full bg-transparent outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Password</span>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
              <FiLock className="text-lg text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full bg-transparent outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="text-lg text-slate-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>

          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              <FiAlertCircle className="shrink-0 text-lg" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand py-4 font-semibold text-white transition active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                Sign in <FiArrowRight className="text-lg" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 pb-8 text-center text-sm text-slate-500">
          Trouble signing in? Contact your manager.
        </p>
      </section>
    </div>
  );
}