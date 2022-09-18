import { Class, MetadataKeys, Methods } from "../types";
import express, { RequestHandler } from "express";
import "reflect-metadata";
import { AppRouter } from "../../routes/AppRouter";

function validator(keys: string[]): RequestHandler {
    return function (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
            response.status(422).send("Invalid request");
            return;
        }

        for (let key of keys) {
            if (!request.body[key]) {
                response.status(422).send(`Invalid request, ${key} is missing`);
            }
        }

        next();
    };
}

export function controller(routePrefix: string) {
    return function (target: Class) {
        for (let key in target.prototype) {
            const path: string = Reflect.getMetadata(
                MetadataKeys.Path,
                target.prototype,
                key
            );

            const method: Methods = Reflect.getMetadata(
                MetadataKeys.Method,
                target.prototype,
                key
            );

            const middlewares: RequestHandler[] =
                Reflect.getMetadata(
                    MetadataKeys.Middleware,
                    target.prototype,
                    key
                ) || [];

            const requiredBodyProps =
                Reflect.getMetadata(
                    MetadataKeys.BodyValidator,
                    target.prototype,
                    key
                ) || [];

            const bodyValidator = validator(requiredBodyProps);

            if (path) {
                AppRouter.instance[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    bodyValidator,
                    target.prototype[key]
                );
            }
        }
    };
}
