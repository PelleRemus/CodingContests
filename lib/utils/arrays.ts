export function hasDuplicates(points: any[]) {
    const s = points.map(x => JSON.stringify(x))
    const set = new Set(s)
    return points.length === set.size;
}