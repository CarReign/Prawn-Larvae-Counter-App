import { createContext, useEffect, useState } from "react";
import { supabase } from "../../libs/supabase";
import useAuth from "../../hooks/useauth";
import { PostgrestMaybeSingleResponse, PostgrestSingleResponse } from "@supabase/supabase-js";

type FarmType = {
    farm_id?: number;
    farm_name?: string;
}

type FarmContextType = {
    farm?: FarmType | null;
    addFarm?: (farm: Omit<FarmType, "farm_id">) => void;
    editFarm?: (farm: FarmType) => void;
    loading?: boolean;
};

export const FarmContext = createContext<FarmContextType>({});

export default function FarmProvider({ children }: { children: React.ReactNode }){
    const { session, loading: sessionLoading } = useAuth();
    const [farm, setFarm] = useState({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (sessionLoading || !session) return;
        supabase.from("farmers")
                .select('user_id, farms!inner(farm_id, farm_name)')
                .eq('user_id', session?.user?.id)
                .single()
                .then((response) => {
                    if(response.error){
                        console.log(response.error.message);
                    }
                    if (!response.data?.farms) return;
                    setFarm(response.data?.farms);
                    setLoading(false);
                });
    }, [sessionLoading]);

    const handleAddFarm = (farm: Omit<FarmType, "farm_id">) => {
        supabase.from("farms")
                .insert([{...farm, user_id: session?.user.id}])
                .single()
                .then((response: PostgrestMaybeSingleResponse<FarmType>) => {
                    if(response.error){
                        console.log(response.error.message);
                    }
                    if(response.data) setFarm(response.data);
                });
    }

    const handleEditFarm = (farm: FarmType) => {
        supabase.from("farms")
                .update(farm)
                .eq('farm_id', farm.farm_id)
                .single()
                .then((response: PostgrestMaybeSingleResponse<FarmType>) => {
                    if(response.error){
                        console.log(response.error.message);
                    }
                    if(response.data) setFarm(response.data);
                });
    }

    return (
        <FarmContext.Provider value={{ farm, addFarm: handleAddFarm, editFarm: handleEditFarm, loading }}>
            {children}
        </FarmContext.Provider>
    )
}