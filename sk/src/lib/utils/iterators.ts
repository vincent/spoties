// https://stackoverflow.com/a/72968839

type GroupByMulti<T, K extends readonly any[]> =
    K extends readonly [any, ...infer KR] ?
    Record<string, GroupByMulti<T, KR>> : readonly T[];


export const groupBy = <T>(
    objArr: readonly T[],
    property: string,
) => objArr.reduce((memo, x) => {
    if (x[property]) {
        const value = (x[property]).toString();
        if (!memo[value]) {
            memo[value] = [];
        }
        memo[value].push(x);
    }
    return memo;
}, {} as Record<string, T[]>);


export const groupByMulti = <
    T extends Record<K[number], {}>,
    K extends readonly (keyof T)[]
>(arr: readonly T[], keys: readonly string[], propIndex = 0) => {
    var grouppedObj: any = groupBy(arr, keys[propIndex]);
    Object.keys(grouppedObj).forEach((key) => {
        if (propIndex < keys.length - 1) {
            grouppedObj[key] = groupByMulti<any, any[]>(
                grouppedObj[key], keys, propIndex + 1);
        } else {
            grouppedObj[key] = grouppedObj[key]
        }
    });
    return grouppedObj as GroupByMulti<T, K>;
}


