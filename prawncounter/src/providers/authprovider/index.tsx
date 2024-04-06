import { createContext, useEffect, useState } from "react";
import { supabase } from "../../libs/supabase";
import { AuthError, Session } from "@supabase/supabase-js";


export const AuthContext = createContext<{ session?: Session | null }>({});

type SessionData = { 
    data: { session: Session | null; }; error: AuthError | null; 
} 

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const session = supabase.auth.getSession().then((sessionData: SessionData) => {
            if (sessionData.error) {
                console.error(sessionData.error.message);
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
                console.log(`Supabase auth event: ${event}`);
                console.log(`Supabase auth updated session: ${updatedSession ? JSON.stringify(updatedSession) : updatedSession}`);
                setSession(updatedSession);
            }
        );
        return () => {
            authListener.subscription.unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}