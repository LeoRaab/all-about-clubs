import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { Styles } from "../util/Styles";
import { t } from "../../i18n/util";

interface HeaderBarProps {
    title: string;
    backButton: boolean;
    children?: JSX.Element;
}

const HeaderBar = ({ title, backButton, children }: HeaderBarProps) => {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color={Styles.SECONDARY_COLOR} component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    {children}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderBar;
