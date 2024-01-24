
'use client'

import React, {createContext, useContext, useState, useEffect, useMemo} from 'react';
import  axiosNextApi from "./app/config/clientaxaios";
import axiosMain from "axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [Roles, setRoles] = useState([null]);
  const [jwt,setJwt] = useState(null);

  function HaveRole(RequiredRoles) {
    for (const value of Roles) {
      if (RequiredRoles.includes(value)) {
        return true; // Found a duplicate value
      }
    }
    return false; // No duplicate values found
  }

  const axios = useMemo(() => {
    return axiosMain.create({
      baseURL: "https://api.tass.ist",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `bearer ${jwt}`,
      },
    });
  }, [jwt]);


  useEffect(() => {
    const GetJWt = async () => {
      try {
        let res = await axiosNextApi.get("/api/jwt/");
        setJwt(res.data.token);
      } catch (e) {
        setJwt("");
      }
    };




    GetJWt();


  }, []);


  useEffect ( () => {
    const TestAut = async () => {
      if(jwt == null ) return ;
      try {
        const response = await axios.get('/api/auth/myRoles');
        setRoles(response.data);
      } catch (error) {
        setRoles(["UnAuthorized"]);
        console.log("UnAuthorized");
      }
    };
    TestAut();
  }, [jwt] );

  return (
    <AuthContext.Provider value={{ Roles ,HaveRole ,axios}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
 