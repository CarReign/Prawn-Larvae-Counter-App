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
import Settings from "./src/views/settings";
import EditAccount from "./src/views/editAccount";
import ChangePassword from "./src/views/changepassword";
import ChangeAlgorithm from "./src/views/changealgorithm";
import SelectPond from "./src/views/selectpond/selectpond";
import SignUpPage from "./src/views/signuppage";
import ResultModal from "./src/views/dashboard/modals/resultmodal";


const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <AuthProvider>
      <FarmProvider>
        <PondProvider>
          <CountProvider>
            <ResultModal>
              <NavigationContainer>
                <RootStack.Navigator initialRouteName="signin" screenOptions={{
                  headerTintColor: '#24527A',
                  headerStyle: { backgroundColor: '#ECF4FB' },
                }}>
                  <RootStack.Screen name="dashboard" options={{ header: () => null, }} component={Dashboard} />
                  <RootStack.Screen name="signup" options={{ header: () => null, }} component={SignUpPage} />
                  <RootStack.Screen name="signin" options={{ header: () => null, }} component={SignInPage} />
                  <RootStack.Screen name="settings" options={{ title: "Settings" }} component={Settings} />
                  <RootStack.Screen name="editAccount" options={{ title: "Edit Account" }} component={EditAccount} />
                  <RootStack.Screen name="changePassword" options={{ title: "Change Password" }} component={ChangePassword} />
                  <RootStack.Screen name="changeAlgorithm" options={{ title: "Change Algorithm" }} component={ChangeAlgorithm} />
                  <RootStack.Screen name="selectPond" options={{ title: "Select Pond" }} component={SelectPond} />
                </RootStack.Navigator>
              </NavigationContainer>
            </ResultModal>
          </CountProvider>
        </PondProvider>
      </FarmProvider>
    </AuthProvider>
  );
}

