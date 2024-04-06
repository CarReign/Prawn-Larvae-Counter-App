import { createContext, useEffect, useState } from "react";
import { supabase } from "../../libs/supabase";
import { AuthError, Session } from "@supabase/supabase-js";
import { Text } from "react-native";


export const AuthContext = createContext<{ session?: Session | null, loading?: boolean }>({});

type SessionData = { 
    data: { session: Session | null; }; error: AuthError | null; 
} 

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const session = supabase.auth.getSession().then((sessionData: SessionData) => {
            if (sessionData.error) {
                setSession(null);
                return;
            };
            if (sessionData.data.session) {
                setSession(sessionData.data.session);
                return;
            };
            setSession(null);
        }).catch(() => {
            setSession(null);
        }).finally(() => {
            setLoading(false);
        });
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, updatedSession) => {
                setSession(updatedSession);
            }
        );
        return () => {
            authListener.subscription.unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ session, loading }}>
            {children}
        </AuthContext.Provider>
    );
}