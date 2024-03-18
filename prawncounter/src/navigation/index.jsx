import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "../screens/Loading";


export default function Navigation() {
    const auth = useContext(AuthContext);
    const user = auth.user;

    return (
        <NavigationContainer>
            {
                user == null ? <Loading />
                    : user ? <Main />
                        : <Auth />
            }
        </NavigationContainer>
    );
}