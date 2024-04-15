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
import ResultModal from "./modals/resultmodal";

interface IDashboardProps {
    route: RouteProp<RootStackParamList, "dashboard">;
    navigation: NativeStackNavigationProp<RootStackParamList, "dashboard">;
}

export default function Dashboard({ route, navigation }: IDashboardProps) {
    const [proceed, setProceed] = useState<boolean>(false);
    const { farm, loading: farmLoading, username } = useFarm();
    const { ponds } = usePond();
    const { counts } = useCount();
    
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);

    const { session, loading } = useAuth();

    useEffect(() => {
        let timeoutNavigateToSignIn: NodeJS.Timeout;
        if (!loading && session) {
            timeoutNavigateToSignIn = setTimeout(() => {
                setProceed(true);
            }, 1000);
        } else if (!loading && !session) {
            timeoutNavigateToSignIn = setTimeout(() => {
                navigation.push("signin");
            }, 1000);
        }
        return () => {
            clearTimeout(timeoutNavigateToSignIn);
        }
    }, [session, loading])
    

    return (
        <>
        <ResultModal>
        <View className=" flex-1 bg-[#BAD8F2] py-8">
            {
                proceed && <>
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
                                    <View>
                                        <Image className="" source={require('../../../assets/settings.png')}></Image>
                                    </View>
                                </View>
                                <View className="flex flex-row justify-between pt-2 pb-4 px-[20px]">
                                    <Stat figure={counts ? String(counts.length && counts.reduce((acc, count) => acc + count.count, 0)) : "0"} stat="Prawns" />
                                    <Stat figure={String(getFeedNeeded(counts ? counts.length && counts.reduce((acc, count) => acc + count.count, 0) : 0)) + ' kg'} stat="Feeds Needed" />
                                    <Stat figure={String(ponds?.length || 0)} stat="Ponds" />
                                </View>
                                <DashboardTabs />
                            </View>
                        }
                    </View>
                    <FloatingCamera />
                </>
            }
            {
                !proceed && <View className="flex-1 flex-col items-center justify-center">
                    <Image source={require('../../../assets/title.png')} className="mb-[24px]" />
                </View>
            }
        </View>
        </ResultModal>
        </>
    );
}