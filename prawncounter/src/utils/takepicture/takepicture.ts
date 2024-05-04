import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export const handleTakePicture = async (resultCallback: (result: string) => void, isCamera: boolean = true) => {
    // setResult({ count: 666, path: "public/test.jpg" });
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16, 9],
            quality: 1,
        };
        let result = isCamera ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);
        if (!result.canceled) {
            const image = await ImageManipulator.manipulateAsync(result.assets[0].uri,
                [{resize: {width: 1500}}],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );
            resultCallback(image.uri);
        }
    }
}