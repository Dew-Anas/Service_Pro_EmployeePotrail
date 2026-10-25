import { Routes, Route } from "react-router-dom";
import EmployeeLayout from "./layouts/EmployeeLayout";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route element={<EmployeeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/profile" element={<Profile 
        />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}