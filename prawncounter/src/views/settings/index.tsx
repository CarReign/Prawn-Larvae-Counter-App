import { View, Text, Image, Pressable } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { supabase } from "../../libs/supabase";
import { useState } from "react";
import LogoutModal from "../dashboard/modals/logoutmodal";
import useAuth from "../../hooks/useauth";
import useFarm from "../../hooks/useFarm";

interface IDashboardProps {
    route: RouteProp<RootStackParamList, "settings">;
    navigation: NativeStackNavigationProp<RootStackParamList, "settings">;
}

export default function Settings({ route, navigation }: IDashboardProps) {
    const { session, loading: sessionLoading, reset } = useAuth();
    const { farm, loading: farmLoading, username, refresh, editFarm } = useFarm();
    const [ newUsername, setNewUsername] = useState<any>(username);
    const [ newFarmName, setNewFarmName ] = useState<any>(farm?.farm_name);
    
    const toggleLogoutModal = () => {
        console.log("logout")
        setLogoutModalVisibility(!logoutModalVisibility);
    }

    const [ logoutModalVisibility, setLogoutModalVisibility ] = useState(false)

    const handleLogoutModal = () => {
        supabase.auth.signOut().then(() => {
            reset && reset();
            navigation.replace("signin");
        });
    }

    return (
        <View className="pt-4 px-5  bg-[#ECF4FB] w-full h-full justify-between">
            <View className="">
                <View className="mb-6">
                    <View className="flex flex-row justify-between items-center mb-2">
                        <Text className="text-[#1F375D] text-[16px] font-semibold">Account</Text>
                        <Pressable className="flex flex-row border-[#1F375D] rounded-md border-[.3px] pr-2 pl-2 pb-[6px] pt-[5px]"
                            onPress={() => navigation.navigate('editAccount')}>
                            <Image className="" source={require('../../../assets/edit.png')} style={{ width: 16, height: 16}} />
                            <Text className="font-semibold text-[16px] text-[#1F375D] pl-1">Edit account</Text>
                        </Pressable>
                    </View>
                    <View className="bg-[#F2F9FF] rounded-md p-3">
                        <View className="flex flex-row justify-between mb-3">
                            <Text className="text-[16px] text-[#1F375D]">Username:</Text>
                            <Text className="text-[16px] text-[#1F375D]">{username}</Text>
                        </View>
                        <View className="flex flex-row justify-between">
                            <Text className="text-[16px] text-[#1F375D]">Farm name:</Text>
                            <Text className="text-[16px] text-[#1F375D]">{farm?.farm_name}</Text>
                        </View>
                    </View>
                </View>
                <View className="mb-6">
                    <View className="flex flex-row justify-between items-center mb-2">
                        <Text className="text-[#1F375D] text-[16px] font-semibold">Privacy & Security</Text>
                    </View>
                    <View className="bg-[#F2F9FF] rounded-md p-3">
                        <Pressable  className="flex flex-row justify-between" onPress={() => navigation.navigate('changePassword')}>
                            <Text className="text-[16px] text-[#1F375D]">Change Password</Text>
                            <Image source={require('../../../assets/arrow-right.png')} style={{ width: 16, height: 16}}/>
                        </Pressable>
                    </View>
                </View>
                <View className="mb-6">
                    <View className="flex flex-row justify-between items-center mb-2">
                        <Text className="text-[#1F375D] text-[16px] font-semibold">Additional settings</Text>
                    </View>
                    <View className="bg-[#F2F9FF] rounded-md p-3">
                        <Pressable  className="flex flex-row justify-between" onPress={() => navigation.navigate('changeFeedCalculation')}>
                            <Text className="text-[16px] text-[#1F375D]">Change feed calculation</Text>
                            <Image source={require('../../../assets/arrow-right.png')} style={{ width: 16, height: 16}}/>
                        </Pressable>
                    </View>
                </View>
                {/* <View className="mb-6">
                    <View className="flex flex-row justify-between items-center mb-2">
                        <Text className="text-[#1F375D] text-[16px] font-semibold">Counting algorithms</Text>
                        <Pressable className="flex flex-row border-[#1F375D] rounded-md border-[.3px] pr-2 pl-2 pb-[6px] pt-[5px]"
                            onPress={() => navigation.navigate('changeAlgorithm')}>
                            <Image className="" source={require('../../../assets/edit.png')} style={{ width: 16, height: 16}} />
                            <Text className="font-semibold text-[16px] text-[#1F375D] pl-1">Change algorithm</Text>
                        </Pressable>
                    </View>
                    <View className="bg-[#F2F9FF] rounded-md p-3">
                        <View className="flex flex-row justify-between mb-3">
                            <Text className="text-[16px] text-[#1F375D]">Contour-based</Text>
                        </View>
                        <View className="flex flex-row  mb-3 ">
                            <Text className="text-[16px] text-[#1F375D]">Canny-edge detection</Text>
                        </View>
                        <View className="flex flex-row d mb-3 ">
                            <Text className="text-[16px] text-[#1F375D]">Blob-detection</Text>
                        </View>
                    </View>
                </View> */}
            </View>
            <View className="flex flex-row w-full justify-center pb-5">
                <Pressable onPress={toggleLogoutModal} className="flex flex-row bg-[#B41919] rounded-md pr-2 h-[36px] pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Image source={require('../../../assets/logout.png')} style={{ width: 16, height: 16}}></Image>
                    <Text className="text-[#ECF4FB] pl-1 text-[16px]">Logout</Text>
                </Pressable>
            </View>
            {logoutModalVisibility && (
                <LogoutModal onClose={toggleLogoutModal} onLogout={handleLogoutModal}/>
            )}
        </View>
    )
}