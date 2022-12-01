import { iNotification } from 'react-notifications-component';

export const PAGE_LIMIT = 5;

export const moderatingText = (approved: boolean | undefined, moderated: boolean | undefined): JSX.Element => {
    if (approved === undefined || moderated === undefined) {
        return <span className={ 'text-warning' }>В обработке</span>;
    }

    return moderated
        ? approved
            ? <span className={ 'text-success' }>Принято</span>
            : <span className={ 'text-danger' }>Отклонено</span>
        : <span className={ 'text-warning' }>В обработке</span>;
};

export const ErrorNotification = (message: string): iNotification =>
    ({
        title: 'Ошибка',
        message: message ?? 'Неизвестная ошибка',
        type: 'danger',
        insert: 'bottom',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 3000,
            waitForAnimation: false,
        },
    } as iNotification);

export const SuccessNotification = (message: string): iNotification =>
    ({
        title: 'Успешно',
        message: message ?? 'Действие выполнено успешно',
        type: 'success',
        insert: 'bottom',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 3000,
            waitForAnimation: false,
        },
    } as iNotification);
