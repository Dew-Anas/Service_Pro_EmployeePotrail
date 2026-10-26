import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <>
      <PageHeader eyebrow="Account" title="My Profile" />
      <p className="font-semibold">{user?.name}</p>
      <p className="text-sm text-slate-500">{user?.email}</p>
      <button
        onClick={logout}
        className="mt-6 rounded-2xl bg-ink px-5 py-3 font-semibold text-white"
      >
        Logout
      </button>
    </>
  );
}