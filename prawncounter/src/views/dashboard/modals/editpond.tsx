import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, TextInput } from 'react-native';
import Overlay from "../overlay";
import { PondType } from "../../../providers/pondprovider";

type EditPondModalProps = {
    onClose: () => void;
    editedPond: PondType;
}

export default function EditPondModal({ onClose, editedPond }: EditPondModalProps) {
    const [pondNumber, setPondNumber] = useState<number>(0);
    const [pondCount, setPondCount] = useState<number>(0);
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false);

    const handleEditPond = () => {
        setEditing(true);


        onClose();
        setEditing(false);
    };

    const handleDeletePond = () => {
        setDeleting(true);
        onClose();
        setDeleting(false);
    }

    return (
        <Modal className="flex flex-1 max-w-2xl max-h-full z-10"
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <Overlay />
            <View className="flex items-center justify-center h-full">
                <View className="bg-white w-3/4 p-4 rounded-lg flex">
                    <View className="flex flex-row mb-4 justify-between w-full border-b-[.3px] border-[#24527A] pb-2">
                        <Text className="text-[20px] text-[#24527A]">Edit pond</Text>
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
                    <View className="flex flex-row justify-between">
                        <View>
                            <Pressable
                                className=" rounded p-2 text-center justify-center border-[#BD3D4C] border-[1px]"
                                onPress={handleDeletePond}
                            >
                                <Image source={require('../../../../assets/delete.png')} style={{ width: 18, height: 18 }} />
                            </Pressable>
                        </View>
                        <View className="flex flex-row">
                            <Pressable
                                className="mr-2 rounded p-2 text-center border-[#24527A] border-[1px]"
                                onPress={onClose}
                            >
                                <Text className="text-[#24527A]">Cancel</Text>
                            </Pressable>
                            <Pressable
                                className="bg-[#24527A]  rounded p-2 text-center "
                                onPress={handleEditPond}
                            >
                                <Text className="text-[#ECF4FB]">Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}