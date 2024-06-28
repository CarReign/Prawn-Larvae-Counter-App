import { Pressable, Text } from "react-native";
import { supabase } from "../../libs/supabase";

export default function SignOutButton({ callback }: { callback: () => void }) {
    const handleSignOut = async () => {
        callback();
        await supabase.auth.signOut().then(() => {
            console.log("Signed Out");
        });
    }

    return <Pressable onPress={handleSignOut} className="flex items-center justify-center bg-[#1F375D] rounded-md py-2 px-4">
        <Text className="text-white">Sign Out</Text>
    </Pressable>
}