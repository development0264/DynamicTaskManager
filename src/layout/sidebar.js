import { Divider, IconButton, List, Toolbar } from "@mui/material";
import { mainListItems } from "./listItems";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Drawer } from "../components/Mui/StyledComponent";


const Sidebar = ({ open, toggleDrawer }) => {
    return (
        <div>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                </List>
            </Drawer>
        </div>
    );
}
export default Sidebar;