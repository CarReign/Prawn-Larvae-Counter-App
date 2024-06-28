import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { supabase } from "../../libs/supabase"
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Alert, Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import { AuthContext } from "../../providers/authprovider";
import useFarm from "../../hooks/useFarm";
import NetInfo from "@react-native-community/netinfo";

interface ISignInPageProps {
    route: RouteProp<RootStackParamList, "signin">;
    navigation: NativeStackNavigationProp<RootStackParamList, "signin">;
}

export default function SignInPage({ route, navigation }: ISignInPageProps) {
    const { session, loading } = useContext(AuthContext);
    const { refresh }  = useFarm();
    const [authMessage, setAuthMessage] = useState({ message: '', status: '' });
    const [authForm, setAuthForm] = useState({ email: '', password: '', demoLoading: false, loading: false });
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
                refresh?.();
                setAuthMessage({ message: 'Signed in successfully', status: 'success' });
            }).catch((error) => {
                setAuthMessage(error.message);
            }).finally(() => {
                setAuthForm({ ...authForm, loading: false });
            });
    };

    // const handleNavigateToDashboard = (e: any) => {
    //     e.preventDefault();
    //     // check if invoked by user or by sign in success
    //     if (!session) {
    //         return;
    //     }
    //     navigation.dispatch(e.data.action);
    // }

    // useEffect(() => {
    //     navigation.addListener('beforeRemove', handleNavigateToDashboard);
    //     return () => {
    //         navigation.removeListener('beforeRemove', handleNavigateToDashboard);
    //     }
    // }, [session]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                navigation.replace("noInternet");
            }
        });
        return () => {
            unsubscribe();
        };  
    },[]);

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (!session) {
                return;
            } else if (!state.isConnected) {
                navigation.replace("noInternet");
            } else {
                navigation.replace('dashboard');
            }
        });
        // supabase.from('farmers').select('*').then(({ data, error }) => {
        //     if (error) {
        //         console.error(error);
        //         return Promise.reject(error);
        //     }
        //     setFarmers(data);
        //     const farmer = data.filter((farmer: any) => farmer.user_id === session?.user?.id)
        //     console.log("FARMER:", farmer)
        // })
    }, [session])

    const handleDemoSignIn = () => {
        setAuthForm({ ...authForm, email: "", password: "", demoLoading: true });
        supabase.auth.signInWithPassword({ email: 'sunnystartupofficial@gmail.com', password: 'sunny123' })
            .then((response: AuthTokenResponsePassword) => {
                if (response.error) {
                    setAuthMessage({ message: response.error.message, status: 'error' });
                    return;
                };
                refresh?.();
                setAuthMessage({ message: 'Signed in successfully', status: 'success' });
            }).catch((error) => {
                setAuthMessage(error.message);
            }).finally(() => {
                setAuthForm({ ...authForm, demoLoading: false });
            });
    }

    return (
        <View className=" bg-[#EFF4FF] flex-1 justify-between">
            <View></View>
            <View className=" h-full flex-1 items-center justify-center space-y-2 px-[36px]">
                {
                    loading && <ActivityIndicator color="#1F375D" size="large" />
                }
                { !loading && <><Image source={require('../../../assets/title.png')} className=" w-[200px] h-[80px] mb-[12px]" />
                <Text className="text-center text-[#1F375D] text-[18px] font-bold">Login</Text>
                <Text className="text-center mb-3 text-[#1F375D]">Please fill in the following information to continue</Text>
                <Text className={`${authMessage.status === 'success' ? "text-green-500" : "text-red-500"} ${authMessage.message ? "" : "hidden"}`}>{authMessage.message}</Text>
                <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                    <Text className="text-[#1F375D]">Email</Text>
                    <TextInput
                        className="bg-[#F9FAFE] px-2 focus:border-[#1F375D] border-[#1F375D81] text-[#1F375D] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                        onChangeText={handleEmailChange}
                        textContentType='emailAddress'
                        placeholder='Enter email'
                        value={authForm.email} />
                </View>
                <View className="w-full mb-[12px] flex flex-col justify-start items-start  space-y-[10px] ">
                    <Text className="text-[#1F375D]">Password</Text>
                    <TextInput
                        className="bg-[#F9FAFE] px-2 focus:border-[#1F375D] border-[#1F375D81] text-[#1F375D] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                        onChangeText={handlePasswordChange}
                        textContentType='password'
                        placeholder='Enter password'
                        secureTextEntry={true}
                        value={authForm.password} />
                </View>
                <Pressable className="bg-[#1F375D] w-full px-[20px] py-[12px] mb-3 rounded-[4px] flex-row justify-center space-x-2" disabled={authForm.loading} onPress={handleSignIn}>
                    {!!authForm.loading && <ActivityIndicator color="#fff" />}
                    <Text className="text-[#F9FAFE] text-center">
                        {!!authForm.loading ? 'Loading...' : 'Sign In'}
                    </Text>
                </Pressable>
                <Pressable className="border border-[#1F375D] w-full px-[20px] py-[12px] mb-3 rounded-[4px] flex-row justify-center space-x-2" disabled={authForm.loading} onPress={handleDemoSignIn}>
                    {!!authForm.demoLoading && <ActivityIndicator color="#1F375D" />}
                    <Text className="text-[hsl(217,50%,24%)] text-center">
                        {!!authForm.demoLoading ? 'Loading...' : 'Demo Sign In'}
                    </Text>
                </Pressable>
                {/* <View className=" flex flex-row justify-center items-center mt-[28px]">
                    <Text className="text-[#1F375D]">Don't have an account yet? </Text>
                    <Pressable onPress={() => navigation.navigate('signup')} className="flex flex-row items-center space-x-2">
                        <Text className="text-[#1F375D] font-medium">Sign Up</Text>
                    </Pressable>
                </View> */}
                </>}
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

