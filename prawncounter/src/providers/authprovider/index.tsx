import { createContext, useEffect, useState } from "react";
import { supabase } from "../../libs/supabase";
import { AuthError, Session } from "@supabase/supabase-js";
import { Text } from "react-native";


export const AuthContext = createContext<{
    session?: Session | null,
    loading?: boolean,
    reset?: () => void
}>({});

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
        });
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, updatedSession) => {
                console.log(`Supabase Auth: ${event}${updatedSession?.user ? `@ user ${updatedSession.user.email}` : " @ no auth"}`);
                if (!(session === null && updatedSession === null)) setSession(updatedSession);
                if (event === "INITIAL_SESSION") setLoading(false);
            }
        );
        return () => {
            authListener.subscription.unsubscribe();
        }
    }, []);

    const reset = () => {
        setSession(null);
    }

    return (
        <AuthContext.Provider value={{ session, loading, reset }}>
            {children}
        </AuthContext.Provider>
    );
}