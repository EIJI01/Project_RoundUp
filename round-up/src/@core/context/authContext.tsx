import React, { createContext, useEffect, useState } from "react";
import {
  AuthValuesType,
  AuthContextProps,
} from "@/model/context/authentication/authentication";
import { useRouter } from "next/router";
import { loginFetcher } from "@/fetcher/api/authenticationAPI/authenticationAPI";
import { loginValueType } from "@/model/context/authentication/authentication";
// import { userType } from "@/model/context/authentication/authentication";

const defaultProvider: AuthValuesType = {
  // user: null,
  token: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: AuthContextProps) => {
  // const [user, setUser] = useState(defaultProvider.user);
  const [token, setToken] = useState(defaultProvider.token);

  const router = useRouter();

  //   const initAuth = async () => {
  //     const storedToken = window.localStorage.getItem("token");

  //     if (storedToken) {
  //       const token = storedToken.replace(/"/g, "");
  //       setToken(token);
  //     }
  //   };

  //   useEffect(() => {
  //     initAuth();
  //   }, []);

  const handleLogin = async (
    url: string,
    { email, password }: loginValueType
  ) => {
    const responseData = await loginFetcher(url, { email, password });
    // console.log(responseData);
    // console.log(responseData.user.uid);
    // console.log(responseData.user.email);
    // const userData: userType = {
    //   uid: responseData.user.uid,
    //   email: responseData.user.email,
    // };
    // setUser(userData);
    localStorage.setItem("token", responseData.token);
    setToken(responseData.token);
    router.push("feed");
  };

  const handleLogout = () => {
    // setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    router.push(".");
  };

  const authProviderValues: AuthValuesType = {
    // user: user,
    token: token,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authProviderValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
