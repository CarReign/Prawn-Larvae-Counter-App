import { StatusBar } from 'expo-status-bar';
import { Button, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from 'react-native';
import AuthProvider from './src/providers/authprovider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInPage from './src/views/signinpage';
import Dashboard from './src/views/dashboard';
import { RootStackParamList } from './src/navigation/types';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Empty } from './src/components/empty';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="dashboard">
          <RootStack.Screen name="dashboard" component={Dashboard} />
          <RootStack.Screen  name="signin" options={{ title: "test", header: () => null, }} component={SignInPage} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

