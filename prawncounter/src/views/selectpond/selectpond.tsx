import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView, ActivityIndicator, ToastAndroid, Modal, TextInput } from "react-native";
import { supabase } from "../../libs/supabase";
import usePond from "../../hooks/usePond";
import useCount from "../../hooks/usecount";
import { PondTypeWithOrWithoutPondNumber } from "../../providers/pondprovider";
import { useResult } from "../dashboard/modals/resultmodal";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import getFeedNeeded from "../../utils/getfeedneeded";
import Overlay from "../dashboard/overlay";
import useFarm from "../../hooks/useFarm";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data';
import uuid from 'react-native-uuid';
import { handleTakePicture } from "../../utils/takepicture/takepicture";
import ImageComponent from "../dashboard/modals/resultPicture";

interface IDashboardProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "selectPond">;
}

export default function SelectPond({ navigation }: IDashboardProps) {
    
    const { ponds, loading, addPond } = usePond()
    const { farm } = useFarm();
    const { addCount } = useCount();
    const { counts } = useCount();
    const { result, setIsPaused, setResult } = useResult();
    const [selectedPond, setSelectedPond] = useState<PondTypeWithOrWithoutPondNumber | null>(null);
    const [addLoading, setAddLoading] = useState(false);
    const [ countAgainModal, setCountAgainModal ] = useState(false);
    const [ createNewPondModal, setCreateNewPondModal ] = useState(false);
    const [pondCount, setPondCount] = useState(result?.count);
    const [ createPondLoading, setCreatePondLoading ] = useState(false);
    const [ currentImageUri, setCurrentImageUri ] = useState<string>("");
    const [ counting, setCounting ] = useState(false);
    const [ prevSelectedPond, setPrevSelectedPond ] = useState<PondTypeWithOrWithoutPondNumber | null>(null);
    const [ showResultModal, setShowResultModal ] = useState(false);
    const [ resultResponse, setResultResponse ] = useState<any>(null);
    const [ addToSamePondLoading, setAddToSamePondLoading ] = useState(false);


    useEffect(() => {
        if (currentImageUri) {
            setCounting(true);
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
                    { headers: { 'Content-Type': 'multipart/form-data', 'x-prawncounter-api-key': "2020-0550" } }
                ).then((response: any) => {
                    setResultResponse(response.data);
                    setShowResultModal(true);
                    // setResult({ count: response.data.count, path: response.data.path });
                }).catch((error) => console.log("error is:", error))

            }).catch((error) => console.log("error is:", error))
                .finally(() => {
                    setCurrentImageUri("");
                });
            
            
        };

        
    }, [currentImageUri])

    const addToSamePond = async () => {
        setAddToSamePondLoading(true);
        !!addCount && await addCount(prevSelectedPond?.pond_id || 0, resultResponse?.path || "", resultResponse?.count || 0);
        setResult(null);
        setIsPaused(false);
        setCounting(false);
        setShowResultModal(false);
        setAddToSamePondLoading(false);
        setCountAgainModal(true);
    }

    const handleTakePictureAgain = () => {
        setShowResultModal(false);
        setCounting(true);
        handleTakePicture((resultingImageUri) => {
            FileSystem.readAsStringAsync(resultingImageUri).then(async (response: string) => {
                const formData = new FormData();
                // // const newBlob: any =  await axios.get(`data:image/jpeg;base64,${Buffer.from(response, 'binary').toString('base64')}`);
                // console.log("Blob Value:", `data:image/jpeg;base64,${Buffer.from(response, 'binary').toString('base64')}`)
                formData.append('image-to-count', {
                    uri: resultingImageUri,
                    name: `${uuid.v4()}.jpg`,
                    type: 'image/jpeg'
                });
                console.log("formdata:", formData)
                axios.post('https://prawn-larvae-counter-app.vercel.app/api/counter/image',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data', 'x-prawncounter-api-key': "2020-0550" } }
                ).then((response: any) => {
                    setResultResponse(response.data);
                    setShowResultModal(true);
                }).catch((error) => console.log("error is:", error)).finally(() => setCounting(false))
            });
        });
    }

    const toggleSelectPond = async () => {
        if (addLoading || !selectedPond?.pond_id) return;
        setAddLoading(true);
        !!addCount && await addCount(selectedPond?.pond_id, result?.path || "", result?.count || 0);
        // navigation.replace("dashboard")
        setCountAgainModal(true);
        setPrevSelectedPond(selectedPond);
        setResult(null);
        setIsPaused(false);
        setAddLoading(false);
    };

    const handleAddPondModal = async() => {
        console.log("Pond Count:", pondCount)
        console.log("Result.count:", result?.count)
        setCreatePondLoading(true);
        addPond && await addPond({ total_count: pondCount || 0, farm_id: farm?.farm_id || 0 });
        setCreatePondLoading(false);
        setCreateNewPondModal(false);
        navigation.replace("dashboard");
    }

    const handleReturnToResultModal = () => {
        console.log(result)
        navigation.replace("dashboard");
        // setIsPaused(false);
    }

    return (
        <View className="bg-[#ECF4FB] h-full flex flex-col justify-between">
            <View className="p-4 ">
                <View className="mb-2">
                    <Pressable
                        className="flex-row justify-center items-center h-10 rounded-md border-[#24527A] border-[.3px] px-4"
                        onPress={() => setCreateNewPondModal(true)}
                    >
                        <Image
                            source={require("../../../assets/add.png")}
                            style={{ width: 14, height: 14 }}
                        />
                        <Text className="font-bold text-base text-[#396387] pl-2">Create new pond</Text>
                    </Pressable>
                </View>
                <View className="flex-row justify-between p-4">
                    <Text className="text-[#24527A]">  Pond no.</Text>
                    <Text className="text-[#24527A]"> Total prawn </Text>
                    <Text className="text-[#24527A]">Feeds Needed</Text>
                </View>
                { showResultModal &&
                <Modal className="flex  max-w-2xl max-h-full z-10 "
                animationType="slide"
                transparent={true}
            >
                    <View className="absolute w-full bg-black opacity-50 h-full"></View>
                    <View className="flex flex-col justify-center relative p-4 w-full  content-center">

                        <View className="bg-[#F9FCFF] flex flex-col justify-between p-4 mt-6 h-[640px] shadow-md rounded-md opacity-100">
                            <View className="flex flex-row mb-4 justify-between w-full border-b-[.3px] border-[#24527A] pb-2 mt-0">
                                <Text className="text-[20px] text-[#24527A]">Count result</Text>
                                <Pressable onPress={handleReturnToResultModal}
                                    className="mt-1">
                                    <Image source={require('../../../assets/close.png')} />
                                </Pressable>
                            </View>
                            <ImageComponent path={(resultResponse.path) || ""} />
                            <View className="flex flex-row justify-center items-end mb-4 mt-4">
                                <Text className="text-center text-[16px] pr-2 text-[#24527A]">There's</Text>
                                <Text className="text-center text-[24px] pr-2 text-[#24527A]">{resultResponse.count}</Text>
                                <Text className="text-center text-[16px] text-[#24527A]">prawns</Text>
                            </View>
                            <Pressable
                                className="bg-[#24527A] rounded-md py-3 px-3 mb-2 justify-center flex flex-row items-center"
                                onPress={handleTakePictureAgain}

                            >
                                <Image source={require('../../../assets/count-again.png')} style={{ width: 12, height: 12 }} />
                                <Text className="text-[#F9FCFF] pl-1">Count again</Text>
                            </Pressable>
                            <Pressable
                                className="bg-[#F9FCFF] py-3 px-3 flex flex-row justify-center items-center border-[#315f88] rounded-md border"
                                onPress={addToSamePond}
                            >
                                <Image source={require('../../../assets/add.png')} style={{ width: 12, height: 12 }} />
                                { !!addToSamePondLoading && <><ActivityIndicator color={"#24527A"}/><Text className="text-[#24527A] text-[16px]">  Adding...</Text></>}
                                <Text>  </Text>
                                { !addToSamePondLoading && <Text className="text-[#24527A] text-[16px]">Add to previous pond</Text>}
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                }
                <ScrollView className="max-h-96">
                    {ponds ? ponds.map((pond, index) => (
                        <Pressable
                            key={index}
                            className={`flex-row justify-between px-6 py-4 bg-${selectedPond?.pond_id === pond.pond_id ? '[#C8E2F9]' : '[#E1EFFA]'} mb-2 rounded-lg items-center`}
                            onPress={() => {
                                setSelectedPond(pond);
                            }}
                        >
                            <Text className="font-semibold text-lg text-[#24527A] border-[.3px] rounded-md border-[#24527A] px-3 py-1">{pond.pondNumber || index + 1}</Text>
                            <Image
                                source={require("../../../assets/line.png")}
                                style={{ width: 0.5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }}
                            />
                            <Text className="font-semibold text-lg text-[#24527A]">{pond.total_count || "0"}</Text>
                            <Image
                                source={require("../../../assets/line.png")}
                                style={{ width: 0.5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }}
                            />
                            <Text className="font-semibold text-lg text-[#24527A]">{getFeedNeeded(pond.total_count || 0)} kg</Text>
                        </Pressable>
                    )) :
                        <View className="flex-1 justify-center items-center">
                            <Text>No Ponds</Text>
                        </View>}
                </ScrollView>
                {countAgainModal && 
                <Modal className="flex flex-1 max-w-2xl max-h-full z-10"
                animationType="slide"
                transparent={true}
                visible={true} 
            >
                <Overlay/>
                <View className="flex items-center justify-center h-full">
                    <View className="bg-white w-3/4 p-4 rounded-lg flex">
                        <View className="flex mb-4 w-full justify-items-end">
                            <Text className="text-[16px] text-[#24527A] flex">Count again for the same pond?</Text>
                            
                        </View>
                        <View className="flex flex-row justify-end mt-2">
                            <View  className="flex flex-row">
                                <Pressable
                                    className="mr-2 h-[36px] rounded px-5 text-center border-[#24527A] border-[1px] justify-center items-center"
                                    onPress={handleReturnToResultModal}
                                >
                                    <Text className="text-[#24527A] text-[16px]">No</Text>
                                </Pressable>
                                <Pressable
                                    disabled={loading}
                                    className="mr-2 rounded h-[36px] px-5 text-center bg-[#24527A] flex flex-row justify-center items-center"
                                    onPress={() => handleTakePicture((imageUri) => setCurrentImageUri(imageUri))}
                                >
                                    { !counting && <Text className="text-[#ECF4FB] text-[16px]">Yes</Text>}
                                    { !!counting && <><ActivityIndicator color={"#ffffff"}/><Text className="text-[#ECF4FB] text-[16px]">  Counting...</Text></>}
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            } 
            </View>
            {
                createNewPondModal && 
            <Modal className="flex flex-1 max-w-2xl max-h-full z-10"
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <Overlay />
            <View className="flex items-center justify-center h-full">
                <View className=" flex bg-white w-3/4 p-4 justify-end rounded-lg">
                    <View className="flex flex-row mb-4 justify-between w-full border-b-[.3px] border-[#24527A] pb-2">
                        <Text className="text-[20px] text-[#24527A]">Add new pond</Text>
                        <Pressable className="pt-1" onPress={() => setCreateNewPondModal(false)}><Image source={require('../../../assets/close.png')} /></Pressable>
                    </View>
                    <View className="flex mb-4 w-full">
                        <Text className="text-sm text-[#24527A] flex">Pond number: {(ponds && ponds?.length + 1) || 1}</Text>
                    </View>
                    <View className="mb-2">
                        <Text className="text-sm mb-1 text-[#24527A]">Prawn count</Text>
                        <TextInput
                            className="border border-gray-300 rounded p-2 text-[#24527A]"
                            onChangeText={(text) => setPondCount(Number(text))}
                            keyboardType="numeric"
                            value={pondCount?.toString() || ""}
                        />
                    </View>
                    <Text className="text-sm mb-6 text-[#24527A]">*Feeds Needed will be auto-generated</Text>
                    <View className="flex flex-row w-full justify-end items-end">
                        <Pressable
                            className="mr-2 rounded p-2 text-center border-[#24527A] border-[1px]"
                            onPress={() => setCreateNewPondModal(false)}
                        >
                            <Text className="text-[#24527A]">Cancel</Text>
                        </Pressable>
                        <Pressable
                            className="bg-[#24527A] flex flex-row rounded p-2 text-center "
                            onPress={handleAddPondModal}
                        >
                            {!createPondLoading && <Text className="text-[#ECF4FB]">Add Pond</Text>}
                            {createPondLoading && <><ActivityIndicator color="#ECF4FB" />
                            <Text className="text-[#ECF4FB]"> Adding..</Text></>}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
        }
            <View className="flex-row justify-between bg-[#ECF4FB]] border-t-[.3px] border-[#24527A] h-16 p-4 items-center">
                <View>
                    <Text className="text-lg font-bold text-[#24527A]">Selected pond:</Text>
                    <Text className="italic text-lg text-[#24527A]">{selectedPond ? `Pond ${selectedPond.pondNumber}` : 'No selected pond yet'}</Text>
                </View>
                <Pressable
                    onPress={toggleSelectPond}
                    className={`rounded-md flex flex-row items-center h-[36px] px-4  ${selectedPond ? 'bg-[#396387]' : 'bg-[#9DAEBC]'}`}
                    disabled={!selectedPond}
                >
                    {!addLoading && <Text className="text-[#ECF4FB] text-lg">Continue</Text>}
                    {!!addLoading && <><ActivityIndicator color="#ECF4FB" /><Text className="text-[#ECF4FB] text-lg">  Adding..</Text></>}
                </Pressable>
            </View>
        </View>
    );
}
