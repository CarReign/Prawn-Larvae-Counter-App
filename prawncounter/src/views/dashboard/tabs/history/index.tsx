import { ActivityIndicator, Text, View, Image, ScrollView } from "react-native";
import useCount from "../../../../hooks/usecount";
import usePond from "../../../../hooks/usePond";
import moment from "moment-timezone";

export default function HistoryTab() {
    const { ponds } = usePond();
    const { counts, loading } = useCount();

    return <><View className="bg-[#eff6fc] flex-col flex  min-h-full">
        <View className="flex flex-row justify-evenly pt-4 pb-2 ml-5 mr-5 border-b-[1px] border-[#9fbcd4]">
            <Text className="text-[#24527A] pl-2">     Date       </Text>
            <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#ffffff", marginTop: 3 }} />
            <Text className="text-[#24527A]">      Time </Text>
            <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#ffffff", marginTop: 3 }} />
            <Text className="text-[#24527A]">Pond no.</Text>
            <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#ffffff", marginTop: 3 }} />
            <Text className="text-[#24527A] pr-1">Count</Text>
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
                                return <View key={index} className="flex flex-row justify-between p-3 border-b-[.3px] border-[#9fbcd4]  ml-5 mr-5 pr-6">
                                    <Text className="text-[#24527A]">{moment.tz(count.created_at, moment.tz.guess()).format("MM/D/YYYY")}</Text>
                                    <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }} />
                                    <Text className="text-[#24527A]">{moment.tz(count.created_at, moment.tz.guess()).format("hh:mm a")}</Text>
                                    <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }} />
                                    <Text className="text-[#24527A]">{ponds?.find((pond) => pond.pond_id === count.pond_id)?.pondNumber || "Not Known"}</Text>
                                    <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }} />
                                    <Text className="text-[#24527A]">{count.count}</Text>
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
    </View>
    </>


}