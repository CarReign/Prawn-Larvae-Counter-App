import { useContext } from "react";
import { CountContext } from "../../providers/countprovider";

export default function useCount() {
    return useContext(CountContext);
}