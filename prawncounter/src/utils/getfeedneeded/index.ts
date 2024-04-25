export default function getFeedNeeded(count: number) {
    if (!count) return 0;

    const feedPerLarva = 2 / 100000; 
    const feedNeeded = count * feedPerLarva;

    const roundedFeedNeeded = parseFloat(feedNeeded.toFixed(3));

    return roundedFeedNeeded;
}