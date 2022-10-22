import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';

import { Variant } from './variant';

interface Link {
    link: string;
    icon?: any;
    name: string;
}

const userNavLinks: Link[] = [
    { link: '/', icon: HomeIcon, name: 'Главная' },
    { link: '/news', icon: ArticleIcon, name: 'Новости' }
];

const deputatNavLinks: Link[] = [
    { link: '/deputat', icon: HomeIcon, name: 'Главная' },
    { link: '/deputat/news', name: 'Новости' }
];

const adminNavLinks: Link[] = [
    { link: '/admin', name: 'Главная' },
    { link: '/admin/news', name: 'Новости' }
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
