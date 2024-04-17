import { View, Text, Image, Pressable, ScrollView } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { supabase } from "../../libs/supabase";
import { useState } from "react";

interface IDashboardProps {
    route: RouteProp<RootStackParamList, "selectPond">;
    navigation: NativeStackNavigationProp<RootStackParamList, "selectPond">;
}

export default function SelectPond({ route, navigation }: IDashboardProps) {
    const toggleLogoutModal = () => {
        console.log("logout")
        setLogoutModalVisibility(!logoutModalVisibility);
    }

    const [ logoutModalVisibility, setLogoutModalVisibility ] = useState(false)

    const handleLogoutModal = (pond: any) => {
        supabase.auth.signOut().then(() => {
                    navigation.replace("signin");
                });
      };
    // const handleLogout = () => {
    //     supabase.auth.signOut().then(() => {
    //         navigation.replace("signin");
    //     });
    // };

    return (
        <View className=" bg-[#ECF4FB] w-full h-full justify-between">
            <View className="pt-4 px-5 ">
                <View className="mb-6">
                    <View className="flex flex-row justify-between items-center mb-2">
                        <Pressable className="flex flex-grow flex-row justify-center items-center h-[36px] border-[#24527A] rounded-md border-[.3px] pr-2 pl-2 pb-[6px] pt-[5px]"
                            onPress={() => navigation.navigate('editAccount')}>
                            <Image className="" source={require('../../../assets/add.png')} style={{ width: 14, height: 14}} />
                            <Text className="font-semibold text-[16px] text-[#24527A] pl-2">Create new pond</Text>
                        </Pressable>
                    </View>
                    <View className="flex flex-row justify-between bg-transparent p-4">
                        <Text className="text-[#24527A]">Pond no.</Text>
                        <Text className="text-[#24527A]">Total prawn</Text>
                        <Text className="text-[#24527A]">Feeds Needed</Text>
                    </View>
                    <ScrollView className="max-h-[450px] min-h-[300px]" contentContainerStyle={{ flexGrow: 1 }}>
                    <View className={`flex flex-row justify-between p-4 pl-5 pr-8 bg-[#E1EFFA] mb-2 text-[#0d1c29] rounded-lg items-center`}>
                        <Text className="font-semibold text-[16px] text-[#24527A] flex flex-row border-[#24527A] rounded-md border-[.3px] pr-[12px] pl-[12px] pb-[5px] pt-[5px] text-center" >1</Text>
                        <Image source={require('../../../assets/line.png')} style={{ width: .5, height: 15, tintColor:"#9fb7cc", marginTop:3}} />
                        <Text className="font-semibold text-[24px] text-[#24527A]">0</Text>
                        <Image source={require('../../../assets/line.png')} style={{ width: .5, height: 15, tintColor:"#9fb7cc", marginTop:3}} />
                        <Text className="font-semibold text-[24px] text-[#24527A]">0 kg</Text>
                    </View>
                    </ScrollView>
                </View>
            </View>
            <View className="flex flex-row w-full justify-between bg-[#f0f6fc] border-t-[.3px] border-[#396387] h-[62px] pl-5 pr-5 pb-[6px] pt-[5px] items-center">
                <View className="flex flex-col">
                    <Text className="text-[16px] text-[#24527A] font-medium">Selected pond:</Text>
                    <Text className="italic text-[16px] text-[#24527A] ">No selected pond yet</Text>
                </View>
                <Pressable onPress={toggleLogoutModal} className="flex flex-row bg-[#9DAEBC] rounded-md pr-2 h-[36px] pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Text className="text-[#ECF4FB] pl-1 text-[16px]">Continue</Text>
                </Pressable>
            </View>
        </View>
    )
}