import { createContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useauth";
import useFarm from "../../hooks/useFarm";
import { supabase } from "../../libs/supabase";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";

type PondType = {
    pond_id: number;
    farm_id: number;
    created_at: string;
}

type PondContextType = {
    ponds?: PondType[];
    loading?: boolean;
    addPond?: (pond: Omit<Omit<PondType, "pond_id">, "created_at">) => void;
    editPond?: (pond: PondType) => void;
    deletePond?: (pond_id: number) => void;
    refetch?: () => void;
}

export const PondContext = createContext<PondContextType>({});

export default function PondProvider({children}: {children: React.ReactNode}) {
    const [ponds, setPonds] = useState<PondType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { farm, loading: farmLoading } = useFarm();

    useEffect(() => {
        console.log(`PondProvider: ${!loading ? "loaded @" : "loading @"} ${ponds.length}`)
    }, [ponds]);

    useEffect(() => {
        if (farmLoading || !farm) return;
        supabase.from("ponds")
                    .select("*")
                    .eq("farm_id", farm.farm_id)
                    .then((response: PostgrestMaybeSingleResponse<PondType[]>) => {
                        if (response.error) {
                            console.log(response.error.message);
                        }
                        setPonds(response.data || []);
                        setLoading(false);
                    });
        return () => {
            setPonds([]);
        };
    }, [farmLoading]);

    const handleAddPond = (pond: Omit<Omit<PondType, "pond_id">, "created_at">) => {
        supabase.from("ponds")
                .insert([{farm_id: farm?.farm_id}])
                .then((response: PostgrestMaybeSingleResponse<PondType>) => {
                    if (response.error) {
                        console.log(response.error.message);
                    }
                    if(response.data) setPonds([...ponds, response.data]);
                });
    }

    const handleEditPond = (pond: PondType) => {
        supabase.from("ponds")
                .update(pond)
                .eq("pond_id", pond.pond_id)
                .then((response: PostgrestMaybeSingleResponse<PondType>) => {
                    if (response.error) {
                        console.log(response.error.message);
                    }
                    if(response.data) setPonds(ponds.map((p: PondType) => p.pond_id === pond.pond_id ? response.data || pond : p));
                });
    }

    const handleDeletePond = (pond_id: number) => {
        supabase.from("ponds")
                .delete()
                .eq("pond_id", pond_id)
                .then((response) => {
                    if (response.error) {
                        console.log(response.error.message);
                    }
                    setPonds(ponds.filter((p: PondType) => p.pond_id !== pond_id));
                });
    }

    const handleRefetch = () => {
        setLoading(true);
    }

    return <PondContext.Provider value={{ ponds, loading, addPond: handleAddPond, editPond: handleEditPond, deletePond: handleDeletePond, refetch: handleRefetch }}>
        {children}
    </PondContext.Provider>
}