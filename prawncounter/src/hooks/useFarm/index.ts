import { useContext } from "react";
import { FarmContext } from "../../providers/farmprovider";

export default function useFarm() {
    return useContext(FarmContext);
}