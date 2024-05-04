import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { supabase } from "../../libs/supabase";
import useAuth from "../../hooks/useauth";
import { PostgrestMaybeSingleResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import NetInfo from "@react-native-community/netinfo";

type FarmType = {
    farm_id?: number;
    farm_name?: string;
}

type FarmContextType = {
    farm: FarmType | null;
    setFarm?: Dispatch<SetStateAction<any>>;
    username?: string;
    addFarm?: (farm: Omit<FarmType, "farm_id">) => void;
    editFarm?: (farm: FarmType) => void;
    refresh?: () => void;
    loading?: boolean;
};

export const FarmContext = createContext<FarmContextType>({ farm: null });

export default function FarmProvider({ children }: { children: React.ReactNode }) {
    const { session, loading: sessionLoading } = useAuth();
    const [farm, setFarm] = useState<FarmType>({});
    const [refetch, setRefetch] = useState(false)
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log(`FarmProvider: ${loading ? "loading @" : "loaded @"} ${farm?.farm_name && farm?.farm_name}`)
    }, [farm]);

    useEffect(() => {
        const subscription = NetInfo.addEventListener(state => {
            if (!state.isConnected) setLoading(true);
            if (state.isConnected) handleRefetch();
        });
        return () => {
            subscription();
        }
    }, []);

    const handleRefetch = () => {
        setLoading(true);
        supabase.from("farmers")
            .select('username, farms!inner(farm_id, farm_name)')
            .eq('user_id', session?.user?.id)
            .single()
            .then((response: any) => {
                if (response.error) {
                    console.log(response.error.message);
                }
                if (!response.data?.farms) return;
                setFarm(response.data?.farms);
                setUsername(response.data?.username);
                setLoading(false);
            });
    };

    useEffect(() => {
        if ((sessionLoading || !session) && !refetch) return;
        supabase.from("farmers")
            .select('username, farms!inner(farm_id, farm_name)')
            .eq('user_id', session?.user?.id)
            .single()
            .then((response: any) => {
                if (response.error) {
                    console.log(response.error.message);
                }
                if (!response.data?.farms) {
                    setFarm({});
                    setLoading(false);
                    return;
                };
                setFarm(response.data?.farms);
                setUsername(response.data?.username);
                setLoading(false);
            });

    }, [session, sessionLoading, refetch]);

    const handleAddFarm = (farm: Omit<FarmType, "farm_id">) => {
        supabase.from("farms")
            .insert([{ ...farm, user_id: session?.user.id }])
            .single()
            .then((response: PostgrestMaybeSingleResponse<FarmType>) => {
                if (response.error) {
                    console.log(response.error.message);
                }
                if (response.data) setFarm(response.data);
            });
    }

    const handleEditFarm = (farm: FarmType) => {
        supabase.from("farms")
            .update(farm)
            .eq('farm_id', farm.farm_id)
            .single()
            .then((response: PostgrestMaybeSingleResponse<FarmType>) => {
                if (response.error) {
                    console.log(response.error.message);
                }
                if (response.data) setFarm(response.data);
            });
    }

    return (
        <FarmContext.Provider value={{ farm, username, setFarm, addFarm: handleAddFarm, editFarm: handleEditFarm, loading, refresh: handleRefetch }}>
            {children}
        </FarmContext.Provider>
    )
}