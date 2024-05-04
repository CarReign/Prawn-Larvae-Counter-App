import { ActivityIndicator, Button, Image, Modal, Pressable, ScrollView, Text, View, RefreshControl } from "react-native";
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
    const { session } = useAuth();
    const { farm, loading: farmLoading, username, refresh } = useFarm();
    console.log("farm details:", farmLoading, farm, username)
    const { ponds } = usePond();
    const { counts } = useCount();
    const { setNavigateCallback } = useResult();
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        if (!session) {
            navigation.navigate("signin");
        } 

        setNavigateCallback(() => () => { navigation.navigate("selectPond") })
    }, [])

    useEffect(() => {
        if (!Object.keys(farm || {}).length) {
            navigation.replace("selectFarm");
        }
    }, [farm, farmLoading]);

    const onRefresh = async () => {
        setRefreshing(true);
        refresh
        console.log('refreshed')
        setRefreshing(false);
    }

    return (
        <>
            <View className=" flex-1 bg-[#BAD8F2] justify-center items-center pt-8 h-full">
                {
                    <>
                        <ScrollView className="flex-1 h-full" refreshControl={
                            <RefreshControl progressBackgroundColor={"#eff6fc"} colors={["#24527A"]} refreshing={refreshing} onRefresh={refresh} />
                        }>
                            {
                                !!farmLoading &&
                                <View className="flex text-center items-center justify-center h-full">
                                    <ActivityIndicator className="flex items-center " size={"large"} color="#24527A" />
                                    <Text className="flex items text-[#24527A]">  Please wait...</Text>
                                </View>
                            }
                            {
                                !farmLoading && <View className="flex flex-col">
                                    <View className="flex flex-row w-full justify-between mt-4 px-[20px]">
                                        <View className="">
                                            <Text className="text-[#24527A] text-[20px] font-bold">Welcome, {username || ""}</Text>
                                            <Text className="text-[#24527A] text-[16px]">{farm?.farm_name}</Text>
                                        </View>
                                        <View className="flex flex-row space-x-4">
                                            <Pressable onPress={() => navigation.navigate('settings')}>
                                                <Image className="" source={require('../../../assets/settings.png')}></Image>
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View className="flex flex-row justify-between pb-4 px-[20px] mt-4 mb-1">
                                        <Stat figure={String(ponds?.reduce((acc, pond) => acc + (pond.total_count || 0), 0)) || "0"} stat="Prawns" />
                                        <Stat figure={String(getFeedNeeded(ponds?.reduce((acc, pond) => acc + (pond.total_count || 0), 0) || 0)) + ' kg'} stat="Feeds Needed" />
                                        <Stat figure={String(ponds?.length || 0)} stat="Ponds" />
                                    </View>
                                    <DashboardTabs />

                                </View>

                            }
                        </ScrollView>
                        <FloatingCamera />
                    </>
                }
            </View>
        </>
    );
}