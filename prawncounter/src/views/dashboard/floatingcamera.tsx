import { useState } from "react";
import { Image, Pressable } from "react-native";

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export default function FloatingCamera() {
    const [ currentImageUri, setCurrentImageUri ] = useState<string>("");

    const handleTakePicture = async () => {
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
    }

    return <Pressable 
        className=" flex items-center justify-center min-h-[55px] min-w-[55px] rounded-full bg-[#2E78B8] absolute bottom-[30px] right-[30px]"
        onPress={handleTakePicture}
        >
        <Image className=" aspect-auto h-[23.25px]" source={require('../../../assets/camera.png')} />
    </Pressable>
}