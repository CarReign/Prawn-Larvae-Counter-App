import { Pressable, Text, View } from "react-native";
import { Camera, CameraType, PermissionResponse } from 'expo-camera';
import { useEffect, useState } from "react";


export default function CustomCamera() {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [transition, setTransition] = useState(false);

    if (!permission?.granted) {
        requestPermission();
    }

    useEffect(() => {
        setTimeout(() => {
            setTransition(true);
        }, 1000);
        return () => {
            setTransition(false);
        }
    }, [permission]);

    return (
        <View className="flex-1">
            { transition ?
            <Camera type={CameraType.back} ratio="16:9" className="flex-1 aspect-auto bg-black">
                <View className="flex-1">
                    <View className="w-full absolute bottom-[30px] flex flex-col items-center justify-center">
                        <Pressable className=" min-h-[55px] min-w-[55px] rounded-full border flex flex-col items-center justify-center border-white ">
                            <View className=" min-h-[50px] min-w-[50px] bg-white rounded-full"></View>
                        </Pressable>
                    </View>
                </View>
            </Camera>
            :
            <View className="bg-black flex-1"></View>
            }
        </View>
    );
}