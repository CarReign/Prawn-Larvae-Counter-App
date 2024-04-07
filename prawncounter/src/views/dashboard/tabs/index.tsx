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

    return <View className="border h-full">
        <View className="min-h-[40px] flex flex-row justify-between border">
            <Pressable 
                className={`items-center flex-grow justify-center ${selectedTab === "pond" ? "bg-white" : "bg-[#E2EFFA]"}`}
                onPress={handleChangeTab("pond")}
            >
                <Text>Pond</Text>
            </Pressable>
            <Pressable 
                className={`flex-grow items-center justify-center ${selectedTab === "history" ? "bg-white" : "bg-[#E2EFFA]"}`}
                onPress={handleChangeTab("history")}
                >
                <Text>History</Text>
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