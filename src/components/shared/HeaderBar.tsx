import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import { Styles } from "../util/Styles";
import { pushRoute } from "../app/router/history";

interface HeaderBarProps {
    title?: string;
    backTo?: string;
    children?: JSX.Element;
}

const HeaderBar = ({ title, backTo, children }: HeaderBarProps) => {
    return (
        <div style={{ height: "4rem" }}>
            <Box>
                <AppBar position="fixed">
                    <Toolbar>
                        {backTo && (
                            <IconButton
                                size="large"
                                edge="start"
                                color="secondary"
                                aria-label="back"
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    pushRoute(backTo);
                                }}
                            >
                                <BackIcon />
                            </IconButton>
                        )}
                        <Typography variant="h6" color={Styles.SECONDARY_COLOR} component="div" sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        {children}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default HeaderBar;
