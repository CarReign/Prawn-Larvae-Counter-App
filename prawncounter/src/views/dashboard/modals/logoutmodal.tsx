import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, TextInput } from 'react-native';
import Overlay from "../overlay";
import { supabase } from "../../../libs/supabase";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PondType = {
    pondNo: number;
    count: number;
}

type LogoutModalProps = {
    onClose: () => void;
    onLogout: () => void;
}

export default function LogoutModal({ onClose, onLogout}: LogoutModalProps) {
    const [pondNumber, setPondNumber] = useState<number>(0);
    const [pondCount, setPondCount] = useState<number>(0);

    const handleLogoutModal = () => {

        onLogout();

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
                    <View className="flex mb-4 w-full justify-items-end">
                        <Text className="text-[18px] text-[#24527A] flex">Are you sure you want to log out?</Text>
                        
                    </View>
                    <View className="flex flex-row justify-end mt-2">
                        <View  className="flex flex-row">
                            <Pressable
                                className="mr-2 h-[36px] rounded px-5 text-center border-[#24527A] border-[1px] justify-center items-center"
                                onPress={onClose}
                            >
                                <Text className="text-[#24527A] text-[18px]">No</Text>
                            </Pressable>
                            <Pressable
                                className="mr-2 rounded h-[36px] px-5 text-center bg-[#24527A] justify-center items-center"
                                onPress={handleLogoutModal}
                            >
                                <Text className="text-[#ECF4FB] text-[18px]">Yes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}