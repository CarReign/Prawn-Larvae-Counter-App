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
            !loading && <View className="">
                {
                    ponds ?
                    ponds.map((pond, index) => {
                        return <View key={pond.pond_id} className="flex flex-col justify-evenly p-4 border-b">
                            <Text>pond no. {index}</Text>
                            <Text> Counts: </Text>
                            <Text>{counts && counts.length && counts.filter(count => count.pond_id === pond.pond_id).reduce((acc, count) => acc + count.count, 0).toString()}</Text>
                            <Text>Feeds Needed</Text>
                            <Text>0 kg</Text>
                        </View>
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