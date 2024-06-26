import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, TextInput, ActivityIndicator } from 'react-native';
import Overlay from "../overlay";
import { supabase } from "../../../libs/supabase";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useAuth from "../../../hooks/useauth";

type PondType = {
    pondNo: number;
    count: number;
}

type LogoutModalProps = {
    onClose: () => void;
    onLogout: () => void;
}

export default function LogoutModal({ onClose, onLogout}: LogoutModalProps) {
    const { loading } = useAuth();
    const [pondNumber, setPondNumber] = useState<number>(0);
    const [pondCount, setPondCount] = useState<number>(0);

    const handleLogoutModal = () => {


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
                        <Text className="text-[16px] text-[#1F375D] flex">Are you sure you want to log out?</Text>
                        
                    </View>
                    <View className="flex flex-row justify-end mt-2">
                        <View  className="flex flex-row">
                            <Pressable
                                className="mr-2 h-[36px] rounded px-5 text-center border-[#1F375D] border-[1px] justify-center items-center"
                                onPress={onClose}
                            >
                                <Text className="text-[#1F375D] text-[16px]">No</Text>
                            </Pressable>
                            <Pressable
                                disabled={loading}
                                className="mr-2 rounded h-[36px] px-5 text-center bg-[#1F375D] justify-center items-center"
                                onPress={onLogout}
                            >
                                { !loading && <Text className="text-[#ECF4FB] text-[16px]">Yes</Text>}
                                { !!loading && <><ActivityIndicator color={"#ffffff"}/><Text>Signing Out...</Text></>}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}