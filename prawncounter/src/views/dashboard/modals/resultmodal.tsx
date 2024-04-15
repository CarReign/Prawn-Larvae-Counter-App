import React, {  useEffect, useState } from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import ImageComponent from "./resultPicture";

type ResultType = {
    count: number;
    path: string;
} | null;

type ResultContextProps  = {
    result: ResultType;
    setResult: React.Dispatch<React.SetStateAction<ResultType>>;
}

export const ResultContext = React.createContext<ResultContextProps>({result:{count:0, path:""}, setResult:()=>{}});

export function useResult() {
    return React.useContext(ResultContext);
}

export default function ResultModal({children}: {children: React.ReactNode}) {
    const [result, setResult] = useState<ResultType>(null);
    useEffect(() => {
        console.log("result is:", result);
    }, [result]);
    // count, path
    return (
        <ResultContext.Provider value={{result, setResult}}>
        <Modal className="flex flex-1 max-w-2xl max-h-full z-10 "
            animationType="slide"
            transparent={true}
            visible={!!result}
        >
            <View className="flex flex-col justify-center relative p-4 w-full content-center ">
                <ImageComponent path={(!!result && !!result.path && result.path) || ""}/>
                <View className="bg-[#F9FCFF] flex flex-row justify-between p-4 mt-16">
                    <Text className="">Count: {!!result && !!result.count && result.count}</Text>
                    <Pressable
                        className=""
                        onPress={() => setResult(null)}
                    >
                        <Text className="">Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        {children}
        </ResultContext.Provider>

    );
}