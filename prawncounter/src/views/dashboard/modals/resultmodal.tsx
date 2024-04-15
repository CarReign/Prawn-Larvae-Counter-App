import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import ImageComponent from "./resultPicture";

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
                <View className="flex flex-col justify-center relative p-4 w-full content-center ">
                    <View className="bg-[#F9FCFF] flex flex-col justify-between p-4 mt-16 h-[420px] shadow-md rounded-md">
                        <ImageComponent path={(!!result && !!result.path && result.path) || ""} />
                        <Text className="text-center text-[16px">Count: {!!result && !!result.count && result.count}</Text>
                        <Pressable
                            className="bg-blue-500 rounded-md py-2 px-3"
                            onPress={() => setResult(null)}
                        >
                            <Text className="text-white text-center">Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {children}
        </ResultContext.Provider>

    );
}