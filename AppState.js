
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import  axios from "./app/config/axiosconfigClient"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Roles, setRoles] = useState([null]);
  function HaveRole(RequiredRoles) {
    for (const value of Roles) {
      if (RequiredRoles.includes(value)) {
        return true; // Found a duplicate value
      }
    }
    return false; // No duplicate values found
  }
  useEffect(() => {

    const TestAut = async () => {
      try {
        console.log("auth Context")

        const response = await axios.get('/api/auth/myroles');
        setRoles(response.data);
        
      } catch (error) {
        setRoles(["UnAuthorized"]);
        console.log("UnAuthorized");
      }
    };
    TestAut(); 
  }, []); 

  return (
    <AuthContext.Provider value={{ Roles ,HaveRole ,setRoles}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
 