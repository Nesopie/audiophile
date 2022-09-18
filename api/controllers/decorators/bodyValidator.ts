import { MetadataKeys } from "../types";

export function bodyValidator(...keys: string[]): Function {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(MetadataKeys.BodyValidator, keys, target, key);
    };
}
