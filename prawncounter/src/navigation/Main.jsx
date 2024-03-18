import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const MainStack = createNativeStackNavigator();

export default function Main() {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name="Tabs" component={Tabs} />
        </MainStack.Navigator>
    );
};