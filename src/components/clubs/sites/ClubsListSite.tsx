import IconButton from "@mui/material/IconButton";
import { t } from "../../../i18n/util";
import HeaderBar from "../../ui/HeaderBar";
import SortIcon from "@mui/icons-material/Sort";
import { clubsStore } from "../../../stores/ClubsStore";
import React from "react";
import { observer } from "mobx-react";
import { ClubsList } from "../ClubsList";
import { action } from "mobx";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { ErrorMessage } from "../../ui/ErrorMessage";

const ClubsListSite = observer(() => {
    const [error, setError] = React.useState<string>();
    const [sortedBy, setSortedBy] = React.useState<"name" | "value">("name");

    React.useEffect(() => {
        const loadClubs = async () => {
            try {
                await clubsStore.loadClubs();
            } catch (error) {
                setError(t("screen.list.error_during_loading"));
            }
        };

        loadClubs();
    }, []);

    const handleSortClick = action(() => {
        if (sortedBy === "name") {
            clubsStore.changeSorting("value", "desc");
            setSortedBy("value");
        }

        if (sortedBy === "value") {
            clubsStore.changeSorting("name");
            setSortedBy("name");
        }
    });

    if (!clubsStore.isRehydrated) {
        return null;
    }

    return (
        <>
            <HeaderBar title={t("common.app_name")}>
                <IconButton color="secondary" onClick={handleSortClick}>
                    <SortIcon />
                </IconButton>
            </HeaderBar>
            <ClubsList />
            {clubsStore.isLoading && <LoadingOverlay />}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
});

export default ClubsListSite;
