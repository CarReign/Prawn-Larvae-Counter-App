import { View, Text, Image, Pressable, TextInput, Alert } from "react-native";
import { supabase } from "../../libs/supabase";
import { useState } from "react";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveChanges = async () => {
        // Validate passwords
        if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New password and confirm password do not match.");
        return;
        }

        try {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "Password updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
        } catch (error) {
        console.log("Error updating password:", error)
        Alert.alert("Error", "An error occurred while updating the password.");
        }
    };
    return (
        <View className="pt-4 px-5  bg-[#ECF4FB] w-full h-full justify-between">
            <View className="">
                <View className="mb-6">
                    <View className="mb-3 flex flex-row w-full items-center justify-between">
                        <Text className="text-[18px] mb-1 mr-3 text-[#24527A]">Current password:</Text>
                        <TextInput
                            className="bg-[#F2F9FF] text-[18px] rounded p-2 text-[#24527A]  w-[180px] h-[36px]"
                            onChangeText={setCurrentPassword}
                            secureTextEntry={true}
                            value={currentPassword}
                        />
                    </View>
                    <View className="mb-3 flex flex-row w-full items-center justify-between">
                        <Text className="text-[18px] mb-1 mr-3 text-[#24527A]">New password:</Text>
                        <TextInput
                            className="bg-[#F2F9FF] text-[18px] rounded p-2 text-[#24527A] w-[180px] h-[36px]"
                            onChangeText={setNewPassword}
                            secureTextEntry={true}
                            value={newPassword}
                        />
                    </View>
                    <View className="mb-3 flex flex-row w-full items-center justify-between">
                        <Text className="text-[18px] mb-1 mr-3 text-[#24527A]">Confirm password:</Text>
                        <TextInput
                            className="bg-[#F2F9FF] text-[18px] rounded p-2 text-[#24527A]  w-[180px] h-[36px]"
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                            value={confirmPassword}
                        />
                    </View>
                </View>
            </View>
            <View className="flex flex-row w-full justify-center pb-5">
                <Pressable className="flex flex-row flex-grow bg-[#F9FCFF] rounded-md h-[36px] pr-2 pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Text className="text-[#4B7293] text-[18px]">Cancel</Text>
                </Pressable>
                <Pressable onPress={handleSaveChanges}
                    className="flex flex-row flex-grow bg-[#396387] rounded-md h-[36px] ml-3 pr-2 pl-2 pb-[6px] pt-[5px] w-[96px] justify-center items-center">
                    <Text className="text-[#ECF4FB] text-[18px]">Save changes</Text>
                </Pressable>
            </View>
        </View>
    )
}