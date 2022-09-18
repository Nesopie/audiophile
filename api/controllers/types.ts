import { RequestHandler } from "express";

export enum Methods {
    Get = "get",
    Post = "post",
    Patch = "patch",
    Del = "delete",
    Put = "put",
}

export enum MetadataKeys {
    Path = "path",
    Method = "method",
    Middleware = "middleware",
    BodyValidator = "bodyValidator",
}

export type Class = new (...args: any) => any;

export interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
}
