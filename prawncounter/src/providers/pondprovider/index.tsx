import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useauth";
import useFarm from "../../hooks/useFarm";
import { supabase } from "../../libs/supabase";
import { PostgrestMaybeSingleResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import { ToastAndroid } from "react-native";

export type PondType = {
    pond_id: number;
    farm_id: number;
    total_count: number;
    created_at: string;
}

export type PondTypeWithOrWithoutPondNumber = PondType & { pondNumber?: number };

type PondContextType = {
    ponds?: PondTypeWithOrWithoutPondNumber[];
    loading?: boolean;
    setPonds?: Dispatch<SetStateAction<PondTypeWithOrWithoutPondNumber[]>>;
    addPond?: (pond: Omit<Omit<PondType, "pond_id">, "created_at">) => void;
    editPond?: (pond: PondType) => void;
    deletePond?: (pond_id: number) => void;
    refetch?: () => void;
}

export const PondContext = createContext<PondContextType>({});

export default function PondProvider({ children }: { children: React.ReactNode }) {
    const [ponds, setPonds] = useState<PondTypeWithOrWithoutPondNumber[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { farm, loading: farmLoading } = useFarm();

    useEffect(() => {
        console.log(`PondProvider: ${!loading ? "loaded @" : "loading @"} ${ponds.length}`)
    }, [ponds]);

    useEffect(() => {
        if (farmLoading || !farm) return;
        if (!farm.farm_id) {
            ToastAndroid.showWithGravity("No Representative Farm Found", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            return;
        }
        supabase.from("ponds")
            .select("*")
            .eq("farm_id", farm.farm_id)
            .then((response: PostgrestMaybeSingleResponse<PondType[]>) => {
                if (response.error) {
                    console.log(response.error.message);

                }
                setPonds(response?.data?.sort((a, b) => a.pond_id - b.pond_id).map((pond: PondType, index: number) => ({ ...pond, pondNumber: index + 1 })) || []);
                setLoading(false);
            });
        return () => {
            setPonds([]);
        };
    }, [farmLoading]);

    const handleAddPond = async (pond: Omit<Omit<PondType, "pond_id">, "created_at">) => {
        await supabase.from("ponds")
            .insert([{ ...pond }])
            .select("*")
            .then((response: any) => {
                if (response.error) {
                    console.log(response.error.message);
                    ToastAndroid.showWithGravity("Something Went Wrong", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                }
                setPonds([...response.data, ...ponds]);
                ToastAndroid.showWithGravity("Successfully Added Pond", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            });
    }

    const handleEditPond = (pond: PondType) => {
        supabase.from("ponds")
            .update(pond)
            .eq("pond_id", pond.pond_id)
            .then((response: PostgrestMaybeSingleResponse<PondType>) => {
                if (response.error) {
                    console.log(response.error.message);
                    ToastAndroid.showWithGravity("Something Went Wrong", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                }
                setPonds(ponds.map((p: PondType) => p.pond_id === pond.pond_id ? { ...p, ...pond } : p));
                ToastAndroid.showWithGravity("Successfully Edited Pond", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            });
    }

    const handleDeletePond = async (pond_id: number) => {
        await supabase.from("ponds")
            .delete()
            .eq("pond_id", pond_id)
            .then((response) => {
                if (response.error) {
                    console.log(response.error.message);
                    ToastAndroid.showWithGravity("Something Went Wrong", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                }
                setPonds(ponds.filter((p: PondType) => p.pond_id !== pond_id));
                ToastAndroid.showWithGravity("Successfully Deleted Pond", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            });
    }

    const handleRefetch = () => {
        setLoading(true);
        if (!farm) return;
        supabase.from("ponds")
            .select("*")
            .eq("farm_id", farm.farm_id)
            .then((response: PostgrestMaybeSingleResponse<PondType[]>) => {
                if (response.error) {
                    console.log(response.error.message);

                }
                setPonds(response?.data?.sort((a, b) => b.pond_id - a.pond_id).map((pond: PondType, index: number) => ({ ...pond, pondNumber: index + 1 })) || []);
                setLoading(false);
            });
    }

    return <PondContext.Provider value={{ ponds, loading, setPonds, addPond: handleAddPond, editPond: handleEditPond, deletePond: handleDeletePond, refetch: handleRefetch }}>
        {children}
    </PondContext.Provider>
}