import { Badge, Button, IconButton, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar } from "../components/Mui/StyledComponent";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ open, toggleDrawer }) => {

    const navigate = useNavigate();

    return (
        <div>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Task Management
                    </Typography>
                    <Link to='/' style={{display: "block", color: "white", textDecoration: 'none' }}>
                        Logout
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header;