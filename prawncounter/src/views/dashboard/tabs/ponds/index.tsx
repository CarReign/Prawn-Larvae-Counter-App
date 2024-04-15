import { ActivityIndicator, Text, View } from "react-native";
import usePond from "../../../../hooks/usePond";
import useCount from "../../../../hooks/usecount";

export default function PondTab(){
    const { ponds, loading } = usePond();
    const { counts } = useCount();

    return <>
        {
            loading && <View className="flex-1 justify-center items-center">
                <ActivityIndicator color="#2E78B8" />
                <Text>Loading...</Text>
            </View>
        }
        {
            !loading && <View className="bg-[#eff6fc] flex-col min-h-full">
                <View className="flex flex-row justify-evenly p-4 ml-4 mr-4">
                    <Text className="text-[#24527A]">Pond no.</Text>
                    <Text className="text-[#24527A]">Total prawn</Text>
                    <Text className="text-[#24527A]">Feeds Needed (in kg)</Text>
                    <Text className="text-[#24527A]">Action</Text>
                </View>
                {
                    ponds ?
                    ponds.map((pond, index) => {
                        return (
                            <View key={pond.pond_id} className="flex flex-row justify-between p-4 pl-6 pr-6 bg-[#C8E2F9] ml-5 mr-5 mb-2 text-[#24527A] rounded-lg">
                                <Text className="font-semibold text-[16px] text-[#24527A] border-[#24527A] rounded-md border pt-1 pr-2 pl-2" >{index}</Text>
                                <Text className="font-semibold text-[24px] text-[#24527A]">{counts && counts.length && counts.filter(count => count.pond_id === pond.pond_id).reduce((acc, count) => acc + count.count, 0).toString()}</Text>
                                <Text className="font-semibold text-[24px] text-[#24527A]">0 kg</Text>
                                <Text className="font-semibold text-[16px] text-[#24527A]">Edit</Text>
                            </View>

                        )
                    })
                    :
                    <View className="flex-1 justify-center items-center">
                        <Text>No Ponds</Text>
                    </View>
                }
            </View>
        }
    </>
}