import { Text } from "react-native";
import useAuth from "../../hooks/useauth";
import { useContext } from "react";
import { AuthContext } from "../../providers/authprovider";

export default function SessionProbe() {
    const { session } = useContext(AuthContext);

    return (
        <Text>Session: {session ? JSON.stringify(session) : "None"}</Text>
    );
}