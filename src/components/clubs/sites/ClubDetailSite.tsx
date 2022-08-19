import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { t } from "../../../i18n/util";
import { clubsStore, IClub } from "../../../stores/ClubsStore";
import { ErrorMessage } from "../../ui/ErrorMessage";
import HeaderBar from "../../shared/HeaderBar";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { ImageClub } from "../../util/Images";
import { Styles } from "../../util/Styles";
import { ClubsRoutes } from "../routes/ClubsRoutes";

export const ClubDetailSite = observer(() => {
    const [error, setError] = React.useState<string>();
    const [club, setClub] = React.useState<IClub>();
    const { clubId } = useParams<{ clubId: string }>();

    if (!clubId) {
        setError(t("screen.detail.error_no_parameters"));
    }

    useEffect(() => {
        let club: IClub | undefined;
        club = clubsStore.getClubById(clubId);

        if (!club) {
            const arrayId = parseInt(clubId);
            club = clubsStore.getClubByArrayId(arrayId);
        }

        if (club) {
            setClub(club);
        } else {
            setError(t("screen.detail.error_wrong_parameters"));
        }
    }, [clubId]);

    return (
        <React.Fragment>
            <HeaderBar title={club?.name} backTo={ClubsRoutes.ROOT} />

            {clubsStore.isLoading && <LoadingOverlay />}

            {!clubsStore.isLoading && !error && club && (
                <React.Fragment>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                            backgroundColor: "#333333",
                            padding: "1rem",
                        }}
                    >
                        <h2
                            style={{
                                position: "absolute",
                                left: "1rem",
                                bottom: "1rem",
                                color: Styles.SECONDARY_COLOR,
                            }}
                        >
                            {club.country}
                        </h2>
                        <Container maxWidth="xs">
                            <ImageClub
                                clubName={club.name}
                                imageSrc={club.image}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </Container>
                    </div>
                    <div style={{ padding: "1.2rem" }}>
                        <p>
                            {t("screen.detail.club_value", {
                                name: club.name,
                                country: club.country,
                                value: club.value,
                                bold: (str: string) => <strong>{str}</strong>,
                            })}
                        </p>
                        <p style={{ marginTop: "2rem" }}>
                            {t("screen.detail.european_titles", {
                                name: club.name,
                                european_titles: club.european_titles,
                                bold: (str: string) => <strong>{str}</strong>,
                            })}
                        </p>
                    </div>
                </React.Fragment>
            )}

            {(error || !club) && <ErrorMessage>{error}</ErrorMessage>}
        </React.Fragment>
    );
});
