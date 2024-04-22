import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { supabase } from "../../libs/supabase"
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import { AuthContext } from "../../providers/authprovider";

interface ISignInPageProps {
    route: RouteProp<RootStackParamList, "signin">;
    navigation: NativeStackNavigationProp<RootStackParamList, "signin">;
}

export default function SignInPage({ route, navigation }: ISignInPageProps) {
    const { session } = useContext(AuthContext);
    const [authMessage, setAuthMessage] = useState({ message: '', status: '' });
    const [authForm, setAuthForm] = useState({ email: '', password: '', loading: false });
    const [farmers, setFarmers] = useState<any[]>([]);

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
                    setAuthMessage({ message: response.error.message, status: 'error' });
                    return;
                };
                setAuthMessage({ message: 'Signed in successfully', status: 'success' });
            }).catch((error) => {
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

    
    useEffect(() => {
        supabase.from('farmers').select('*').then(({ data, error }) => {
            if (error) {
                console.error(error);
                return Promise.reject(error);
            }
            setFarmers(data);
            const farmer = data.filter((farmer: any) => farmer.user_id === session?.user?.id)
            console.log("FARMER:", farmer)
            if (session) {
                if (farmer[0].farm_id !== null) {
                    navigation.replace("dashboard");
                } else {
                    navigation.replace("selectFarm");
                }
                
            } 
        })
    }, [session])

    return (
        <View className=" bg-[#BAD8F2] flex-1 justify-between">
            <View></View>
            <View className=" h-full flex-1 items-center justify-center space-y-2 px-[36px]">
                <Image source={require('../../../assets/title.png')} className="mb-[24px]" />
                <Text className="text-center text-[#24527A] text-[18px] font-bold">Login</Text>
                <Text className="text-center text-[#24527A]">Please fill in the following information to continue</Text>
                <Text className={`${authMessage.status === 'success' ? "text-green-500" : "text-red-500"} ${authMessage.message ? "" : "hidden"}`}>{authMessage.message}</Text>
                <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                    <Text className="text-[#24527A]">Email</Text>
                    <TextInput
                        className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                        onChangeText={handleEmailChange}
                        textContentType='emailAddress'
                        placeholder='Enter email'
                        value={authForm.email} />
                </View>
                <View className="w-full mb-[12px] flex flex-col justify-start items-start  space-y-[10px] ">
                    <Text className="text-[#24527A]">Password</Text>
                    <TextInput
                        className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                        onChangeText={handlePasswordChange}
                        textContentType='password'
                        placeholder='Enter password'
                        secureTextEntry={true}
                        value={authForm.password} />
                </View>
                <Pressable className="bg-[#24527A] w-full px-[20px] py-[12px] mb-3 rounded-[4px] flex-row justify-center space-x-2" disabled={authForm.loading} onPress={handleSignIn}>
                    {!!authForm.loading && <ActivityIndicator color="#fff" />}
                    <Text className="text-[#F9FAFE] text-center">
                        {!!authForm.loading ? 'Loading...' : 'Sign In'}
                    </Text>
                </Pressable>
                <View className=" flex flex-row justify-center items-center mt-[28px]">
                    <Text className="text-[#24527A]">Don't have an account yet? </Text>
                    <Pressable onPress={() => navigation.navigate('signup')} className="flex flex-row items-center space-x-2">
                        <Text className="text-[#24527A] font-medium">Sign Up</Text>
                    </Pressable>
                </View>
            </View>
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

