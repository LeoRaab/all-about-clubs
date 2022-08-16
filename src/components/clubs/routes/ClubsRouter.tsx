import * as React from "react";
import { Route } from "react-router-dom";
import { CustomSwitch } from "../../app/router/CustomSwitch";
import ClubsListSite from "../sites/ClubsListSite";
import { ClubsRoutes } from "./ClubsRoutes";

export const ClubsRouter = () => (
    <CustomSwitch>
        <Route exact path={ClubsRoutes.ROOT}>
            <ClubsListSite />
        </Route>
    </CustomSwitch>
);
