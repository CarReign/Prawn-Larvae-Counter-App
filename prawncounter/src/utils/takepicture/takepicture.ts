import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export const handleTakePicture = async (resultCallback: (result: string) => void) => {
    // setResult({ count: 666, path: "public/test.jpg" });
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16, 9],
            quality: 1,
        });
        if (!result.canceled) {
            const image = await ImageManipulator.manipulateAsync(result.assets[0].uri,
                [],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );
            resultCallback(result.assets[0].uri);
        }
    }
}