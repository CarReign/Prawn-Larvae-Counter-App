import { ActivityIndicator, Text, View, Image, ScrollView, Pressable, Modal } from "react-native";
import useCount from "../../../../hooks/usecount";
import usePond from "../../../../hooks/usePond";
import moment from "moment-timezone";
import React, { useState } from "react";
import ImageComponent from "../../modals/resultPicture";

export default function HistoryTab() {
    const { ponds } = usePond();
    const { counts, loading } = useCount();
    const [ pictureModal, setPictureModal ] = useState(false);
    const [ count, setCount ] = useState<any>(null);

    const toggleResulPicture = (count:any) => {
        console.log(count)
        setCount(count);
        setPictureModal(true);
    }

    return <><View className="bg-[#eff6fc] flex-col flex  min-h-full">
        <View className="flex flex-row justify-evenly pt-4 pb-2 ml-5 mr-5 border-b-[1px] border-[#9fbcd4]">
            <Text className="text-[#24527A] pl-2">     Date       </Text>
            <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#ffffff", marginTop: 3 }} />
            <Text className="text-[#24527A]">      Time </Text>
            <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#ffffff", marginTop: 3 }} />
            <Text className="text-[#24527A]">Pond no.</Text>
            <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#ffffff", marginTop: 3 }} />
            <Text className="text-[#24527A] pr-1">Count    </Text>
        </View>
        <ScrollView className="max-h-[450px] min-h-[300px]" contentContainerStyle={{ flexGrow: 1 }}>

            {
                loading && <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#2E78B8" />
                    <Text>Loading...</Text>
                </View>
            }
            {
                !loading && <View className="min-h-full bg-[#eff6fc]">
                    {
                        counts ?
                            counts.map((count, index) => {
                                return <View key={index} className="flex flex-row justify-between px-3 pt-3 border-b-[.3px] border-[#9fbcd4]  ml-5 mr-5 pr-6">
                                    <Text className="text-[#24527A]">{moment.tz(count.created_at, moment.tz.guess()).format("MM/D/YYYY")}</Text>
                                    <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }} />
                                    <Text className="text-[#24527A]">{moment.tz(count.created_at, moment.tz.guess()).format("hh:mm a")}</Text>
                                    <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }} />
                                    <Text className="text-[#24527A]">{ponds?.find((pond) => pond.pond_id === count.pond_id)?.pondNumber || "Not Known"}</Text>
                                    <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }} />
                                    <Pressable className="bg-[#24527A] rounded-md py-1 px-3 mb-3 justify-center flex flex-row items-center" onPress={() => toggleResulPicture(count)}>
                                        <Text className="text-[#F9FCFF]">{count.count}</Text>
                                    </Pressable>
                                    
                                </View>
                            })
                            :
                            <View className="flex-1 justify-center items-center">
                                <Text>No History</Text>
                            </View>
                    }
                </View>
            }
        </ScrollView>
        {pictureModal && 
        <Modal className="flex  max-w-2xl h-[300px] z-10 "
        animationType="slide"
        transparent={true}
    >
        <View className="absolute w-full bg-black opacity-50 h-full"></View>
        <View className="flex flex-col justify-center relative p-4 w-full  content-center">
            <View className="bg-[#F9FCFF] flex flex-col justify-between p-4 mt-12 h-[530px] shadow-md rounded-md opacity-100">
                <View className="flex flex-row mb-4 justify-between w-full border-b-[.3px] border-[#24527A] pb-2 mt-0">
                    <Text className="text-[20px] text-[#24527A]">Count result</Text>
                    <Pressable onPress={() => setPictureModal(false)}
                        className="mt-1">
                        <Image source={require('../../../../../assets/close.png')} />
                    </Pressable>
                </View>
                <ImageComponent path={count.path}/>
                <View className="flex flex-row justify-center items-end mb-4 mt-4">
                    <Text className="text-center text-[16px] pr-2 text-[#24527A]">There's</Text>
                    <Text className="text-center text-[24px] pr-2 text-[#24527A]">{ count.count}</Text>
                    <Text className="text-center text-[16px] text-[#24527A]">prawns</Text>
                </View>
            </View>
        </View>
    </Modal>
        }
    </View>
    </>


}