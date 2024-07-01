import { Pressable, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from "react";


export default function CustomCamera() {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission?.granted) {
        requestPermission();
    }

    return (
        <View className="flex-1 d-flex justify-center bg-[#F2F9FF]">
            <CameraView facing="back" mode="picture" enableTorch={false} zoom={0} className=" min-w-full min-h-[512px] max-h-[80%] mt-[30px] aspect-auto bg-black">
                <View className="absolute top-1/2 translate-y-1/2 self-center">
                    <Text className="color-white">Please focus your camera on larvae prawn container</Text>
                </View>
            </CameraView>
            <View className="w-full py-8 flex flex-row items-center justify-evenly">
                <Pressable className=" min-h-[55px] min-w-[55px] rounded-full border flex flex-col items-center justify-center border-[#1F375D] ">
                    <Text className="text-[#1F375D] text-[16px] mb-0 leading-none ">❌</Text>
                </Pressable>
                <Pressable className=" min-h-[55px] min-w-[55px] rounded-full border flex flex-col items-center justify-center border-[#1F375D] ">
                    <View className=" min-h-[50px] min-w-[50px] bg-[#1F375D] rounded-full"></View>
                </Pressable>
                <View className="min-w-[55px]"/>
            </View> 
        </View>
    );
}