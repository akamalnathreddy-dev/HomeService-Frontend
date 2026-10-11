import {createContext,useContext,useState} from 'react'; import api from '../services/api';
const C=createContext(null); export const useAuth=()=>useContext(C);
export function AuthProvider({children}){const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('homeease_user'))}catch{return null}});
const login=async(email,password)=>{const {data}=await api.post('/auth/login',{email,password});localStorage.setItem('homeease_token',data.token);localStorage.setItem('homeease_user',JSON.stringify(data.user));setUser(data.user);return data.user};
const register=async(form)=>{const {data}=await api.post('/auth/register',form);localStorage.setItem('homeease_token',data.token);localStorage.setItem('homeease_user',JSON.stringify(data.user));setUser(data.user);return data.user};
const logout=()=>{localStorage.removeItem('homeease_token');localStorage.removeItem('homeease_user');setUser(null)};
return <C.Provider value={{user,login,register,logout}}>{children}</C.Provider>}
