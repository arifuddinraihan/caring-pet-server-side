/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { PetsRoutes } from "../modules/Pet/pet.routes";
import { AdoptionRoutes } from "../modules/Adoption/adoption.routes";
import { UserRoutes } from "../modules/User/user.routes";
import { OtherAdoptionRoutes } from "../modules/Adoption/OtherAdoptions.routes";

const router = Router();

type TModuleRoute = {
  path: string;
  route: any;
};

const moduleRoutes: TModuleRoute[] = [
  {
    path: "/",
    route: AuthRoutes,
  },
  {
    path: "/pets",
    route: PetsRoutes,
  },
  {
    path: "/adoption-request",
    route: AdoptionRoutes,
  },
  {
    path: "/adoption-requests",
    route: OtherAdoptionRoutes,
  },
  {
    path: "/profile",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
