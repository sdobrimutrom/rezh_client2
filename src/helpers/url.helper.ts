export const getFileURL = (filePath: string): string => {
    return `${ process.env.REACT_APP_API_URL }/${ filePath }`;
};