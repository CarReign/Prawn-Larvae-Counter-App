import { View, Text, Image, Pressable, TextInput } from "react-native";

export default function ChangePassword() {
    return (
        <View className="pt-4 px-5  bg-[#ECF4FB] w-full h-full justify-between">
            <View className="">
                <View className="mb-6">
                    <View className="mb-3 flex flex-row w-full items-center justify-between">
                        <Text className="text-[18px] mb-1 mr-3 text-[#24527A]">Current password:</Text>
                        <TextInput
                            className="bg-[#F2F9FF] text-[18px] rounded p-2 text-[#24527A]  w-[180px] h-[36px]"
                            onChangeText={undefined}
                            keyboardType="numeric"
                            value={"*****"}
                        />
                    </View>
                    <View className="mb-3 flex flex-row w-full items-center justify-between">
                        <Text className="text-[16px] mb-1 text-[18px] mr-3 text-[#24527A]">New password:</Text>
                        <TextInput
                            className="bg-[#F2F9FF] text-[18px] rounded p-2 text-[#24527A] w-[180px] h-[36px]"
                            onChangeText={undefined}
                            keyboardType="numeric"
                            value={"*****"}
                        />
                    </View>
                    <View className="mb-3 flex flex-row w-full items-center justify-between">
                        <Text className="text-[16px] text-[18px] mb-1 mr-3 text-[#24527A]">Confirm password:</Text>
                        <TextInput
                            className="bg-[#F2F9FF] text-[18px] rounded p-2 text-[#24527A]  w-[180px] h-[36px]"
                            onChangeText={undefined}
                            keyboardType="numeric"
                            value={"*****"}
                        />
                    </View>
                </View>
            </View>
            <View className="flex flex-row w-full justify-center pb-5">
                <Pressable className="flex flex-row flex-grow bg-[#F9FCFF] rounded-md h-[36px] pr-2 pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Text className="text-[#4B7293] text-[18px]">Cancel</Text>
                </Pressable>
                <Pressable className="flex flex-row flex-grow bg-[#396387] rounded-md h-[36px] ml-3 pr-2 pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Text className="text-[#ECF4FB] text-[18px]">Save changes</Text>
                </Pressable>
            </View>
        </View>
    )
}