import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { supabase } from "../../libs/supabase";
import usePond from "../../hooks/usePond";
import useCount from "../../hooks/usecount";

interface IDashboardProps {
  navigation: any; 
}

export default function SelectPond({ navigation }: IDashboardProps) {

    const {ponds, loading} = usePond();
    const { counts } = useCount();
    const [selectedPond, setSelectedPond] = useState<number | null>(null);

    const toggleSelectPond = () => {
        console.log("Selected pond:", selectedPond);
        setLogoutModalVisibility(!logoutModalVisibility);
    };

    const [logoutModalVisibility, setLogoutModalVisibility] = useState(false);

    return (
        <View className="bg-[#ECF4FB] h-full flex flex-col justify-between">
            <View className="p-4 ">
                <View className="mb-6">
                <Pressable
                    className="flex-row justify-center items-center h-10 rounded-md border-[#24527A] border-[.3px] px-4"
                    onPress={() => navigation.navigate("")}
                >
                    <Image
                    source={require("../../../assets/add.png")}
                    style={{ width: 14, height: 14 }}
                    />
                    <Text className="font-bold text-base text-[#396387] pl-2">Create new pond</Text>
                </Pressable>
                </View>
                <View className="flex-row justify-between p-4">
                    <Text className="text-[#24527A]">  Pond no.</Text>
                    <Text className="text-[#24527A]">         Total prawn</Text>
                    <Text className="text-[#24527A]">Feeds Needed</Text>
                </View>
                <ScrollView className="max-h-96">
                { ponds ? ponds.map((pond, index) => (
                    <Pressable
                    key={index}
                    className={`flex-row justify-between px-6 py-4 bg-${selectedPond === index + 1 ? '[#C8E2F9]' : '[#E1EFFA]'} mb-2 rounded-lg items-center`}
                    onPress={() => {
                    setSelectedPond(prevSelectedPond => prevSelectedPond === index + 1 ? null : index + 1);
                    }}
                >
                    <Text className="font-semibold text-lg text-[#24527A] border-[.3px] rounded-md border-[#24527A] px-3 py-1">{index + 1}</Text>
                    <Image
                    source={require("../../../assets/line.png")}
                    style={{ width: 0.5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }}
                    />
                    <Text className="font-semibold text-lg text-[#24527A]">{counts && counts.length && counts.filter(count => count.pond_id === pond.pond_id).reduce((acc, count) => acc + count.count, 0).toString()}</Text>
                    <Image
                    source={require("../../../assets/line.png")}
                    style={{ width: 0.5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }}
                    />
                    <Text className="font-semibold text-lg text-[#24527A]">0kg</Text>
                </Pressable>
                )) : 
                <View className="flex-1 justify-center items-center">
                    <Text>No Ponds</Text>
                </View>}
                </ScrollView>
            </View>
            <View className="flex-row justify-between bg-[#ECF4FB]] border-t-[.3px] border-[#24527A] h-16 p-4 items-center">
                <View>
                <Text className="text-lg font-bold text-[#24527A]">Selected pond:</Text>
                <Text className="italic text-lg text-[#24527A]">{selectedPond ? `Pond ${selectedPond}` : 'No selected pond yet'}</Text>
                </View>
                <Pressable
                onPress={toggleSelectPond}
                className={`rounded-md flex flex-row items-center h-[36px] px-4  ${selectedPond ? 'bg-[#396387]' : 'bg-[#9DAEBC]'}`}
                disabled={!selectedPond}
                >
                <Text className="text-white text-lg">Continue</Text>
                </Pressable>
            </View>
        </View>
    );
}
