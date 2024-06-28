import { Children, Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

type FeedContextType = {
    feed: number;
    setFeed: Dispatch<SetStateAction<any>>;
};

export const FeedContext = createContext<FeedContextType>({feed: 2, setFeed: () => {}});

export const FeedProvider = ({ children }:{ children: React.ReactNode}) => {
    const [ feed, setFeed ] = useState<number>(2); 
    console.log("feed: ", feed)
    return (
        <FeedContext.Provider value={{ feed, setFeed }}>
            {children}
        </FeedContext.Provider>
    );
}