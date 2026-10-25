
import {NavLink} from "react-router-dom";
import { FiHome, FiBriefcase, FiClock, FiUser } from "react-icons/fi";


const tabs =[
    {to:"/" ,label:"Home",icon:FiHome },
    {to:"/jobs",label:"Jobs",icon:FiBriefcase},
    { to: "/attendance", label: "Attendance", icon: FiClock },
     { to: "/profile", label: "Profile", icon: FiUser },
];

export default function BottomNav(){
    return(
        <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <ul className="flex items-center justify-between rounded-3xl bg-ink/95 p-2 shadow-xl shadow-ink/20 backdrop-blur">

            {tabs.map(({to,label,icon:Icon}) =>(
                <li  key={to}>
                    <NavLink
                    to={to}
                    end={to ==="/"}
                    arial-label={label}
                    className={({ isActive }) =>
                        `flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive ? "bg-brand text-white" : "text-slate-400"
                }`
                }
                >
                    {({ isActive }) => (
                        <>
                  <Icon className="text-xl" />
                  {isActive && <span>{label}</span>}
                </>
                )}

                    </NavLink>

                </li>
            ))}

            </ul>

        </nav>
    )
}