import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { ActivityIndicator, Button, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import useAuth from "../../hooks/useauth";

export default function NoInternet({ navigation }:  { navigation: NativeStackNavigationProp<RootStackParamList, "noInternet">}) {
    const [hasInternet, setHasInternet] = useState(false);
    const { session } = useAuth();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                setHasInternet(true);
                !session && navigation.replace("signin");
                session && navigation.replace("dashboard");
            }
        });
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            if (hasInternet) navigation.dispatch(e.data.action);
        });
        return () => {
            unsubscribe();
        }
    });

    return (
        <View className="flex flex-1 justify-center items-center bg-[#E2ECF4]">
            <Image source={require('../../../assets/error-page.png')} style={{ width: 150, height: 150 }} tintColor={"#24527A"} />
            <Text>Oh no! Please check your internet connection</Text>
            <View className="flex flex-row">
                <Text>Reconnecting...</Text>
                <ActivityIndicator size="large" color="#24527A" />
            </View>
            
        </View>
    );
}