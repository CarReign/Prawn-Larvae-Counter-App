import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, TextInput, ActivityIndicator } from 'react-native';
import Overlay from "../overlay";
import { PondType, PondTypeWithOrWithoutPondNumber } from "../../../providers/pondprovider";
import usePond from "../../../hooks/usePond";
import { supabase } from "../../../libs/supabase";

type EditPondModalProps = {
    onClose: () => void;
    editedPond: PondTypeWithOrWithoutPondNumber;
}

export default function EditPondModal({ onClose, editedPond }: EditPondModalProps) {
    const { deletePond, editPond } = usePond();
    const [pondCount, setPondCount] = useState<number>(editedPond.total_count);
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false);

    
    const handleEditPond = async () => {
        const { pondNumber, ...rest } = editedPond;
        setEditing(true);
        editPond && await editPond({ ...rest, total_count: pondCount });
        setEditing(false);
        onClose();
    };

    const handleDeletePond = async () => {
        const { pondNumber, ...rest } = editedPond;
        setDeleting(true);
        editPond && await editPond({ ...rest, total_count: 0 });
        setDeleting(false);
        onClose();
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
                        <Text className="text-sm text-[#24527A] flex">Pond number: {editedPond.pondNumber}</Text>

                    </View>
                    <View className="mb-2">
                        <Text className="text-sm mb-1 text-[#24527A]">Prawn count</Text>
                        <TextInput
                            className="border border-gray-300 rounded p-2 text-[#24527A]"
                            onChangeText={(text) => setPondCount(Number(text))}
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
                                {!deleting && <Text className="text-[#BD3D4C]">Clear count</Text>}
                                {deleting && <><ActivityIndicator color="#ff0000" /></>}
                            </Pressable>
                        </View>
                        <View className="flex flex-row">
                            <Pressable
                                className="mr-2 rounded p-2 text-center border-[#24527A] border-[1px]"
                                onPress={() => { if (!editing || !deleting) onClose() }}
                            >
                                <Text className="text-[#24527A]">Cancel</Text>
                            </Pressable>
                            <Pressable
                                className="bg-[#24527A] flex flex-row  rounded p-2 text-center "
                                onPress={handleEditPond}
                            >
                                {!editing && <Text className="text-[#ECF4FB]">  Save  </Text>}
                                {editing && <><ActivityIndicator color="#ECF4FB" />
                                <Text className="text-[#ECF4FB]"> Editing..</Text></>}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}