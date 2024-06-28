import { useContext } from "react";
import { FeedContext } from "../../providers/feedprovider";

export default function getFeedNeeded(count: number) {
    const { feed } = useContext(FeedContext)
    if (!count) return 0;

    const feedPerLarva = feed / 100000; 
    const feedNeeded = count * feedPerLarva;

    const roundedFeedNeeded = parseFloat(feedNeeded.toFixed(3));

    return roundedFeedNeeded;
}