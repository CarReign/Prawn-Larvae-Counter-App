import { useContext } from "react";
import { PondContext } from "../../providers/pondprovider";

export default function usePond() {
    return useContext(PondContext);
}