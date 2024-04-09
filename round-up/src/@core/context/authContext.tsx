import React, { createContext, useEffect, useState } from "react";
import {
  AuthValuesType,
  AuthContextProps,
} from "@/model/authenticationModel/authenticationModel";
import { useRouter } from "next/router";
import { loginFetcher } from "@/fetcher/api/authenticationAPI/authenticationAPI";
import { loginValueType } from "@/model/authenticationModel/authenticationModel";
import { userType } from "@/model/authenticationModel/authenticationModel";
import { GET_USER_INFORMATION } from "@/fetcher/endpoint/authenticationEP/authenticationEP";
import { userInformationFetcher } from "@/fetcher/api/authenticationAPI/authenticationAPI";

const defaultProvider: AuthValuesType = {
  user: null,
  token: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState(defaultProvider.user);
  const [token, setToken] = useState(defaultProvider.token);

  const router = useRouter();

  let localToken =
    typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

  useEffect(() => {
    if (localToken) {
      localStorage.setItem("token", localToken);
      handleFetchUserInformation(localToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localToken]);

  const handleLogin = async (
    url: string,
    { email, password }: loginValueType
  ) => {
    const responseToken: string = await loginFetcher(url, { email, password });

    if (responseToken) {
      localStorage.setItem("token", responseToken);
      setToken(responseToken);
      handleFetchUserInformation(responseToken);
      router.push("event");
    }
  };

  const handleFetchUserInformation = async (token: string) => {
    const userInformation: userType = await userInformationFetcher(
      GET_USER_INFORMATION,
      token
    );
    if (userInformation) {
      setUser(userInformation);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    router.push(".");
  };

  const authProviderValues: AuthValuesType = {
    user: user,
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
