import { View, Text, Image, Pressable, TextInput, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { FeedContext } from "../../providers/feedprovider";

export default function ChangeFeedCalculation() {
    const { feed, setFeed } = useContext(FeedContext)
    const [ newFeed, setNewFeed] = useState<any>(feed);

    useEffect(() => {
        console.log("new feed:", feed);
    }, [feed]);

    const handleChangeFeed = () => {
        console.log("feed:", feed);
        console.log("typed new feed:", newFeed);
        setFeed(newFeed);
        Alert.alert("Success", "Feed calculation updated successfully.");
    }
    return (
        <View className="pt-4 px-5  bg-[#ECF4FB] w-full h-full justify-between"> 
            <View className="justify-center">
                <View className="mb-6 mt-[250px]">
                    <View className="mb-3 flex flex-row w-full items-center justify-between">
                        <View className="flex flex-row items-center">
                            <TextInput
                                className="bg-[#F2F9FF] text-[18px] rounded p-2 text-[#1F375D] mr-1 text-center w-[68px] h-[36px]"
                                onChangeText={setNewFeed}
                                keyboardType="default"
                                value={String(newFeed)} 
                            />
                            <Text className="mb-1 text-[18px] mr-3 text-[#1F375D]">kilo/s</Text>
                        </View>
                        <Text className="mb-1 text-[18px] mr-3 text-[#1F375D]">for</Text>
                        <View className="flex flex-row items-center">
                            <Text className="mb-1 text-[24px] mr-1 text-[#1F375D]">100k</Text>
                            <Text className="mb-1 text-[18px] mr-3 text-[#1F375D]">prawns</Text>
                        </View>
                        </View>
                </View>
            </View>
            <View className="flex flex-row w-full justify-center pb-5">
                <Pressable className="flex flex-row flex-grow bg-[#F9FCFF] rounded-md h-[36px] pr-2 pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Text className="text-[#4B7293] text-[18px]">Cancel</Text>
                </Pressable>
                <Pressable
                onPress={handleChangeFeed} className="flex flex-row flex-grow bg-[#396387] rounded-md h-[36px] ml-3 pr-2 pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Text className="text-[#ECF4FB] text-[18px]">Save changes</Text>
                </Pressable>
            </View>
        </View>
    )
}