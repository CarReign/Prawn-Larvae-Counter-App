import React, { useState, useEffect } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import FileSystem from 'expo-file-system';
import { supabase } from '../../../libs/supabase';
import uuid from 'react-native-uuid';
import blobToBase64 from '../../../utils/blobToBase64';

export default function ImageComponent({ path }: { path: string }) {
  //   const [imageURL, setImageURL] = useState("");
  const [imageData, setImageData] = useState<String>()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImage() {
      try {
        if (!path) return;
        console.log(`path is: "${path}"`)
        // Replace 'image_filename' with your actual filename in the Supabase Bucket
        const { data, error } = await supabase.storage
          .from('countimg')
          .download(path);

        if (error) {
          console.log(error)
          throw error;
        }

        console.log("data:", data);

        const base64String: String = await blobToBase64(data);

        console.log("assert base64:", base64String);
        // const reader: FileReader = new FileReader();
        // reader.onload = async () => {
        //     const documentStore = FileSystem.documentDirectory;
        //     const fileUri = `${documentStore}/${uuid.v4()}.jpg`;
        //     await FileSystem.writeAsStringAsync(fileUri, reader?.result?.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
        // };
        // reader.readAsDataURL(data);
        // Get the URL of the downloaded image
        // const url = URL.createObjectURL();
        // console.log(url);
        // setImageURL(url);
        setImageData(base64String)
      } catch (error: any) {
        console.error('Error fetching image:', error.message);
      } finally {
        setLoading(false);
      }
    }

    if (path) fetchImage();
  }, [path]);

  return (
    <View className='bg-cover flex-row flex'>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : <>
        {path && imageData && <Image
          source={{ uri: `data:image/jpeg;base64,${imageData}` }}
          className=' aspect-auto min-h-[300px] w-full'
        />}
      </>}
    </View>
  );
}