import { ActivityIndicator, Button, Image, Modal, Pressable, Text, View, ScrollView, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useAuth from "../../hooks/useauth";
import { RootStackParamList } from "../../navigation/types";
import { supabase } from "../../libs/supabase";
import useFarm from "../../hooks/useFarm";
import usePond from "../../hooks/usePond";
import useCount from "../../hooks/usecount";


interface ISelectFarmProps {
    route: RouteProp<RootStackParamList, "selectFarm">;
    navigation: NativeStackNavigationProp<RootStackParamList, "selectFarm">;
}

export type FarmType = {
    farm_id: number;
    farm_name: string;
}

export type FarmTypeWithOrWithoutFarmNumber = FarmType;

export default function SelectFarm({ route, navigation }: ISelectFarmProps) {
    const { session, loading } = useAuth();
    const [ farm, setFarm ] = useState<any[]>([]);
    const [ farmLoading, setFarmLoading ] = useState(true);

    const [ farmers, setFarmers ] = useState<any[]>([]);
    const [ selectedFarm, setSelectedFarm ] = useState<FarmTypeWithOrWithoutFarmNumber | null>(null);
    const [ addLoading, setAddLoading ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await supabase.from('farmers').select('*').then(({ data, error }) => {
                if (error) {
                    console.error(error);
                    return Promise.reject(error);
                }
                setFarmers(data);
                return Promise.resolve(data);
            });

            await supabase.from('farms').select('*').then(({ data, error }) => {
                if (error) {
                    console.error(error);
                    return;
                }
                setFarm(data)
                setFarmLoading(false)
            })
        };

        fetchData();
    }, []);
        

    
    const farmer = farmers.filter((farmer: any) => farmer.user_id === session?.user?.id)
    console.log(farmer)
    const toggleSelectFarm = async () => {
        console.log("clicked continue and selected farm:", farmer[0].username, selectedFarm)
        setAddLoading(true);

        await supabase.from('farmers')
            .update({ farm_id: selectedFarm?.farm_id })
            .eq('user_id', session?.user?.id)
            .single()
            .then(({ data, error }) => {console.log("data:"+ data + "error:"+ error)})
        Alert.alert('Farm selected successfully')
        // navigation.replace("dashboard")
        setAddLoading(false);
    };
    return (
        <>
            <View className=" flex-1 bg-[#BAD8F2] pt-[60px]">
                {
                    <>
                        <View className="">
                            {
                                !!farmLoading && 
                                <View className="flex items-center justify-center h-full">
                                    <ActivityIndicator className="flex items-center " size={"large"} color="#24527A" />
                                    <Text className="flex items text-[#24527A]">  Please wait...</Text>
                                </View>
                            }
                            {
                                !farmLoading && 
                                <View className="flex flex-col w-full h-full justify-between items-center mt-4 ">
                                    <Text className="flex text-[#24527A] text-[18px] font-bold mb-[8px]">Welcome, {farmer[0].username}</Text>
                                    <Text className="flex text-[#24527A] text-[16px] mb-[16px]">It seems that you don't belong to any farm yet</Text>
                                    <Pressable className="flex flex-row items-center justify-center border-dashed bg-[#E1EFFA] mb-[16px] px-[16px] rounded-md h-[36px]">
                                        <Image source={require('../../../assets/add.png')} style={{ width: 16, height: 16 }} tintColor={"#24527A"}/>
                                        <Text className="pl-2 text-[16px] text-[#24527A] font-medium">Add new farm</Text>
                                    </Pressable>
                                    <Text className="text-[#24527A] text-[16px] mb-[16px]">OR</Text>
                                    <View className="flex flex-grow bg-[#ECF4FB] w-full items-center p-4 rounded-xl">
                                        <Text className="text-[#24527A] text-[16px] mb-[16px] font-medium flex items-center justify-center border-[#24527a85] w-full text-center pb-4 border-b-[.3px]">Select existing farm:</Text>
                                        <ScrollView className="max-h-96 flex w-full">
                                            {farm ? farm.map((farm:any, index:any) => (
                                                <Pressable
                                                    key={index}
                                                    className={`flex w-full justify-between py-4 bg-${selectedFarm?.farm_id === farm.farm_id ? '[#C8E2F9]' : '[#E1EFFA]'} mb-2 rounded-lg items-center`}
                                                    onPress={() => {
                                                        setSelectedFarm(farm);
                                                    }}
                                                >
                                                    <Text className="font-semibold text-lg text-[#24527A] text-[18px] px-3 py-1">{farm.farm_name}</Text>
                                                </Pressable>
                                            )) :
                                                <View className="flex-1 justify-center items-center">
                                                    <Text>No Ponds</Text>
                                                </View>}
                                        </ScrollView>
                                    </View>
                                    <View className="flex-row flex  bg-[#ECF4FB] w-full justify-between border-t-[.3px] border-[#24527A] mb-8 p-4 items-center">
                                        <View>
                                            <Text className="text-lg font-bold text-[#24527A]">Selected farm:</Text>
                                            <Text className="italic text-lg text-[#24527A]">{selectedFarm ? `${selectedFarm.farm_name}` : 'No selected farm yet'}</Text>
                                        </View>
                                        <Pressable
                                            onPress={toggleSelectFarm}
                                            className={`rounded-md flex flex-row items-center h-[36px] px-4  ${selectedFarm ? 'bg-[#396387]' : 'bg-[#9DAEBC]'}`}
                                            disabled={!selectedFarm}
                                        >
                                            {!addLoading && <Text className="text-white text-lg">Continue</Text>}
                                            {!!addLoading && <><ActivityIndicator color="#ffffff" /><Text> ...</Text></>}
                                        </Pressable>
                                    </View>
                                </View>
                            
                            }
                        </View>
                    </>
                }
            </View>
        </>
    );
}