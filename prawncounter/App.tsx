import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/navigation/types";
import AuthProvider from "./src/providers/authprovider";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./src/views/dashboard";
import SignInPage from "./src/views/signinpage";
import { Text, View } from "react-native";
import FarmProvider from "./src/providers/farmprovider";
import PondProvider from "./src/providers/pondprovider";
import CountProvider from "./src/providers/countprovider";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <AuthProvider>
      <FarmProvider>
        <PondProvider>
          <CountProvider>
            <NavigationContainer>
              <RootStack.Navigator initialRouteName="dashboard">
                <RootStack.Screen name="dashboard" options={{ header: () => null, }} component={Dashboard} />
                <RootStack.Screen  name="signin" options={{ header: () => null, }} component={SignInPage} />
              </RootStack.Navigator>
            </NavigationContainer>
          </CountProvider>
        </PondProvider>
      </FarmProvider>
    </AuthProvider>
  );
}

