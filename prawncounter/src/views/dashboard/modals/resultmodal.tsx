import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import ImageComponent from "./resultPicture";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { PondTypeWithOrWithoutPondNumber } from "../../../providers/pondprovider";
import { handleTakePicture } from "../../../utils/takepicture/takepicture";
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data';
import uuid from 'react-native-uuid';
import axios from "axios";

type ResultType = {
    count: number;
    path: string;
} | null;

type ResultContextProps = {
    result: ResultType;
    setResult: React.Dispatch<React.SetStateAction<ResultType>>;
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
    setNavigateCallback: Dispatch<SetStateAction<(() => void) | undefined>>;
    loading?: boolean;
}

export const ResultContext = React.createContext<ResultContextProps>({ result: { count: 0, path: "" }, setResult: () => { }, setIsPaused: () => { }, setNavigateCallback: () => { } });

export function useResult() {
    return React.useContext(ResultContext);
}

export default function ResultModal({ children, navigation }: { children: React.ReactNode, navigation: any }) {
    const [isPaused, setIsPaused] = useState(false);
    const [result, setResult] = useState<ResultType>(null);
    const [loading, setLoading] = useState(false);
    const [navigateCallback, setNavigateCallback] = useState<() => void>();

    useEffect(() => {
        console.log("NAVIGATE CALLBACK -", navigateCallback);
    }, [navigateCallback])

    useEffect(() => {
        console.log("result is:", result);
    }, [result]);

    const handleTakePictureAgain = () => {
        setResult(null);
        setLoading(true);
        handleTakePicture((resultingImageUri) => {
            FileSystem.readAsStringAsync(resultingImageUri).then(async (response: string) => {
                const formData = new FormData();
                // // const newBlob: any =  await axios.get(`data:image/jpeg;base64,${Buffer.from(response, 'binary').toString('base64')}`);
                // console.log("Blob Value:", `data:image/jpeg;base64,${Buffer.from(response, 'binary').toString('base64')}`)
                formData.append('image-to-count', {
                    uri: resultingImageUri,
                    name: `${uuid.v4()}.jpg`,
                    type: 'image/jpeg'
                });
                console.log("formdata:", formData)
                axios.post('https://prawn-larvae-counter-app.vercel.app/api/counter/image',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data', 'x-prawncounter-api-key': "2020-0550" } }
                ).then((response: any) => {
                    setResult({ count: response.data.count, path: response.data.path });
                }).catch((error) => console.log("error is:", error)).finally(() => setLoading(false))
            });
        });
    }

    return (
        <ResultContext.Provider value={{ result, setResult, setIsPaused, setNavigateCallback, loading }}>
            <Modal className="flex  max-w-2xl max-h-full z-10 "
                animationType="slide"
                transparent={true}
                visible={!!result && !isPaused}
            >
                <View className="absolute w-full bg-black opacity-50 h-full"></View>
                <View className="flex flex-col justify-center relative p-4 w-full  content-center">

                    <View className="bg-[#F9FCFF] flex flex-col justify-between p-4 mt-6 h-[640px] shadow-md rounded-md opacity-100">
                        <View className="flex flex-row mb-4 justify-between w-full border-b-[.3px] border-[#1F375D] pb-2 mt-0">
                            <Text className="text-[20px] text-[#1F375D]">Count result</Text>
                            <Pressable onPress={() => setResult(null)}
                                className="mt-1">
                                <Image source={require('../../../../assets/close.png')} />
                            </Pressable>
                        </View>
                        <ImageComponent path={(!!result && !!result.path && result.path) || ""} />
                        <View className="flex flex-row justify-center items-end mb-4 mt-4">
                            <Text className="text-center text-[16px] pr-2 text-[#1F375D]">There's</Text>
                            <Text className="text-center text-[24px] pr-2 text-[#1F375D]">{!!result && !!result.count && result.count}</Text>
                            <Text className="text-center text-[16px] text-[#1F375D]">prawns</Text>
                        </View>
                        <Pressable
                            className="bg-[#1F375D] rounded-md py-3 px-3 mb-2 justify-center flex flex-row items-center"
                            onPress={handleTakePictureAgain}

                        >
                            <Image source={require('../../../../assets/count-again.png')} style={{ width: 12, height: 12 }} />
                            <Text className="text-[#F9FCFF] pl-1">Count again</Text>
                        </Pressable>
                        <Pressable
                            className="bg-[#F9FCFF] py-3 px-3 flex flex-row justify-center items-center border-[#315f88] rounded-md border"
                            onPress={() => { setIsPaused(true); navigateCallback && navigateCallback() }}
                        >
                            <Image source={require('../../../../assets/add.png')} style={{ width: 12, height: 12 }} />
                            <Text className="text-[#1F375D] pl-1 text-center">Add to pond</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {children}
        </ResultContext.Provider>

    );
}