import { ActivityIndicator, Button, Image, Modal, Pressable, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useAuth from "../../hooks/useauth";
import { RootStackParamList } from "../../navigation/types";
import { supabase } from "../../libs/supabase";
import useFarm from "../../hooks/useFarm";
import Stat from "./stat";
import usePond from "../../hooks/usePond";
import useCount from "../../hooks/usecount";
import FloatingCamera from "./floatingcamera";
import DashboardTabs from "./tabs";
import getFeedNeeded from "../../utils/getfeedneeded";
import ResultModal, { useResult } from "./modals/resultmodal";

interface IDashboardProps {
    route: RouteProp<RootStackParamList, "dashboard">;
    navigation: NativeStackNavigationProp<RootStackParamList, "dashboard">;
}

export default function Dashboard({ route, navigation }: IDashboardProps) {
    const { farm, loading: farmLoading, username, refresh } = useFarm();
    const { ponds } = usePond();
    const { counts } = useCount();
    const { setNavigateCallback } = useResult();

    useEffect(() => {
        setNavigateCallback(() => () => { navigation.navigate("selectPond") })
    }, [])

    return (
        <>
            <View className=" flex-1 bg-[#BAD8F2] py-8">
                {
                    <>
                        <View className="">
                            {
                                !!farmLoading && <ActivityIndicator color="#2E78B8" />
                            }
                            {
                                !farmLoading && <View className="flex flex-col space-y-2">
                                    <View className="flex flex-row w-full justify-between mt-4 px-[20px]">
                                        <View className="">
                                            <Text className="text-[#24527A] text-[20px] font-bold">Welcome, {username}</Text>
                                            <Text className="text-[#24527A] text-[16px]">{farm?.farm_name}</Text>
                                        </View>
                                        <View className="flex flex-row space-x-4">
                                            <Pressable onPress={refresh} className="justify-center items-center py-1 px-2 border">
                                                <Text className="p-0 m-0">Refresh </Text>
                                            </Pressable>
                                            <Pressable onPress={() => navigation.navigate('settings')}>
                                                <Image className="" source={require('../../../assets/settings.png')}></Image>
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View className="flex flex-row justify-between pt-2 pb-4 px-[20px] mt-5 mb-1">
                                        <Stat figure={String(ponds?.reduce((acc, pond) => acc + (pond.total_count || 0), 0)) || "0"} stat="Prawns" />
                                        <Stat figure={String(getFeedNeeded(ponds?.reduce((acc, pond) => acc + (pond.total_count || 0), 0) || 0)) + ' kg'} stat="Feeds Needed" />
                                        <Stat figure={String(ponds?.length || 0)} stat="Ponds" />
                                    </View>
                                    <DashboardTabs />
                                </View>
                            }
                        </View>
                        <FloatingCamera />
                    </>
                }
            </View>
        </>
    );
}