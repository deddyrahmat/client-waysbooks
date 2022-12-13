import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';

// state global
import { authStore } from "store/authSlice";

const ProtectedRoute = ({ children }) => {
    const { loading, statusAuth } = useSelector((state) => state.authReducer);

  
  if(!statusAuth){
    return <Navigate to={'/'} />;
  }
  
  return loading ? <div className="flex items-center justify-center absolute top-[50%] w-full z-10 space-x-2 animate-pulse"><div className="w-4 h-4 bg-red-600 rounded-full"></div><div className="w-4 h-4 bg-red-600 rounded-full"></div><div className="w-4 h-4 bg-red-600 rounded-full"></div></div> : children;
};

export default ProtectedRoute;