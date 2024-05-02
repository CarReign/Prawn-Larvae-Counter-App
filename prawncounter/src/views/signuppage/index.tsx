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
    const [ email, setEmail ] = useState<any>('')
    const [ username, setUsername ] = useState<any>('')
    const [ password, setPassword ] = useState<any>('')
    const [ confirmPassword, setConfirmPassword ] = useState<any>('')
    const [loading, setLoading] = useState(false)
   
    

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert('Password does not match');
            return;
        }
        setLoading(true)
        const { data: {user}, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        

        console.log("userrr:",user)
        if (error) {
            alert(error.message);
            setLoading(false)
            console.log('Error creating user:', error)
        } else {
            await supabase.from('farmers').insert([
                {
                    user_id: user?.id,
                    username: username,
                    farm_id: null,
                }
            ]);
            setLoading(false)
            console.log('User created successfully:', user)
            alert("Please check your inbox for email verification")
            navigation.navigate('signin')
        }
        
    }


    return (
        <View className=" bg-[#BAD8F2] flex-1 justify-between">
            <View className=" h-full flex-1 items-center justify-center mt-[32px] px-[36px]">
                <Image source={require('../../../assets/title.png')} className="mb-[16px]" />
                <View className="w-full flex flex-col justify-center space-y-[10px]">
                    <Text className="text-center text-[#24527A] justify-center text-[18px] font-bold">Getting Started</Text>
                    <Text className="text-center text-[#24527A]">Please fill in the following information to create your account</Text>
                    <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                        <Text className="text-[#24527A]">Email</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full" 
                            onChangeText={setEmail}
                            textContentType='emailAddress'
                            placeholder='Enter email'/>
                    </View>
                    {/* <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                        <Text className="text-[#24527A]">Farm name</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full" 
                            onChangeText={""}
                            textContentType='emailAddress'
                            placeholder='Enter farm name'
                            value={authForm.email} />
                    </View> */}
                    <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                        <Text className="text-[#24527A]">Username</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full" 
                            onChangeText={setUsername}
                            textContentType='username'
                            placeholder='Enter username' />
                    </View>
                    <View className="w-full flex flex-col justify-start items-start  space-y-[10px] ">
                        <Text className="text-[#24527A]">Password</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                            onChangeText={setPassword}
                            textContentType='password'
                            placeholder='Enter password'
                            secureTextEntry={true} />
                    </View>
                    <View className="w-full mb-[12px] flex flex-col justify-start items-start  space-y-[10px] ">
                        <Text className="text-[#24527A]">Confirm password</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#24527A] border-[#24527a81] text-[#24527A] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                            onChangeText={setConfirmPassword}
                            textContentType='password'
                            placeholder='Enter password'
                            secureTextEntry={true}/>
                    </View>
                    <Pressable className="bg-[#24527A] w-full px-[20px] py-[12px] mb-3 rounded-[4px] flex-row justify-center space-x-2" onPress={handleSignUp}>
                        {!!loading && <ActivityIndicator color="#fff"/>}
                        <Text className="text-[#F9FAFE] text-center">
                            {!!loading ? 'Creating account...' : 'Create account'}
                        </Text>
                    </Pressable>
                    <View className=" flex flex-row justify-center items-center mt-[28px]">
                        <Text className="text-[#24527A]">Already have an account? </Text>
                        <Pressable onPress={() => navigation.navigate('signin')} className="flex flex-row items-center space-x-2">
                            <Text className="text-[#24527A] font-medium">Sign In</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View className=" flex flex-col items-center mb-[28px]">
            </View>
        </View>
    );
};

  