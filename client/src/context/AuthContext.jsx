
import { createContext, useContext, useState } from "react";

import api from "../api/axios";

const AuthContext = createContext(null);


const readUser =()=>{
    try{
        return JSON.parse(localStorage.getItem("sp_user"));
    } catch {
        return null;
    }
};

export function AuthProvider ({children}){
    const[user, setUser] = useState(readUser);

    const login = async(email, password)=>{
        const{data} = await api.post("/auth/login",{email,password});

        if(data.user.role !=="employee"){
            throw new Error("This portal is for field employees only");
        }

        localStorage.setItem("sp_token",data.token);
        localStorage.setItem("sp_user",JSON.stringify(data.user));
        setUser(data.user);
    };

    const logout =()=>{
        localStorage.removeItem("sp_token");
        localStorage.removeItem("sp_user");
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}

        </AuthContext.Provider>
    );
}

export const useAuth =()=> useContext(AuthContext);