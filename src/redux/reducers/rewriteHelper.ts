

export function rewrite<T>(original: T, updates: Partial<T>, base: any = {}){
    return Object.assign(base, original, updates) as T;
}