import { Routes } from "../../app/router/Routes";

const prefix = (route: string) => Routes.ROOT + route;

export const ClubsRoutes = {
    ROOT: prefix(""),
    DETAIL: prefix("detailsview/:clubId"),
};
