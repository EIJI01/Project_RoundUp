import { ReactNode } from "react";

// export interface userType {
//   uid: string;
//   email: string;
// }

export interface loginValueType {
  email: string | null;
  password: string | null;
}

export interface AuthValuesType {
  // user: userType | null;
  token: string | null;
  login: (url: string, { email, password }: loginValueType) => void;
  logout: () => void;
}

export interface AuthContextProps {
  children: ReactNode;
}
