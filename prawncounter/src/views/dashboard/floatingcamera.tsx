import { useEffect, useState } from "react";
import uuid from 'react-native-uuid';
import { ActivityIndicator, Image, Pressable } from "react-native";
import { Buffer } from 'buffer';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import useCount from "../../hooks/usecount";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data';
import { useResult } from "./modals/resultmodal";

export default function FloatingCamera() {
    const [currentImageUri, setCurrentImageUri] = useState<string>("");
    const { result, setResult } = useResult();
    const [loading, setLoading] = useState<boolean>(false);
    const { addCount } = useCount();

    useEffect(() => {
        if (currentImageUri) {
            setLoading(true);
            console.log("currentImageUri is:", currentImageUri);
            FileSystem.readAsStringAsync(currentImageUri).then(async (response: string) => {
                const formData = new FormData();
                // // const newBlob: any =  await axios.get(`data:image/jpeg;base64,${Buffer.from(response, 'binary').toString('base64')}`);
                // console.log("Blob Value:", `data:image/jpeg;base64,${Buffer.from(response, 'binary').toString('base64')}`)
                formData.append('image-to-count', {
                    uri: currentImageUri,
                    name: `${uuid.v4()}.jpg`,
                    type: 'image/jpeg'
                });
                console.log("formdata:", formData)
                axios.post('https://prawn-larvae-counter-app.vercel.app/api/counter/image',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data', 'x-prawncounter-api-key': "carreigniab123456" } }
                ).then((response: any) => {
                    setResult({ count: response.data.count, path: response.data.path });
                }).catch((error) => console.log("error is:", error))

            }).catch((error) => console.log("error is:", error))
                .finally(() => {
                    setCurrentImageUri("");
                    setLoading(false);
                });
        };
    }, [currentImageUri])

    const handleTakePicture = async () => {
        // setResult({ count: 666, path: "public/test.jpg" });
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
        {loading && <ActivityIndicator color="white" />}
        {!loading && <Image className=" aspect-auto h-[23.25px]" source={require('../../../assets/camera.png')} />}
    </Pressable>
}