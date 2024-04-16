import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, TextInput } from 'react-native';
import handleTakePicture from "../floatingcamera";
import ImageComponent from "./resultPicture";
import Overlay from "../overlay";


type PondType = {
    pondNo: number;
    count: number;
    // Add more properties as needed
}

type AddPondModalProps = {
    onClose: () => void;
    onAddPond: (pond: PondType) => void;
}

export default function AddPondModal({ onClose, onAddPond }: AddPondModalProps) {
    const [pondNumber, setPondNumber] = useState<number>(0);
    const [pondCount, setPondCount] = useState<number>(0);

    const handleAddPond = () => {
        const newPond: PondType = {
            pondNo: pondNumber,
            count: pondCount,
        };

        onAddPond(newPond);

        onClose();
    };

    return (
        <Modal className="flex flex-1 max-w-2xl max-h-full z-10"
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <Overlay/>
            <View className="flex items-center justify-center h-full">
                <View className="bg-white w-3/4 p-4 rounded-lg flex">
                    <View className="flex flex-row mb-4 justify-between w-full border-b-[.3px] border-[#24527A] pb-2">
                        <Text className="text-[20px] text-[#24527A]">Add new pond</Text>
                        <Pressable className="pt-1" onPress={() => onClose()}><Image source={require('../../../../assets/close.png')} /></Pressable>
                    </View>
                    <View className="flex mb-4 w-full justify-items-end">
                        <Text className="text-sm text-[#24527A] flex">Pond number:</Text>
                        
                    </View>
                    <View className="mb-2">
                        <Text className="text-sm mb-1 text-[#24527A]">Prawn count</Text>
                        <TextInput
                            className="border border-gray-300 rounded p-2 text-[#24527A]"
                            onChangeText={(text) => setPondCount(parseFloat(text))}
                            keyboardType="numeric"
                            value={pondCount.toString()}
                        />
                    </View>
                    <Text className="text-sm mb-6 text-[#24527A]">*Feeds Needed will be auto-generated</Text>
                    <View className="flex flex-row justify-items: end">
                        <Pressable
                            className="mr-2 rounded p-2 text-center border-[#24527A] border-[1px]"
                            onPress={onClose}
                        >
                            <Text className="text-[#24527A]">Cancel</Text>
                        </Pressable>
                        <Pressable
                            className="bg-[#24527A]  rounded p-2 text-center "
                            onPress={handleAddPond}
                        >
                            <Text className="text-[#ECF4FB]">Add Pond</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}