import "reflect-metadata";
import { MetadataKeys, Methods, RouteHandlerDescriptor } from "../types";

function routeBinder(method: string) {
    return function (path: string): Function {
        return function (
            target: any,
            key: string,
            _desc: RouteHandlerDescriptor
        ): void {
            Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
            Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
        };
    };
}

export const get = routeBinder(Methods.Get);
export const post = routeBinder(Methods.Post);
export const patch = routeBinder(Methods.Patch);
export const del = routeBinder(Methods.Del);
export const put = routeBinder(Methods.Put);
