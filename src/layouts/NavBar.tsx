import { AccountCircle, EmojiPeople } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import LoginModal from '../components/LoginModal';
import LogoutModal from '../components/LogoutModal';
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
    const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
    const [registrationModalOpen, setRegistrationModalOpen] = React.useState(false);

    const handleLoginModalOpen = () => {
        setLoginModalOpen(true);
        handleUserMenuClose();
    };

    const handleLoginModalClose = () => {
        setLoginModalOpen(false);
        handleUserMenuClose();
    };

    const handleLogoutModalOpen = () => {
        setLogoutModalOpen(true);
        handleUserMenuClose();
    };

    const handleLogoutModalClose = () => {
        setLogoutModalOpen(false);
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
                            <MenuItem onClick={handleLogoutModalOpen}>Выйти</MenuItem>
                            <LogoutModal open={logoutModalOpen} handleClose={handleLogoutModalClose} />
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
                    <ListItem disablePadding>
                        <RouterLink to={'/deputat'} text={'Перейти в панель депутата'} icon={EmojiPeople} />
                    </ListItem>
                    <ListItem disablePadding>
                        <RouterLink to={'/admin'} text={'Перейти в панель админа'} icon={AdminPanelSettingsIcon} />
                    </ListItem>
                </List>
            </Drawer>
            <Main open={navbarOpen}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    );
}
