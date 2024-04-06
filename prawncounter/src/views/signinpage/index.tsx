import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { supabase } from "../../libs/supabase"
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import { AuthContext } from "../../providers/authprovider";

interface ISignInPageProps {
    route: RouteProp<RootStackParamList, "signin">;
    navigation: NativeStackNavigationProp<RootStackParamList, "signin">;
}

export default function SignInPage({ route, navigation }: ISignInPageProps) {
    const { session } = useContext(AuthContext);
    const [authMessage, setAuthMessage] = useState("");
    const [authForm, setAuthForm] = useState({ email: '', password: '', loading: false });

    const handleEmailChange = (email: string) => {
    setAuthForm({ ...authForm, email });
    }

    const handlePasswordChange = (password: string) => {
    setAuthForm({ ...authForm, password });
    }

    const handleSignIn = () => {
    setAuthForm({ ...authForm, loading: true });
    supabase.auth.signInWithPassword({ email: authForm.email, password: authForm.password })
        .then((response: AuthTokenResponsePassword) => {
            if (response.error) {
            setAuthMessage(response.error.message);
            return;
            }
            setTimeout(() => {
                navigation.pop();
            }, 2000)
            setAuthMessage("Sign in successful");
        }
        ).catch((error) => {
            setAuthMessage(error.message);
        }).finally(() => {
            setAuthForm({ ...authForm, loading: false });
        });
    };

    const handleNavigateToDashboard = (e: any) => {
        e.preventDefault();
        // check if invoked by user or by sign in success
        if (!session) {
            return;
        }
        navigation.dispatch(e.data.action);
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', handleNavigateToDashboard);
        return () => {
            navigation.removeListener('beforeRemove', handleNavigateToDashboard);
        }
    }, [session]);

    return (
        <View >
            <Text>PrawnApp Auth Test</Text>
            <Text>{authMessage}</Text>
            <TextInput 
                onChangeText={handleEmailChange}
                textContentType='emailAddress'
                placeholder='***@gmail.com'
                value={authForm.email} />
            <TextInput
                onChangeText={handlePasswordChange}
                textContentType='password'
                placeholder='password'
                secureTextEntry={true}
                value={authForm.password} />
            <Button disabled={authForm.loading} title='Sign In' onPress={handleSignIn} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  