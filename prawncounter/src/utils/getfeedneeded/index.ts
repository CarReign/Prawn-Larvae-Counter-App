export default function getFeedNeeded(count: number) {
    const level = Math.floor(count / 50);
    let feedNeeded = 1 / 8;
    for (let i = 0; i < level; i++) {
        feedNeeded += 1/2;
    }
    return feedNeeded;
}