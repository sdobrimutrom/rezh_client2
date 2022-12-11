export enum EVariant {
    ADMIN = 'admin',
    USER = 'user',
    DEPUTAT = 'deputat'
}

export const getNameFromVariant = (variant: EVariant): string => {
    switch (variant) {
        case EVariant.ADMIN:
            return 'Админ-панель';
        case EVariant.USER:
            return 'Электронный портал города Реж';
        case EVariant.DEPUTAT:
            return 'Панель депутата';
        default:
            return 'Электронный портал города Реж';
    }
};
