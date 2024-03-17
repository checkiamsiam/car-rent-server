import express, { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import carsRoutes from "./modules/cars/cars.routes";
import locationRoutes from "./modules/location/location.routes";
import searchRoutes from "./modules/search/search.routes";

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
  {
    path: "/cars",
    route: carsRoutes,
  },
  {
    path: "/search",
    route: searchRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
