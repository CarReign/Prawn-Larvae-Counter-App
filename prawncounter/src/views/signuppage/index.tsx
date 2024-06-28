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
            alert("User created successfully, please sign in to continue")
            navigation.navigate('signin')
        }
        
    }


    return (
        <View className=" bg-[#EFF4FF] flex-1 justify-between">
            <View className=" h-full flex-1 items-center justify-center mt-[32px] px-[36px]">
                <Image source={require('../../../assets/title.png')} className=" w-[200px] h-[80px] mb-[16px]" />
                <View className="w-full flex flex-col justify-center space-y-[10px]">
                    <Text className="text-center text-[#1F375D] justify-center text-[18px] font-bold">Getting Started</Text>
                    <Text className="text-center text-[#1F375D]">Please fill in the following information to create your account</Text>
                    <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                        <Text className="text-[#1F375D]">Email</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#1F375D] border-[#1F375D81] text-[#1F375D] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full" 
                            onChangeText={setEmail}
                            textContentType='emailAddress'
                            placeholder='Enter email'/>
                    </View>
                    {/* <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                        <Text className="text-[#1F375D]">Farm name</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#1F375D] border-[#1F375D81] text-[#1F375D] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full" 
                            onChangeText={""}
                            textContentType='emailAddress'
                            placeholder='Enter farm name'
                            value={authForm.email} />
                    </View> */}
                    <View className="w-full flex flex-col justify-start items-start space-y-[10px]">
                        <Text className="text-[#1F375D]">Username</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#1F375D] border-[#1F375D81] text-[#1F375D] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full" 
                            onChangeText={setUsername}
                            textContentType='username'
                            placeholder='Enter username' />
                    </View>
                    <View className="w-full flex flex-col justify-start items-start  space-y-[10px] ">
                        <Text className="text-[#1F375D]">Password</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#1F375D] border-[#1F375D81] text-[#1F375D] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                            onChangeText={setPassword}
                            textContentType='password'
                            placeholder='Enter password'
                            secureTextEntry={true} />
                    </View>
                    <View className="w-full mb-[12px] flex flex-col justify-start items-start  space-y-[10px] ">
                        <Text className="text-[#1F375D]">Confirm password</Text>
                        <TextInput
                            className="bg-[#F9FAFE] px-2 focus:border-[#1F375D] border-[#1F375D81] text-[#1F375D] border border-t-0 border-x-0 border-b-[1px] rounded-[4px] min-h-[40px] w-full"
                            onChangeText={setConfirmPassword}
                            textContentType='password'
                            placeholder='Enter password'
                            secureTextEntry={true}/>
                    </View>
                    <Pressable className="bg-[#1F375D] w-full px-[20px] py-[12px] mb-3 rounded-[4px] flex-row justify-center space-x-2" onPress={handleSignUp}>
                        {!!loading && <ActivityIndicator color="#fff"/>}
                        <Text className="text-[#F9FAFE] text-center">
                            {!!loading ? 'Creating account...' : 'Create account'}
                        </Text>
                    </Pressable>
                    <View className=" flex flex-row justify-center items-center mt-[28px]">
                        <Text className="text-[#1F375D]">Already have an account? </Text>
                        <Pressable onPress={() => navigation.navigate('signin')} className="flex flex-row items-center space-x-2">
                            <Text className="text-[#1F375D] font-medium">Sign In</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View className=" flex flex-col items-center mb-[28px]">
            </View>
        </View>
    );
};

  