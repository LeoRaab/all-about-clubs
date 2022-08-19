import { observer } from "mobx-react";
import * as React from "react";
import { Router } from "react-router-dom";
import { generalStore } from "../../../stores/GeneralStore";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { AuthLoginSite } from "../../auth/sites/AuthLoginSite";
import { CustomSwitch } from "./CustomSwitch";
import { history } from "./history";
import { NoAuthOnlyRoute } from "./NoAuthOnlyRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Routes } from "./Routes";
import { RoutingManager } from "./RoutingManager";
import { ClubsContainerSite } from "../../clubs/sites/ClubsContainerSite";

export const AppRouter = observer(() => (
    <>
        <Router history={history}>
            <RoutingManager>
                <CustomSwitch>
                    <ClubsContainerSite />
                    {/* <NoAuthOnlyRoute exact path={Routes.ROOT}>
                        <AuthLoginSite />
                    </NoAuthOnlyRoute>
                    <PrivateRoute path={DashboardRoutes.ROOT}>
                        <DashboardContainerSite />
                    </PrivateRoute> */}
                </CustomSwitch>
            </RoutingManager>
        </Router>
        {generalStore.isLoading && <LoadingOverlay />}
    </>
));
