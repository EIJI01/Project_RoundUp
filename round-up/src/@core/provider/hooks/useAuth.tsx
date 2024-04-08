import { useContext } from "react";
import { AuthContext } from "@/@core/context/authContext";

export const useAuth = () => useContext(AuthContext);
