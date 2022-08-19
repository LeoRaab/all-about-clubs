import { observer } from "mobx-react";
import * as React from "react";
import { Router } from "react-router-dom";
import { generalStore } from "../../../stores/GeneralStore";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { CustomSwitch } from "./CustomSwitch";
import { history } from "./history";
import { RoutingManager } from "./RoutingManager";
import { ClubsContainerSite } from "../../clubs/sites/ClubsContainerSite";

export const AppRouter = observer(() => (
    <>
        <Router history={history}>
            <RoutingManager>
                <CustomSwitch>
                    <ClubsContainerSite />
                </CustomSwitch>
            </RoutingManager>
        </Router>
        {generalStore.isLoading && <LoadingOverlay />}
    </>
));
