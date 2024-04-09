import { ActivityIndicator, Text, View } from "react-native";
import useCount from "../../../../hooks/usecount";


export default function HistoryTab() {
    const { counts, loading } = useCount();

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
                    counts ?
                    counts.map((count, index) => {
                        return <View key={count.count_id} className="flex flex-col justify-evenly p-4 border-b">
                            <Text>pond no. {index}</Text>
                            <Text> Count: </Text>
                            <Text>{count.count}</Text>
                        </View>
                    })
                    :
                    <View className="flex-1 justify-center items-center">
                        <Text>No History</Text>
                    </View>
                }
            </View>
        }
    </>
}