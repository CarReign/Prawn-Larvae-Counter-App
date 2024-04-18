import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView, ActivityIndicator, ToastAndroid } from "react-native";
import { supabase } from "../../libs/supabase";
import usePond from "../../hooks/usePond";
import useCount from "../../hooks/usecount";
import { PondTypeWithOrWithoutPondNumber } from "../../providers/pondprovider";
import { useResult } from "../dashboard/modals/resultmodal";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import getFeedNeeded from "../../utils/getfeedneeded";

interface IDashboardProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "selectPond">;
}

export default function SelectPond({ navigation }: IDashboardProps) {
    const { addCount } = useCount();
    const { ponds, loading } = usePond();
    const { counts } = useCount();
    const { result, setIsPaused, setResult } = useResult();
    const [selectedPond, setSelectedPond] = useState<PondTypeWithOrWithoutPondNumber | null>(null);
    const [addLoading, setAddLoading] = useState(false);

    const toggleSelectPond = async () => {
        if (addLoading || !selectedPond?.pond_id) return;
        setAddLoading(true);
        !!addCount && await addCount(selectedPond?.pond_id, result?.path || "", result?.count || 0);
        navigation.replace("dashboard")
        setResult(null);
        setIsPaused(false);
        setAddLoading(false);
    };

    const handleReturnToResultModal = () => {
        navigation.replace("dashboard");
        setIsPaused(false);
    }

    return (
        <View className="bg-[#ECF4FB] h-full flex flex-col justify-between">
            <View className="p-4 ">
                <View className="mb-6">
                    <Pressable
                        className="flex-row justify-center items-center h-10 rounded-md border-[#24527A] border-[.3px] px-4"
                        onPress={handleReturnToResultModal}
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
                    {ponds ? ponds.map((pond, index) => (
                        <Pressable
                            key={index}
                            className={`flex-row justify-between px-6 py-4 bg-${selectedPond?.pond_id === pond.pond_id ? '[#C8E2F9]' : '[#E1EFFA]'} mb-2 rounded-lg items-center`}
                            onPress={() => {
                                setSelectedPond(pond);
                            }}
                        >
                            <Text className="font-semibold text-lg text-[#24527A] border-[.3px] rounded-md border-[#24527A] px-3 py-1">{pond.pondNumber || index + 1}</Text>
                            <Image
                                source={require("../../../assets/line.png")}
                                style={{ width: 0.5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }}
                            />
                            <Text className="font-semibold text-lg text-[#24527A]">{pond.total_count || "Not Known"}</Text>
                            <Image
                                source={require("../../../assets/line.png")}
                                style={{ width: 0.5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }}
                            />
                            <Text className="font-semibold text-lg text-[#24527A]">{getFeedNeeded(pond.total_count || 0)} kg</Text>
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
                    <Text className="italic text-lg text-[#24527A]">{selectedPond ? `Pond ${selectedPond.pondNumber}` : 'No selected pond yet'}</Text>
                </View>
                <Pressable
                    onPress={toggleSelectPond}
                    className={`rounded-md flex flex-row items-center h-[36px] px-4  ${selectedPond ? 'bg-[#396387]' : 'bg-[#9DAEBC]'}`}
                    disabled={!selectedPond}
                >
                    {!addLoading && <Text className="text-white text-lg">Continue</Text>}
                    {!!addLoading && <><ActivityIndicator color="#ffffff" /><Text> ...</Text></>}
                </Pressable>
            </View>
        </View>
    );
}
