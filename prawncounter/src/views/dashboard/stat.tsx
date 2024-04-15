import { Text, View } from "react-native";

export default function Stat({ stat, figure }: { stat: string, figure: string }) {

    return <View className="bg-[#E1EFFA] min-w-[95px] min-h-[20px] flex flex-col rounded-[4px] justify-center items-center p-[18px]">
        <Text className="text-[#24527A] text-center text-[22px] font-semibold">{figure}</Text>
        <Text className="text-[#24527A] text-center font-light">{stat}</Text>
    </View>

}