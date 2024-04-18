import { createContext, useEffect, useState } from "react"
import usePond from "../../hooks/usePond";
import { supabase } from "../../libs/supabase";
import { add } from "@techstark/opencv-js";
import { ToastAndroid } from "react-native";

type CountType = {
    count_id: number;
    pond_id: number;
    path: string;
    count: number;
    created_at: string;
}

type CountContextType = {
    counts?: CountType[];
    loading?: boolean;
    addCount?: (pond_id: number, path: string, count: number) => void;
    updateCount?: (count: CountType) => void;
    deleteCount?: (count_id: number) => void;
    refetch?: () => void;
}

export const CountContext = createContext<CountContextType>({})

export default function CountProvider({ children }: { children: React.ReactNode }) {
    const [counts, setCounts] = useState<CountType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { ponds, loading: pondLoading } = usePond();

    useEffect(() => {
        const sum = counts.length && counts.reduce((acc, count) => acc + count.count, 0);
        console.log(`CountProvider: ${!pondLoading ? "loaded @" : "loading @"} ${counts.length} ${sum ? `totalling ${sum}` : ""}`)
    }, [counts]);

    useEffect(() => {
        if (pondLoading || !ponds) return;
        supabase.from("counts")
            .select("*")
            .in("pond_id", ponds.map(pond => pond.pond_id))
            .then((response) => {
                if (response.error) {
                    console.log(response.error.message);
                }
                setCounts(response.data || []);
                setLoading(false);
            });
        const pondFetchInterval = setInterval(() => {
            setLoading(true);
            supabase.from("counts")
                .select("*")
                .in("pond_id", ponds.map(pond => pond.pond_id))
                .then((response) => {
                    if (response.error) {
                        console.log(response.error.message);
                    }
                    setCounts(response.data || []);
                    setLoading(false);
                });
        }, 50000);
        return () => {
            clearInterval(pondFetchInterval);
        }
    }, [pondLoading]);

    const handleAddCount = async (pond_id: number, path: string, count: number) => {
        await supabase.from("counts")
            .insert([{ pond_id, path, count }])
            .then((response) => {
                if (response.error) {
                    console.log("Handle Add Count:", response.error.message);
                    ToastAndroid.showWithGravity("Something Went Wrong", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                }
                if (response.data) setCounts([...counts, response.data]);
            });
    }

    const handleUpdateCount = (count: CountType) => {
        supabase.from("counts")
            .update(count)
            .eq("count_id", count.count_id)
            .then((response) => {
                if (response.error) {
                    console.log(response.error.message);
                }
                if (response.data) setCounts(counts.map(c => c.count_id === count.count_id ? count : c));
            });
    }

    const handleDeleteCount = (count_id: number) => {
        supabase.from("counts")
            .delete()
            .eq("count_id", count_id)
            .then((response) => {
                if (response.error) {
                    console.log(response.error.message);
                }
                if (response.data) setCounts(counts.filter(c => c.count_id !== count_id));
            });
    }

    const handleRefetch = () => {
        setLoading(true);
    }

    return <CountContext.Provider value={{ counts, loading, addCount: handleAddCount, updateCount: handleUpdateCount, deleteCount: handleDeleteCount, refetch: handleRefetch }}>
        {children}
    </CountContext.Provider>
}