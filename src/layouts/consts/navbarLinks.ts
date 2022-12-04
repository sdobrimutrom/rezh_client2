import { Variant } from './navbarVariant';

interface Link {
    link: string;
    icon?: any;
    name: string;
}

const userNavLinks: Link[] = [
    { link: '/', name: 'Главная' },
    { link: '/news', name: 'Новости' },
    { link: '/requests', name: 'Обращения' }
];

const deputatNavLinks: Link[] = [
    { link: '/deputat', name: 'Главная' },
    { link: '/deputat/news', name: 'Новости' },
    { link: '/deputat/requests', name: 'Обращения' }
];

const adminNavLinks: Link[] = [
    { link: '/admin', name: 'Главная' },
    { link: '/admin/news', name: 'Новости' },
    { link: '/admin/requests', name: 'Обращения' }
];

export const getNavLinksFromVariant = (variant: Variant): Link[] => {
    switch (variant) {
        case Variant.ADMIN:
            return adminNavLinks;
        case Variant.USER:
            return userNavLinks;
        case Variant.DEPUTAT:
            return deputatNavLinks;
        default:
            return userNavLinks;
    }
};
