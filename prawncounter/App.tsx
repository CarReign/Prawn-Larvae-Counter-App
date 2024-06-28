import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/navigation/types";
import AuthProvider, { AuthContext } from "./src/providers/authprovider";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Dashboard from "./src/views/dashboard";
import SignInPage from "./src/views/signinpage";
import { Text, View } from "react-native";
import FarmProvider from "./src/providers/farmprovider";
import PondProvider from "./src/providers/pondprovider";
import CountProvider from "./src/providers/countprovider";
import Settings from "./src/views/settings";
import EditAccount from "./src/views/editAccount";
import ChangePassword from "./src/views/changepassword";
import ChangeFeedCalculation from "./src/views/changefeedcalculation";
import ChangeAlgorithm from "./src/views/changealgorithm";
import SelectPond from "./src/views/selectpond/selectpond";
import SignUpPage from "./src/views/signuppage";
import ResultModal from "./src/views/dashboard/modals/resultmodal";
import { useContext, useEffect, useRef } from "react";
import SelectFarm from "./src/views/selectfarm";
import NoInternet from "./src/views/nointernet";
import { FeedProvider } from "./src/providers/feedprovider";


const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const navigatorRef = useRef<any>();
  // const navigation = useNavigation();

  // useEffect(() => {
  //   const { session } = useContext(AuthContext);
  //   if (session) {
  //     navigation.navigate("dashboard"); // Update the code to pass the screen name directly
  //   }
  // }, []);

  return (
    <AuthProvider>
      <FarmProvider>
        <PondProvider>
          <CountProvider>
            <FeedProvider>
              <ResultModal navigation={navigatorRef}>
                <NavigationContainer ref={navigatorRef}>
                  <RootStack.Navigator initialRouteName="dashboard" screenOptions={{
                    headerTintColor: '#24527A',
                    headerStyle: { backgroundColor: '#ECF4FB' },
                  }}>
                    <RootStack.Screen name="dashboard" options={{ header: () => null, }} component={Dashboard} />
                    <RootStack.Screen name="signup" options={{ header: () => null, }} component={SignUpPage} />
                    <RootStack.Screen name="signin" options={{ header: () => null, }} component={SignInPage} />
                    <RootStack.Screen name="settings" options={{ title: "Settings" }} component={Settings} />
                    <RootStack.Screen name="editAccount" options={{ title: "Edit account" }} component={EditAccount} />
                    <RootStack.Screen name="changePassword" options={{ title: "Change password" }} component={ChangePassword} />
                    <RootStack.Screen name="changeFeedCalculation" options={{ title: "Change feed calculation" }} component={ChangeFeedCalculation} />
                    <RootStack.Screen name="changeAlgorithm" options={{ title: "Change algorithm" }} component={ChangeAlgorithm} />
                    <RootStack.Screen name="selectPond" options={{ title: "Select Pond" }} component={SelectPond} />
                    <RootStack.Screen name="selectFarm" options={{ header: () => null, }} component={SelectFarm} />
                    <RootStack.Screen name="noInternet" options={{ header: () => null, }} component={NoInternet} />
                  </RootStack.Navigator>
                </NavigationContainer>
              </ResultModal>
            </FeedProvider>
          </CountProvider>
        </PondProvider>
      </FarmProvider>
    </AuthProvider>
  );
}

