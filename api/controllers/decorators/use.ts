import { RequestHandler } from "express";
import { MetadataKeys } from "../types";

export function use(middleware: RequestHandler): Function {
    return function (target: any, key: string, _desc: PropertyDescriptor) {
        const middlewares =
            Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];
        Reflect.defineMetadata(
            MetadataKeys.Middleware,
            [...middlewares, middleware],
            target,
            key
        );
    };
}
