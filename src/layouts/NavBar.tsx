import { AccountCircle } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Menu, MenuItem } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import LoginModal from '../components/LoginModal';
import { RouterLink } from '../components/RouterLink';
import { getNavLinksFromVariant } from './consts/navbarLinks';
import { getNameFromVariant } from './consts/navbarTitles';
import { Variant } from './consts/navbarVariant';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));

interface NavBarProps {
    variant: Variant;
}

export default function NavBar({ variant }: NavBarProps) {
    const theme = useTheme();
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [userMenuOpen, setUserMenuOpen] = React.useState<null | HTMLElement>(null);
    const [loginModalOpen, setLoginModalOpen] = React.useState(false);
    const [registrationModalOpen, setRegistrationModalOpen] = React.useState(false);

    const handleLoginModalOpen = () => {
        setLoginModalOpen(true);
        handleUserMenuClose();
    };

    const handleLoginModalClose = () => {
        setLoginModalOpen(false);
        handleUserMenuClose();
    };

    const handleRegistrationModalOpen = () => {
        setRegistrationModalOpen(true);
        handleUserMenuClose();
    };

    const handleRegistrationModalClose = () => {
        setRegistrationModalOpen(false);
        handleUserMenuClose();
    };

    const handleUserMenuChange = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuOpen(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuOpen(null);
    };

    const handleDrawerOpen = () => {
        setNavbarOpen(true);
    };

    const handleDrawerClose = () => {
        setNavbarOpen(false);
    };

    const navLinks = useMemo(() => {
        return getNavLinksFromVariant(variant);
    }, [variant]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={navbarOpen}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(navbarOpen && { display: 'none' }) }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {getNameFromVariant(variant)}
                    </Typography>
                    <Box marginLeft={'auto'}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleUserMenuChange}
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={userMenuOpen}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(userMenuOpen)}
                            onClose={handleUserMenuClose}>
                            <MenuItem onClick={handleLoginModalOpen}>Авторизоваться</MenuItem>
                            <LoginModal open={loginModalOpen} handleClose={handleLoginModalClose} />
                            <MenuItem onClick={handleUserMenuClose}>Профиль</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={navbarOpen}>
                <DrawerHeader>
                    <Typography variant="h6" noWrap component="div" marginX={'auto'}>
                        Навигация
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {navLinks.map((link) => (
                        <ListItem key={link.name} disablePadding>
                            <RouterLink to={link.link} text={link.name} icon={link.icon} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Перейти в админ панель', 'Перейти в панель депутата'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={navbarOpen}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    );
}
