import { useContext } from "react";
import { OverlayContext } from "../../components/Overlay";

export default function useOverlay() {
    return useContext(OverlayContext);
}