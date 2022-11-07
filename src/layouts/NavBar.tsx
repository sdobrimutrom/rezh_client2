import { useTheme } from '@emotion/react';
import * as React from 'react';
import { useMemo } from 'react';
import { Button, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { getNavLinksFromVariant } from './consts/navbarLinks';
import { Variant } from './consts/navbarVariant';

interface NavBarProps {
    variant: Variant;
}

export default function NavBar({ variant }: NavBarProps) {
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
        <>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about-us">Contact Us</Nav.Link>
                        <Nav.Link href="/contact-us">About Us</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
        // <Box sx={ { display: 'flex' } }>
        //     <CssBaseline />
        //     <AppBar position="fixed" open={ navbarOpen }>
        //         <Toolbar>
        //             <IconButton
        //                 color="inherit"
        //                 aria-label="open drawer"
        //                 onClick={ handleDrawerOpen }
        //                 edge="start"
        //                 sx={ { mr: 2, ...(navbarOpen && { display: 'none' }) } }>
        //                 <MenuIcon />
        //             </IconButton>
        //             <Typography variant="h6" noWrap component="div">
        //                 { getNameFromVariant(variant) }
        //             </Typography>
        //             <Box marginLeft={ 'auto' }>
        //                 <IconButton
        //                     size="large"
        //                     aria-label="account of current user"
        //                     aria-controls="menu-appbar"
        //                     aria-haspopup="true"
        //                     onClick={ handleUserMenuChange }
        //                     color="inherit">
        //                     <AccountCircle />
        //                 </IconButton>
        //                 <Menu
        //                     id="menu-appbar"
        //                     anchorEl={ userMenuOpen }
        //                     anchorOrigin={ {
        //                         vertical: 'top',
        //                         horizontal: 'right',
        //                     } }
        //                     keepMounted
        //                     transformOrigin={ {
        //                         vertical: 'top',
        //                         horizontal: 'right',
        //                     } }
        //                     open={ Boolean(userMenuOpen) }
        //                     onClose={ handleUserMenuClose }>
        //                     <MenuItem onClick={ handleLoginModalOpen }>Авторизоваться</MenuItem>
        //                     <LoginModal open={ loginModalOpen } handleClose={ handleLoginModalClose } />
        //                     <MenuItem onClick={ handleUserMenuClose }>Профиль</MenuItem>
        //                     <MenuItem onClick={ handleLogoutModalOpen }>Выйти</MenuItem>
        //                     <LogoutModal open={ logoutModalOpen } handleClose={ handleLogoutModalClose } />
        //                 </Menu>
        //             </Box>
        //         </Toolbar>
        //     </AppBar>
        //     <Drawer
        //         sx={ {
        //             width: drawerWidth,
        //             flexShrink: 0,
        //             '& .MuiDrawer-paper': {
        //                 width: drawerWidth,
        //                 boxSizing: 'border-box',
        //             },
        //         } }
        //         variant="persistent"
        //         anchor="left"
        //         open={ navbarOpen }>
        //         <DrawerHeader>
        //             <Typography variant="h6" noWrap component="div" marginX={ 'auto' }>
        //                 Навигация
        //             </Typography>
        //             <IconButton onClick={ handleDrawerClose }>
        //                 { theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
        //             </IconButton>
        //         </DrawerHeader>
        //         <Divider />
        //         <List>
        //             { navLinks.map((link) => (
        //                 <ListItem key={ link.name } disablePadding>
        //                     <RouterLink to={ link.link } text={ link.name } icon={ link.icon } />
        //                 </ListItem>
        //             )) }
        //         </List>
        //         <Divider />
        //         <List>
        //             <ListItem disablePadding>
        //                 <RouterLink to={ '/deputat' } text={ 'Перейти в панель депутата' } icon={ EmojiPeople } />
        //             </ListItem>
        //             <ListItem disablePadding>
        //                 <RouterLink to={ '/admin' } text={ 'Перейти в панель админа' }
        //                             icon={ AdminPanelSettingsIcon } />
        //             </ListItem>
        //         </List>
        //     </Drawer>
        //     <Main open={ navbarOpen }>
        //         <DrawerHeader />
        //         <Outlet />
        //     </Main>
        // </Box>
    );
}
