import express, { Router } from "express";
import authRoutes from "./modules/auth/auth.route";
import locationRoutes from "./modules/location/location.route";

const router: Router = express.Router();

const routes: { path: string; route: Router }[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/location",
    route: locationRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
