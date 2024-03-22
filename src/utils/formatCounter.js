export default function formatCount(viewCount) {
    if (viewCount < 1000) return viewCount;
    const suffixes = ["", "k", "m", "b", "t"];
    const order = Math.floor(Math.log10(Math.abs(viewCount)) / 3);
    const divisor = 10 ** (order * 3);
    const shortValue = (viewCount / divisor).toFixed(1);
    return `${shortValue}${suffixes[order]}`;
}