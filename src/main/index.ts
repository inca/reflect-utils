import 'reflect-metadata';

export function addClassMetadata<T>(key: Symbol | string, target: any, datum: T) {
    const _target = target instanceof Function ? target.prototype : target;
    const metadata = Reflect.getOwnMetadata(key, _target) || [];
    metadata.push(datum);
    Reflect.defineMetadata(key, metadata, _target);
}

export function getClassMetadata<T>(key: Symbol | string, target: any): T[] {
    const _target = target instanceof Function ? target.prototype : target;
    let result: T[] = [];
    let proto = _target;
    while (proto !== Object.prototype) {
        const ownMetadata: T[] = Reflect.getOwnMetadata(key, proto) || [];
        result = ownMetadata.concat(result);
        proto = Object.getPrototypeOf(proto);
    }
    return result;
}
