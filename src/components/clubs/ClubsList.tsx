import { List, ListItemAvatar, Avatar, ListItemText, Typography, Divider, ListItemButton } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { clubsStore } from "../../stores/ClubsStore";
import { pushRoute } from "../app/router/history";
import { ClubsRoutes } from "./routes/ClubsRoutes";

export const ClubsList = observer(() => {
    const handleClubClick = (clubId: string) => {
        pushRoute(ClubsRoutes.DETAIL, { params: { clubId: clubId.toString() } });
    };

    return (
        <List sx={{ width: "100%" }}>
            {clubsStore.sortedClubs?.map((club) => (
                <React.Fragment key={club.id}>
                    <ListItemButton alignItems="flex-start" onClick={() => handleClubClick(club.id)}>
                        <ListItemAvatar>
                            <Avatar alt={club.name} src={club.image} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={club.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {club.country}
                                    </Typography>
                                    {` ${club.value} Millionen Euro`}
                                </React.Fragment>
                            }
                        />
                    </ListItemButton>
                    <Divider variant="fullWidth" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
});
