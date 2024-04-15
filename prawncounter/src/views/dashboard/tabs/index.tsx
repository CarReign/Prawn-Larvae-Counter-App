import { useState } from "react";
import { Pressable, Text, View } from "react-native";
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

    return <View className="h-full bg-[#B2D1ED]">
        <View className="min-h-[40px] flex flex-row justify-between ">
            <Pressable 
                className={`rounded-t-lg items-center flex-grow justify-center ${selectedTab === "pond" ? "bg-[#eff6fc]" : "bg-[#E2EFFA]"}`}
                onPress={handleChangeTab("pond")}
            >
                <Text className="text-[16px]">Pond</Text>
            </Pressable>
            <Pressable 
                className={`rounded-t-lg flex-grow items-center justify-center ${selectedTab === "history" ? "bg-[#eff6fc]" : "bg-[#E2EFFA]"}`}
                onPress={handleChangeTab("history")}
                >
                <Text className="text-[16px]">History</Text>
            </Pressable>
        </View>
        <View>
            {
                selectedTab === "pond" && <PondTab />
            }
            {
                selectedTab === "history" && <HistoryTab />
            }
        </View>
    </View>
}