import { useContext } from "react";
import { AuthContext } from "../../providers/authprovider";

export default function useAuth() {
    return useContext(AuthContext);
}