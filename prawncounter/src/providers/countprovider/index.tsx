import { createContext, useEffect, useState } from "react"
import usePond from "../../hooks/usePond";
import { supabase } from "../../libs/supabase";
import { add } from "@techstark/opencv-js";

type CountType = {
    count_id: number;
    pond_id: number;
    count: number;
    created_at: string;
}

type CountContextType = {
    counts?: CountType[];
    loading?: boolean;
    addCount?: (pond_id: number, count: number) => void;
    updateCount?: (count: CountType) => void;
    deleteCount?: (count_id: number) => void;
}

export const CountContext = createContext<CountContextType>({})

export default function CountProvider({ children }: { children: React.ReactNode }) {
    const [counts, setCounts] = useState<CountType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const {ponds, loading: pondLoading} = usePond();

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

    const handleAddCount = (pond_id: number, count: number) => {
        supabase.from("counts")
            .insert([{pond_id, count}])
            .then((response) => {
                if (response.error) {
                    console.log(response.error.message);
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

    return <CountContext.Provider value={{counts, loading, addCount: handleAddCount, updateCount: handleUpdateCount, deleteCount: handleDeleteCount}}>
        {children}
    </CountContext.Provider>
}