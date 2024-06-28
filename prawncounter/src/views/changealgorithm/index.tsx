import { View, Text, Image, Pressable, TextInput } from "react-native";
import Dropdown from "./dropdown";

export default function ChangeAlgorithm() {
    const options = ['Canny-edge detection', 'Contour-based', 'Blob-detection'];

    const handleSelect = (option: string) => {
        console.log('Selected option:', option);
  };
    return (
        <View className="pt-4 px-5  bg-[#ECF4FB] w-full h-full justify-between">
            <View className="">
                <View className="mb-6">
                    <View className="pb-3 pt-3 flex flex-col w-full items-center justify-between border-b-[.3px] border-b-[#cbdbe9]">
                        <Text className="bg-[#D5E0F1] text-[18px] rounded p-2 text-[#1F375D]  w-full h-[36px]">Canny-edge detection</Text>
                        <Dropdown options={options} onSelect={handleSelect}/>
                        <Image className="mr-2 ml-2 absolute mt-[42px]" source={require('../../../assets/swap.png')} style={{ width: 24, height: 24 }} />
                    </View>
                    <View className="pb-3 pt-3 flex flex-col w-full items-center justify-between border-b-[.3px] border-b-[#cbdbe9]">
                        <Text className="bg-[#D5E0F1] text-[18px] rounded p-2 text-[#1F375D]  w-full h-[36px]">Contour-based</Text>
                        <Dropdown options={options} onSelect={handleSelect}/>
                        <Image className="mr-2 ml-2 absolute mt-[42px]" source={require('../../../assets/swap.png')} style={{ width: 24, height: 24 }} />
                    </View>
                    <View className="pb-3 pt-3 flex flex-col w-full items-center justify-between">
                        <Text className="bg-[#D5E0F1] text-[18px] rounded p-2 text-[#1F375D]  w-full h-[36px]">Blob-detection</Text>
                        <Dropdown options={options} onSelect={handleSelect}/>
                        <Image className="mr-2 ml-2 absolute mt-[42px]" source={require('../../../assets/swap.png')} style={{ width: 24, height: 24 }} />
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