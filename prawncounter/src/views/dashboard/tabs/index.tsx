import { useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import Ponds from "./ponds";
import PondTab from "./ponds";
import HistoryTab from "./history";

export default function DashboardTabs() {
    const [selectedTab, setSelectedTab] = useState<"pond" | "history">("pond")

    const handleChangeTab = (tab: "pond" | "history") => {
        return () => {
            setSelectedTab(tab);
        }
    };

    return <View className="flex h-[550] bg-[#EFF4FF]">
        <View className="min-h-[40px] flex flex-row justify-between ">
            <Pressable 
                className={`rounded-t-lg items-center flex-grow flex-row justify-center ${selectedTab === "pond" ? "bg-[#eff6fc]" : "bg-[#D5E0F1]"}`}
                onPress={handleChangeTab("pond")}
            >
                <Image className="" source={require('../../../../assets/ponds.png')} style={{ width: 16, height: 16 }} />
                <Text className="text-[16px] text-[#1F375D]">  Pond  </Text>
            </Pressable>
            <Pressable 
                className={`rounded-t-lg flex-grow  flex-row items-center justify-center ${selectedTab === "history" ? "bg-[#eff6fc]" : "bg-[#D5E0F1]"}`}
                onPress={handleChangeTab("history")}
                >
                <Image className="" source={require('../../../../assets/history.png')} style={{ width: 16, height: 16 }} />
                <Text className="text-[16px] text-[#1F375D]">  History</Text>
            </Pressable>
        </View>
        <View className="flex min-h-full">
            {
                selectedTab === "pond" && <PondTab />
            }
            {
                selectedTab === "history" && <HistoryTab />
            }
        </View>
    </View>
}