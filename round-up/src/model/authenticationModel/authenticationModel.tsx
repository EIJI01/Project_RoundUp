import { ReactNode } from "react";

export interface userType {
  uid: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  faculty: string | null;
  studentID: string | null;
  email: string | null;
}

export interface registerValueType {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  faculty: string | null;
  studentID: string | null;
  email: string | null;
  password: string | null;
}

export interface loginValueType {
  email: string | null;
  password: string | null;
}

export interface AuthValuesType {
  user: userType | null;
  token: string | null;
  login: (url: string, { email, password }: loginValueType) => void;
  logout: () => void;
}

export interface AuthContextProps {
  children: ReactNode;
}
