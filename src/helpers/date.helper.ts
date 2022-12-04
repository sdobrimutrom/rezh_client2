export const getDateString = (date?: Date) => {
    if (!date) {
        return undefined;
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    } as Intl.DateTimeFormatOptions;

    return new Date(date).toLocaleDateString('ru-RU', options);
};