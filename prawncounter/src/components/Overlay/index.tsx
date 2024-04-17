import { createContext, useState } from "react";

type OverlayContextType = {
    openOverlay: () => void,
    closeOverlay: () => void,
}

export const OverlayContext = createContext<OverlayContextType>({ openOverlay: () => {}, closeOverlay: () => {}}) 


export default function Overlay({ children }: { children: React.ReactNode }){
    const [open, setOpen] = useState(false);

    const handleOpenOverlay = () => { setOpen(true) };

    const handleCloseOverlay = () => { setOpen(false) };

    return <>
        <OverlayContext.Provider value={{ openOverlay: handleOpenOverlay, closeOverlay: handleCloseOverlay }}>
            { open && <>Place Dark Overlay Here</> }
            { children } 
        </OverlayContext.Provider>
    </>

}