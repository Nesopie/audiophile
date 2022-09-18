import { Router } from "express";

export class AppRouter {
    private static router: Router;
    private constructor() {}

    static get instance() {
        if (!AppRouter.router) AppRouter.router = Router();
        return AppRouter.router;
    }
}
