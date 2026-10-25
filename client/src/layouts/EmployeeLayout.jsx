import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function EmployeeLayout() {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-surface md:border-x md:border-slate-200">
      <main className="px-5 pb-28 pt-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}