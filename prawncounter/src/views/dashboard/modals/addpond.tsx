import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, TextInput, ActivityIndicator } from 'react-native';
import handleTakePicture from "../floatingcamera";
import ImageComponent from "./resultPicture";
import Overlay from "../overlay";
import usePond from "../../../hooks/usePond";
import useFarm from "../../../hooks/useFarm";


type PondType = {
    pondNo: number;
    count: number;
    // Add more properties as needed
}

type AddPondModalProps = {
    onClose: () => void;
}

export default function AddPondModal({ onClose }: AddPondModalProps) {
    const { ponds, addPond } = usePond()
    const { farm } = useFarm();
    const [pondCount, setPondCount] = useState<number | null>(0);
    const [loading, setLoading] = useState(false);

    const handleAddPond = async () => {
        if (loading) return;
        setLoading(true);
        addPond && await addPond({ total_count: pondCount || 0, farm_id: farm?.farm_id || 0 });
        setLoading(false);
        onClose();
    };

    return (
        <Modal className="flex flex-1 max-w-2xl max-h-full z-10"
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <Overlay />
            <View className="flex items-center justify-center h-full">
                <View className=" flex bg-white w-3/4 p-4 justify-end rounded-lg">
                    <View className="flex flex-row mb-4 justify-between w-full border-b-[.3px] border-[#1F375D] pb-2">
                        <Text className="text-[20px] text-[#1F375D]">Add new pond</Text>
                        <Pressable className="pt-1" onPress={() => onClose()}><Image source={require('../../../../assets/close.png')} /></Pressable>
                    </View>
                    <View className="flex mb-4 w-full">
                        <Text className="text-sm text-[#1F375D] flex">Pond number: {(ponds && ponds?.length + 1) || 1}</Text>
                    </View>
                    <View className="mb-2">
                        <Text className="text-sm mb-1 text-[#1F375D]">Prawn count</Text>
                        <TextInput
                            className="border border-gray-300 rounded p-2 text-[#1F375D]"
                            onChangeText={(text) => setPondCount(Number(text))}
                            keyboardType="numeric"
                            value={pondCount?.toString()}
                        />
                    </View>
                    <Text className="text-sm mb-6 text-[#1F375D]">*Feeds Needed will be auto-generated</Text>
                    <View className="flex flex-row w-full justify-end items-end">
                        <Pressable
                            className="mr-2 rounded p-2 text-center border-[#1F375D] border-[1px]"
                            onPress={onClose}
                        >
                            <Text className="text-[#1F375D]">Cancel</Text>
                        </Pressable>
                        <Pressable
                            className="bg-[#1F375D] flex flex-row rounded p-2 text-center "
                            onPress={handleAddPond}
                        >
                            {!loading && <Text className="text-[#ECF4FB]">Add Pond</Text>}
                            {loading && <><ActivityIndicator color="#ECF4FB" />
                            <Text className="text-[#ECF4FB]"> Adding..</Text></>}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}