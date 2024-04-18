import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { supabase } from "../../libs/supabase"
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import { AuthContext } from "../../providers/authprovider";

interface IsignupPageProps {
    route: RouteProp<RootStackParamList, "signup">;
    navigation: NativeStackNavigationProp<RootStackParamList, "signup">;
}

export default function SignUpPage({ route, navigation }: IsignupPageProps) {
    const { session } = useContext(AuthContext);
    const [authMessage, setAuthMessage] = useState({ message: '', status: ''});
    const [authForm, setAuthForm] = useState({ email: '', password: '', loading: false });

    const handleEmailChange = (email: string) => {
    setAuthForm({ ...authForm, email });
    }

    const handlePasswordChange = (password: string) => {
    setAuthForm({ ...authForm, password });
    }

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
        <View className=" bg-[#BAD8F2] flex-1 justify-between">
            <View className=" h-full flex-1 items-center justify-center mt-[32px] px-[36px]">
                <Image source={require('../../../assets/title.png')} className="mb-[16px]" />
                <View className="w-full flex flex-col justify-center space-y-[10px]">
                    <Text className="text-center text-[#24527A] justify-center text-[18px] font-bold">Getting Started</Text>
                    <Text className="text-center text-[#24527A]">Please fill in the following information to create your account</Text>
                    <Text className={`${authMessage.status === 'success' ? "text-green-500" : "text-red-500"} ${authMessage.message ? "" : "hidden"}`}>{authMessage.message}</Text>
                    <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                        <Text className="text-[#24527A]">Full name (ex. Juan L. Dela Cruz)</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full" 
                            onChangeText={handleEmailChange}
                            textContentType='emailAddress'
                            placeholder='Enter fullname'
                            value={authForm.email} />
                    </View>
                    <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                        <Text className="text-[#24527A]">Farm name</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full" 
                            onChangeText={handleEmailChange}
                            textContentType='emailAddress'
                            placeholder='Enter farm name'
                            value={authForm.email} />
                    </View>
                    <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                        <Text className="text-[#24527A]">Username</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full" 
                            onChangeText={handleEmailChange}
                            textContentType='emailAddress'
                            placeholder='Enter username'
                            value={authForm.email} />
                    </View>
                    <View className="w-full flex flex-col justify-start items-start  space-y-[10px] ">
                        <Text className="text-[#24527A]">Password</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                            onChangeText={handlePasswordChange}
                            textContentType='password'
                            placeholder='Enter password'
                            secureTextEntry={true}
                            value={authForm.password} />
                    </View>
                    <View className="w-full mb-[12px] flex flex-col justify-start items-start  space-y-[10px] ">
                        <Text className="text-[#24527A]">Confirm password</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                            onChangeText={handlePasswordChange}
                            textContentType='password'
                            placeholder='Enter password'
                            secureTextEntry={true}
                            value={authForm.password} />
                    </View>
                    <Pressable className="bg-[#24527A] w-full px-[20px] py-[12px] rounded-[4px] flex-row justify-center space-x-2" disabled={authForm.loading} onPress={null}>
                        {!!authForm.loading && <ActivityIndicator color="#fff"/>}
                        <Text className="text-[#F9FAFE] text-center">
                            {!!authForm.loading ? 'Loading...' : 'Create account'}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View className=" flex flex-col items-center mb-[28px]">
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

  