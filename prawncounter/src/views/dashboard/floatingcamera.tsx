import { useEffect, useState } from "react";
import uuid from 'react-native-uuid';
import { ActivityIndicator, Image, Pressable, View, Text,} from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Buffer } from 'buffer';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import useCount from "../../hooks/usecount";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data';
import { useResult } from "./modals/resultmodal";
import { handleTakePicture } from "../../utils/takepicture/takepicture";

export default function FloatingCamera() {
    const [currentImageUri, setCurrentImageUri] = useState<string>("");
    const [toggle, setToggle] = useState<boolean>(false);
    const { result, setResult, setNavigateCallback, loading: resultLoading } = useResult();
    const [loading, setLoading] = useState<boolean>(false);
    const { addCount } = useCount();

    const opacity = useSharedValue(0);
    const uploadButtonBottom = useSharedValue(30);
    const cameraButtonBottom = useSharedValue(30);

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const uploadStyle = useAnimatedStyle(() => ({ 
        bottom: withTiming(uploadButtonBottom.value, config), 
        opacity: withTiming(opacity.value, config) 
    }));
    const cameraStyle = useAnimatedStyle(() => ({ 
        bottom: withTiming(cameraButtonBottom.value, config), 
        opacity: withTiming(opacity.value, config) 
    }));

    useEffect(() => {
        if (currentImageUri) {
            setLoading(true);
            console.log("currentImageUri is:", currentImageUri);
            FileSystem.readAsStringAsync(currentImageUri).then(async (response: string) => {
                const formData = new FormData();
                // // const newBlob: any =  await axios.get(`data:image/jpeg;base64,${Buffer.from(response, 'binary').toString('base64')}`);
                // console.log("Blob Value:", `data:image/jpeg;base64,${Buffer.from(response, 'binary').toString('base64')}`)
                formData.append('image-to-count', {
                    uri: currentImageUri,
                    name: `${uuid.v4()}.jpg`,
                    type: 'image/jpeg'
                });
                console.log("formdata:", formData)
                axios.post('https://prawn-larvae-counter-app.vercel.app/api/counter/image',
                // axios.post('http://localhost:3000/api/counter/image',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                ).then((response: any) => {
                    setResult({ count: response.data.count, path: response.data.path });
                }).catch((error) => console.log("error is:", error)).finally(() => setLoading(false))

            }).catch((error) => console.log("error is:", error))
                .finally(() => {
                    setCurrentImageUri("");
                });
        } else {
            setLoading(false);
        }
    }, [currentImageUri]);

    useEffect(() => {
        if (toggle) {
            opacity.value = 1;
            uploadButtonBottom.value = 94.5;
            cameraButtonBottom.value = 160;
        } else {
            opacity.value = 0;
            uploadButtonBottom.value = 30;
            cameraButtonBottom.value = 30;
        }
    }, [toggle]);

    return <><Pressable
        className="z-[1000] flex items-center justify-center min-h-[55px] min-w-[55px] rounded-[8px] bg-[#1F375D] absolute pl-[12px] shadow-xl pr-[16px] py-[8px]"
        style={{ bottom: 30, right: 25}}
        onPress={() => !loading && !resultLoading && setToggle(!toggle)}
    >
        {(loading || resultLoading) && <ActivityIndicator color="#eff6fc" size={"small"}/>}
        {(!loading && !resultLoading) && 
        <View className="flex flex-row">
            {!toggle && <><Image className="" source={require('../../../assets/camera.png')} style={{ width: 36, height: 36 }} />
            <View className="flex flex-col pl-[8px] pt-[2px]">
                <Text className="text-white text-[16px] font-medium">Start</Text>
                <Text className="text-white mt-[-4px] text-[16px] font-medium">Count</Text>
            </View></>}
            {
                toggle && <><Image className="" source={require('../../../assets/camera.png')} style={{ width: 36, height: 36 }} />
                <View className="flex flex-col pl-[8px] pt-[2px]">
                    <Text className="text-white text-[16px] font-medium">Cancel</Text>
                    </View></>
            }
        </View>}
    </Pressable>
    <Animated.View className=" z-[10] right-[25px] flex items-center justify-center min-h-[55px] min-w-[55px] rounded-[8px] bg-[#1F375D] absolute pl-[12px] shadow-xl pr-[16px] py-[8px]" style={{...uploadStyle}}>
        <Pressable onPress={() => {
            handleTakePicture((imageUri) => setCurrentImageUri(imageUri), false);
            setToggle(false);
        }}>
            <Text className="text-white text-[16px] font-medium">Upload Image</Text>
        </Pressable>
    </Animated.View>
    <Animated.View className=" z-[10] right-[25px] flex items-center justify-center min-h-[55px] min-w-[55px] rounded-[8px] bg-[#1F375D] absolute pl-[12px] shadow-xl pr-[16px] py-[8px]" style={{...cameraStyle}}>
        <Pressable
            onPress={() => {
                handleTakePicture((imageUri) => setCurrentImageUri(imageUri));
                setToggle(false);
            }}
        >
            <Text className="text-white text-[16px] font-medium">Take Picture</Text>
        </Pressable>
    </Animated.View>
    </>
}

// handleTakePicture((imageUri) => setCurrentImageUri(imageUri)