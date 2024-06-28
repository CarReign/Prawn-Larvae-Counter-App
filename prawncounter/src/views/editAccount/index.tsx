import { View, Text, Image, Pressable, TextInput, Alert } from "react-native";
import { supabase } from "../../libs/supabase";
import useAuth from "../../hooks/useauth";
import useFarm from "../../hooks/useFarm";
import { useEffect, useState } from "react";


export default function EditAccount() {
    
    const { session, loading: sessionLoading } = useAuth();
    
    const { farm, loading: farmLoading, username, refresh, editFarm } = useFarm();
    
    const [ newUsername, setNewUsername] = useState<any>(username);
    const [ newFarmName, setNewFarmName ] = useState<any>(farm?.farm_name);
    useEffect(() => {
        setNewUsername(username)
        setNewFarmName(farm?.farm_name)
        
            
    },[farm, username] ) 
    const handleEditAccount = () => {
        const farmID = farm?.farm_id
        editFarm && editFarm({farm_id: farmID, farm_name: newFarmName});

        const updateUsername = async () => {
            await supabase.from("farmers")
                .update({username: newUsername})
                .eq('user_id', session?.user.id)
                .single()
        };
        updateUsername();
        
        Alert.alert("Success", "Account updated successfully.");
    }

    return (
        <View className="pt-4 px-5  bg-[#ECF4FB] w-full h-full justify-between"> 
            <View className="">
                <View className="mb-6">
                    <View className="mb-3 flex flex-row w-full items-center justify-between">
                        <Text className="mb-1 text-[18px] mr-3 text-[#1F375D]">Username:</Text>
                        <TextInput
                            className="bg-[#F2F9FF] text-[18px] rounded p-2 text-[#1F375D] w-[228px] h-[36px]"
                            onChangeText={setNewUsername}
                            keyboardType="default"
                            value={newUsername}
                        />
                    </View>
                    <View className="mb-3 flex flex-row w-full items-center justify-between">
                        <Text className="text-[18px] mb-1 mr-3 text-[#1F375D]">Prawn farm:</Text>
                        <TextInput
                            className="bg-[#F2F9FF] text-[18px] rounded p-2 text-[#1F375D]  w-[228px] h-[36px]"
                            onChangeText={setNewFarmName}
                            keyboardType="default"
                            value={newFarmName}
                        />
                    </View>
                </View>
            </View>
            <View className="flex flex-row w-full justify-center pb-5">
                <Pressable className="flex flex-row flex-grow bg-[#F9FCFF] rounded-md h-[36px] pr-2 pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Text className="text-[#4B7293] text-[18px]">Cancel</Text>
                </Pressable>
                <Pressable
                onPress={handleEditAccount} className="flex flex-row flex-grow bg-[#396387] rounded-md h-[36px] ml-3 pr-2 pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Text className="text-[#ECF4FB] text-[18px]">Save changes</Text>
                </Pressable>
            </View>
        </View>
    )
}