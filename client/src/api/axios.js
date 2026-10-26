
import axios from "axios";

const api = axios.create({baseURL:import.meta.env.VITE_API_URL});

api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("sp_token");
    if(token) config.headers.Authorization = `Beare ${token}`;
    return config;
});


api.interceptors.response.use(
    (res) => res,
    (err)=>{
        const isLogin =err.config?.url?.includes("/auth/login");
        if(err.response?.status === 401 && !isLogin){
            localStorage.removeItem("sp_token");
            localStorage.removeItem("sp_user");
            window.location.href="/login";
        }
        return Promise.reject(err);
    }
);

export default api;