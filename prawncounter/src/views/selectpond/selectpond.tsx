import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { supabase } from "../../libs/supabase";

interface IDashboardProps {
  navigation: any; // Adjust the type based on your navigation setup
}

export default function SelectPond({ navigation }: IDashboardProps) {
  const [selectedPond, setSelectedPond] = useState<number | null>(null); // State to keep track of selected pond

  const toggleLogoutModal = () => {
    console.log("logout");
    setLogoutModalVisibility(!logoutModalVisibility);
  };

  const [logoutModalVisibility, setLogoutModalVisibility] = useState(false);

  const handleLogoutModal = (pond: any) => {
    supabase.auth.signOut().then(() => {
      navigation.replace("signin");
    });
  };

  const pondItems = [
    { pondNo: 1, totalPrawn: 0, feedsNeeded: "0 kg" },
    { pondNo: 2, totalPrawn: 0, feedsNeeded: "0 kg" },
    // Add more pond items as needed
  ];

  return (
    <View className="bg-[#ECF4FB] h-full flex flex-col justify-between">
        <View className="p-4 ">
            <View className="mb-6">
            <Pressable
                className="flex-row justify-center items-center h-10 border rounded-md border-blue-500 px-4"
                onPress={() => navigation.navigate("editAccount")}
            >
                <Image
                source={require("../../../assets/add.png")}
                style={{ width: 14, height: 14 }}
                />
                <Text className="font-bold text-base text-blue-500 pl-2">Create new pond</Text>
            </Pressable>
            </View>
            <View className="flex-row justify-between p-4">
            <Text className="text-blue-500">Pond no.</Text>
            <Text className="text-blue-500">Total prawn</Text>
            <Text className="text-blue-500">Feeds Needed</Text>
            </View>
            <ScrollView className="max-h-96">
            {pondItems.map((pond, index) => (
                <Pressable
                key={index}
                className={`flex-row justify-between w-full p-4 bg-[#000000] mb-2 rounded-lg items-center`}
                onPress={() => {
                  // Handle selection of the pond item
                  setSelectedPond(prevSelectedPond => prevSelectedPond === pond.pondNo ? null : pond.pondNo);
                }}
              >
                <Text className="font-semibold text-lg text-blue-500 border rounded-md border-blue-500 px-3 py-1">{pond.pondNo}</Text>
                <Image
                  source={require("../../../assets/line.png")}
                  style={{ width: 0.5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }}
                />
                <Text className="font-semibold text-lg text-blue-500">{pond.totalPrawn}</Text>
                <Image
                  source={require("../../../assets/line.png")}
                  style={{ width: 0.5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }}
                />
                <Text className="font-semibold text-lg text-blue-500">{pond.feedsNeeded}</Text>
              </Pressable>
            ))}
            </ScrollView>
        </View>
        <View className="flex-row justify-between bg-[#ECF4FB]] border-t border-blue-500 h-16 p-4 items-center">
            <View>
            <Text className="text-lg font-bold text-blue-500">Selected pond:</Text>
            <Text className="italic text-lg text-blue-500">{selectedPond ? `Pond ${selectedPond}` : 'No selected pond yet'}</Text>
            </View>
            <Pressable
            onPress={toggleLogoutModal}
            className={`rounded-md flex flex-row items-center h-[36px] px-4  ${selectedPond ? 'bg-[#396387]' : 'bg-[#9DAEBC]'}`}
            disabled={!selectedPond} // Disable the button if no pond is selected
            >
            <Text className="text-white text-lg">Continue</Text>
            </Pressable>
        </View>
    </View>
  );
}
