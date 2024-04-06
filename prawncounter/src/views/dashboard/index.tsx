import { Button, Image, Pressable, Text, View } from "react-native";
import { AuthContext } from "../../providers/authprovider";
import { useContext, useEffect, useState } from "react";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useAuth from "../../hooks/useauth";
import { RootStackParamList } from "../../navigation/types";
import { supabase } from "../../libs/supabase";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import CountLarvae from "../../utils/prawncounter";

interface IDashboardProps {
    route: RouteProp<RootStackParamList, "dashboard">;
    navigation: NativeStackNavigationProp<RootStackParamList, "dashboard">;
}

export default function Dashboard({ route, navigation }: IDashboardProps) {
    const [proceed, setProceed] = useState<boolean>(false);
    const [ currentImageUri, setCurrentImageUri ] = useState<string>("");
    const [takingPicture, setTakingPicture] = useState<boolean>(false);
    const { session, loading } = useAuth();

    useEffect(() => {
        let timeoutNavigateToSignIn: NodeJS.Timeout;
        if (!loading && session) {
            timeoutNavigateToSignIn = setTimeout(() => {
                setProceed(true);
            }, 2000);
        } else if (!loading && !session) {
            timeoutNavigateToSignIn = setTimeout(() => {
                navigation.push("signin");
            }, 2000);
        }
        return () => {
            clearTimeout(timeoutNavigateToSignIn);
        }
    }, [session, loading])

    const handleSignOut = async () => {
        setProceed(false);
        await supabase.auth.signOut();
    }

    const handleTakePicture = async () => {
        setTakingPicture(true);
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [16, 9],
                quality: 1,
            });
            if (!result.canceled) {
                const image = await ImageManipulator.manipulateAsync(result.assets[0].uri, 
                    [{ resize: { width: 500 } }], 
                    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                );
                setCurrentImageUri(image.uri);
            }
        }
        setTakingPicture(false);
    }

    return (
        <View className=" flex-1 bg-[#BAD8F2] py-8">
            {
                proceed && <>
                    <View>
                        
                    </View>
                    <Pressable 
                        className=" flex items-center justify-center min-h-[55px] min-w-[55px] rounded-full bg-[#2E78B8] absolute bottom-[30px] right-[30px]"
                        onPress={handleTakePicture}
                        >
                        <Image className=" aspect-auto h-[23.25px]" source={require('../../../assets/camera.png')} />
                    </Pressable>
                </>
            }
            {
                !proceed && !takingPicture && <View className="flex-1 flex-col items-center justify-center">
                    <Image source={require('../../../assets/title.png')} className="mb-[24px]" />
                </View>
            }
        </View>
    );
}