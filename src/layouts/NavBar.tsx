import * as React from 'react';
import { useMemo } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { Outlet, useNavigate } from 'react-router-dom';

import { RouterLink } from '../router/components/RouterLink';
import { getNavLinksFromVariant } from './consts/navbarLinks';
import { Variant } from './consts/navbarVariant';
import LoginModal from '../components/LoginModal';
import LogoutModal from '../components/LogoutModal';
import { useAppSelector } from '../hooks/redux';

interface NavBarProps {
    variant: Variant;
}

export default function NavBar({ variant }: NavBarProps) {
    const navigate = useNavigate();

    const [loginModalOpen, setLoginModalOpen] = React.useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);

    const { user } = useAppSelector(state => state.userReducer);

    const roles = useMemo(() => {
        return user?.roles.map((role) => role.value);
    }, [user]);

    const handleLoginModalOpen = (value: boolean) => () => {
        setLoginModalOpen(value);
    };

    const handleLogoutModalOpen = (value: boolean) => () => {
        setLogoutModalOpen(value);
    };

    const renderUserLinks = useMemo(() => {
        if (user) {
            return (
                <>
                    <NavDropdown.Item onClick={ () => navigate('/profile') }>Профиль</NavDropdown.Item>
                    <NavDropdown.Item onClick={ handleLogoutModalOpen(true) }>Выход</NavDropdown.Item>
                </>
            );
        } else {
            return (
                <>
                    <NavDropdown.Item onClick={ handleLoginModalOpen(true) }>Авторизация</NavDropdown.Item>
                    <NavDropdown.Item onClick={ () => navigate('/registration') }>Регистрация</NavDropdown.Item>
                </>
            );
        }

    }, [user]);

    const renderChoosingRole = useMemo(() => {
        if (roles?.includes('DEPUTAT') || roles?.includes('ADMIN')) {
            return (
                <NavDropdown menuVariant={ 'dark' } title="Выбрать роль" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={ () => navigate('/') }>Пользователь</NavDropdown.Item>
                    { roles?.includes('DEPUTAT')
                        && <NavDropdown.Item onClick={ () => navigate('/deputat') }>Депутат</NavDropdown.Item> }
                    { roles?.includes('ADMIN')
                        && <NavDropdown.Item onClick={ () => navigate('/admin') }>Админ</NavDropdown.Item> }
                </NavDropdown>
            );
        }
    }, [user]);

    const navLinks = useMemo(() => {
        return getNavLinksFromVariant(variant);
    }, [variant]);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className={ 'px-4' }>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand onClick={ () => navigate('/') }>Электронный портал города Реж</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        { navLinks.map((link) => <RouterLink key={ link.name } to={ link.link } text={ link.name } />) }
                        { renderChoosingRole }
                        <NavDropdown menuVariant={ 'dark' } title={ <PersonCircle /> } id="basic-nav-dropdown">
                            { renderUserLinks }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <LoginModal open={ loginModalOpen } handleClose={ handleLoginModalOpen(false) } />
            <LogoutModal open={ logoutModalOpen } handleClose={ handleLogoutModalOpen(false) } />
            <Outlet />
        </>
    );
}
