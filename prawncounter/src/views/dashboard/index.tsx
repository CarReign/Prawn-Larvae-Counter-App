import { Button, Text, View } from "react-native";
import { AuthContext } from "../../providers/authprovider";
import { useContext, useEffect, useState } from "react";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useAuth from "../../hooks/useauth";
import { RootStackParamList } from "../../navigation/types";
import { supabase } from "../../libs/supabase";

interface IDashboardProps {
    route: RouteProp<RootStackParamList, "dashboard">;
    navigation: NativeStackNavigationProp<RootStackParamList, "dashboard">;
}

export default function Dashboard({ route, navigation }: IDashboardProps) {
    const [proceed, setProceed] = useState<boolean>(false);
    const { session } = useAuth();

    useEffect(() => {
        let timeoutNavigateToSignIn: NodeJS.Timeout;
        if (session) {
            timeoutNavigateToSignIn = setTimeout(() => {
                setProceed(true);
            }, 2000)
        } else {
            timeoutNavigateToSignIn = setTimeout(() => {
                navigation.push("signin");
            }, 2000);
        }
    }, [session])

    const handleSignOut = async () => {
        setProceed(false);
        await supabase.auth.signOut();
    }

    return (
        <View>
            {
                proceed && <View><Text>Dashboard</Text>
                <Button title="Sign Out" onPress={handleSignOut} />
                </View>
            }
            {
                !proceed && <Text>Logo + Loading...</Text>
            }
        </View>
    );
}