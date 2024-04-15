import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import ImageComponent from "./resultPicture";
import handleTakePicture from "../floatingcamera";


type ResultType = {
    count: number;
    path: string;
} | null;

type ResultContextProps = {
    result: ResultType;
    setResult: React.Dispatch<React.SetStateAction<ResultType>>;
}

export const ResultContext = React.createContext<ResultContextProps>({ result: { count: 0, path: "" }, setResult: () => { } });

export function useResult() {
    return React.useContext(ResultContext);
}

export default function ResultModal({ children }: { children: React.ReactNode }) {
    const [result, setResult] = useState<ResultType>(null);
    useEffect(() => {
        console.log("result is:", result);
    }, [result]);
    // count, path
    return (
        <ResultContext.Provider value={{ result, setResult }}>
            <Modal className="flex flex-1 max-w-2xl max-h-full z-10 "
                animationType="slide"
                transparent={true}
                visible={!!result}
            >
                <View className="absolute w-full bg-black opacity-50 h-full"></View>
                <View className="flex flex-col justify-center relative p-4 w-full content-center">
                    
                    <View className="bg-[#F9FCFF] flex flex-col justify-between p-4 mt-16 h-[540px] shadow-md rounded-md opacity-100">
                        <View className="flex flex-row mb-4 justify-between w-full border-b-[.3px] border-[#24527A] pb-2 mt-2">
                            <Text className="text-[20px] ">Count result</Text>
                            <Pressable onPress={() => setResult(null)}><Image source={require('../../../../assets/close.png')} /></Pressable>
                        </View>
                        <ImageComponent path={(!!result && !!result.path && result.path) || ""} />
                        <View className="flex flex-row justify-center items-end mb-4 mt-4">
                            <Text className="text-center text-[16px] pr-2 text-[#24527A]">There's</Text>
                            <Text className="text-center text-[24px] pr-2 text-[#24527A]">{!!result && !!result.count && result.count}</Text>
                            <Text className="text-center text-[16px] text-[#24527A]">prawns</Text>
                        </View>
                        <Pressable
                            className="bg-[#24527A] rounded-md py-3 px-3 mb-2 justify-center flex flex-row "
                            onPress={handleTakePicture}
                            
                        >
                            <Image source={require('../../../../assets/count-again.png')} />
                            <Text className="text-[#F9FCFF] pl-2">Count again</Text>
                        </Pressable>
                        <Pressable
                            className="bg-[#F9FCFF] py-3 px-3 border-[#315f88] rounded-md border"
                            onPress={() => setResult(null)}
                        >
                            <Text className="text-[#24527A] text-center">Add to pond</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {children}
        </ResultContext.Provider>

    );
}