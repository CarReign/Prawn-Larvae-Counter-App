import { createContext, useEffect, useState } from "react"
import usePond from "../../hooks/usePond";
import { supabase } from "../../libs/supabase";

type CountType = {
    count_id: number;
    pond_id: number;
    count: number;
    created_at: string;
}

type CountContextType = {
    counts?: CountType[];
    addCount: (count: Omit<Omit<CountType, "count_id">, "created_at">) => void;
    updateCount: (count: CountType) => void;
    deleteCount: (count: CountType) => void;
}

export const CountContext = createContext({})

export default function CountProvider({ children }: { children: React.ReactNode }) {
    const [counts, setCounts] = useState<CountType[]>([]);
    const {ponds, loading: pondLoading} = usePond();

    useEffect(() => {
        if (pondLoading || !ponds) return;
        const pondFetchInterval = setInterval(() => {
            supabase.from("counts")
                .select("*")
                .in("pond_id", ponds.map(pond => pond.pond_id))
                .then((response) => {
                    if (response.error) {
                        console.log(response.error.message);
                    }
                setCounts(response.data || []);
            });
        }, 300000);
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

    return <CountContext.Provider value={{}}>
        {children}
    </CountContext.Provider>
}