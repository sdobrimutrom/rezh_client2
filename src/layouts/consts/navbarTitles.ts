import { Variant } from './navbarVariant';

export const getNameFromVariant = (variant: Variant): string => {
    switch (variant) {
        case Variant.ADMIN:
            return 'Админ-панель';
        case Variant.USER:
            return 'Электронный портал города Реж';
        case Variant.DEPUTAT:
            return 'Панель депутата';
        default:
            return 'Электронный портал города Реж';
    }
};
