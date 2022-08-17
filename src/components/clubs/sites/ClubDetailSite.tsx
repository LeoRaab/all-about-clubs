import React from "react";
import HeaderBar from "../../ui/HeaderBar";
import { ClubsRoutes } from "../routes/ClubsRoutes";

export const ClubDetailSite = () => {
    return (
        <React.Fragment>
            <HeaderBar backTo={ClubsRoutes.ROOT} title="Detail" />
        </React.Fragment>
    );
};
