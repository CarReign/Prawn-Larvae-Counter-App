import { ActivityIndicator, Pressable, Text, View, Image, ScrollView } from "react-native";
import { useState } from "react";
import usePond from "../../../../hooks/usePond";
import useCount from "../../../../hooks/usecount";
import AddPondModal from "../../modals/addpond";
import EditPondModal from "../../modals/editpond";
import Overlay from "../../overlay";
import { PondType, PondTypeWithOrWithoutPondNumber } from "../../../../providers/pondprovider";
import getFeedNeeded from "../../../../utils/getfeedneeded";

export default function PondTab() {
    const { ponds, loading } = usePond();
    const { counts } = useCount();

    const [isAddPondModalVisible, setisAddPondModalVisible] = useState(false);
    const [isEditPondModalVisible, setisEditPondModalVisible] = useState(false);
    const [editedPond, setEditedPond] = useState<PondTypeWithOrWithoutPondNumber | null>(null);

    const toggleAddPondModal = () => {
        setisAddPondModalVisible(!isAddPondModalVisible);
    };

    const toggleEditPondModal = () => {
        setEditedPond(null);
    };

    const handleAddPond = (pond: any) => {
        // Implement your logic to handle adding a pond
        console.log('Adding pond:', pond);
        // Close the modal after handling
        setisAddPondModalVisible(false);
    };

    const handleEditPond = (pond: any) => {

    };

    return <>

        <View className="bg-[#eff6fc] flex min-h-full">
            <View className="flex flex-row justify-evenly p-4 pl-2 ml-[0px] mr-5">
                <Text className="text-[#1F375D]">Pond no.</Text>
                <Text className="text-[#1F375D]">Total prawn</Text>
                <Text className="text-[#1F375D]">Feeds Needed    </Text>
                <Text className="text-[#1F375D]">Action</Text>
            </View>
            <ScrollView className="max-h-[450px] min-h-[300px]" contentContainerStyle={{ flexGrow: 1 }}>

                {
                    loading && <View className="flex-1 justify-center items-center">
                        <ActivityIndicator color="#1F375D" />
                        <Text>Loading...</Text>
                    </View>
                }
                {
                    !loading && <View>

                        {
                            ponds ?
                                [...ponds].map((pond, index) => {
                                    return (
                                        <View key={index} className={`flex flex-row justify-between p-4 pl-4 pr-4 ${index === 0 || !!(index && !(index % 2)) ? "bg-[#D5E0F1]" : "bg-[#D5E0F1]"}  ml-5 mr-5 mb-2 text-[#1F375D] rounded-lg items-center`}>
                                            <Text className="font-semibold text-[16px] text-[#1F375D]flex flex-row border-[#1F375D] rounded-md border-[.3px] pr-[12px] pl-[12px] pb-[5px] pt-[5px] text-center" >{index + 1}</Text>
                                            <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }} />
                                            <Text className="font-semibold text-[24px] text-[#1F375D]">{pond.total_count || 0}</Text>
                                            <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }} />
                                            <View className="flex flex-row justify-end items-end"> 
                                                <Text className="font-semibold text-[24px] text-[#1F375D]">{getFeedNeeded(pond.total_count || 0)}</Text>
                                                <Text className="font-semibold text-[16px] mb-[2px] text-[#1F375D]"> kg</Text>
                                            </View>
                                            <Image source={require('../../../../../assets/line.png')} style={{ width: .5, height: 15, tintColor: "#9fb7cc", marginTop: 3 }} />
                                            <Pressable className="flex flex-row border-[#1F375D] rounded-md border-[.3px] pr-2 pl-2 pb-[6px] pt-[5px]"
                                                onPress={() => setEditedPond(pond)}>
                                                <Image className="" source={require('../../../../../assets/edit.png')} style={{ width: 16, height: 16 }} />
                                                <Text className="font-semibold text-[16px] text-[#1F375D] pl-1">Edit</Text>
                                            </Pressable>
                                        </View>
 
                                    )
                                })
                                :
                                <View className="flex-1 justify-center items-center">
                                    <Text>No Ponds</Text>
                                </View>
                        }
                    </View>
                }

                <Pressable className="flex flex-row items-center justify-center border-dashed border border-[#1F375D] p-4 ml-5 mr-5 "
                    onPress={() => toggleAddPondModal()}>
                    <Image source={require('../../../../../assets/add.png')} style={{ width: 20, height: 20 }} />
                    <Text className="pl-2 text-[16px] text-[#1F375D]">Add new pond</Text>
                </Pressable>
            </ScrollView>
            {isAddPondModalVisible && (
                <View>
                    <Overlay />
                    <AddPondModal onClose={toggleAddPondModal} />
                </View>
            )}
            {editedPond && (
                <View>
                    <Overlay />
                    <EditPondModal onClose={toggleEditPondModal} editedPond={editedPond} />
                </View>
            )}
        </View>
    </>
}