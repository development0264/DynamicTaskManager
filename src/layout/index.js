import { Box, CssBaseline } from "@mui/material";
import Header from "./header";
import Sidebar from "./sidebar";
import { useState } from "react";

const Layout = ({ children }) => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header open={open} toggleDrawer={toggleDrawer} />
                <Sidebar open={open} toggleDrawer={toggleDrawer} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        marginTop: '64px',
                        padding: '20px',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    )
}
export default Layout;