import { supabase } from "../lib/supabase/init";


export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setSession(session);
        setUser(session ? true : false);
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log(`Supabase auth event: ${event}`);
                setSession(session);
                setUser(session ? true : false);
            }
        );
        return () => {
            authListener.unsubscribe();
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, session }}>
            {children}
        </AuthContext.Provider>
    );
}