import { RouterLink } from '../router/components/RouterLink';
import * as React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EVariant } from './consts';

export const renderLinks = (variant: EVariant) => {
    switch (variant) {
        case EVariant.USER:
            return renderUserLinks();
        case EVariant.DEPUTAT:
            return renderDeputatLinks();
        case EVariant.ADMIN:
            return renderAdminLinks();
        default:
            return renderDefaultLinks();

    }
}

const renderUserLinks = () => {
    const navigate = useNavigate();

    return <>
        <RouterLink to={'/'}>
            <div>{ 'Главная' }</div>
        </RouterLink>
        <RouterLink to={'/news'}>
            Новости
        </RouterLink>
        <NavDropdown id="basic-navbar-nav" menuVariant={'dark'} title={'Обращения'}>
            <NavDropdown.Item onClick={() => navigate('/requests')}>
                Мои обращения
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/requests/create')}>
                Оставить обращение
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/requests/frequency')}>
                Частые обращения
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/requests/search')}>
                Поиск по номеру
            </NavDropdown.Item>
        </NavDropdown>
    </>
}

const renderDeputatLinks = () => {
    const navigate = useNavigate();

    return <>
        <RouterLink to={'/deputat'}>
            <div>{ 'Главная' }</div>
        </RouterLink>
        <RouterLink to={'/news'}>
            Новости
        </RouterLink>
        <RouterLink to={'/deputat/requests'}>
            Обращения
        </RouterLink>
    </>
}

const renderAdminLinks = () => {
    const navigate = useNavigate();

    return <>
        <RouterLink to={'/admin'}>
            <div>{ 'Главная' }</div>
        </RouterLink>
        <RouterLink to={'/admin/news'}>
            Новости
        </RouterLink>
        <RouterLink to={'/admin/requests'}>
            Обращения
        </RouterLink>
    </>
}

const renderDefaultLinks = () => {
    const navigate = useNavigate();

    return <>
        <RouterLink to={'/'}>
            <div>{ 'Главная' }</div>
        </RouterLink>
        <RouterLink to={'/news'}>
            Новости
        </RouterLink>
        <NavDropdown id="basic-navbar-nav" menuVariant={'dark'} title={'Обращения'}>
            <NavDropdown.Item onClick={() => navigate('/requests/create')}>
                Оставить обращение
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/requests/frequency')}>
                Частые обращения
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/requests/search')}>
                Поиск по номеру
            </NavDropdown.Item>
        </NavDropdown>
    </>
}