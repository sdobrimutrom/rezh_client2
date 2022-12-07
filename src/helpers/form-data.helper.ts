export const toFormData = (data: [string, any][]) => {
    const formData = new FormData();
    data.forEach((e) => {
        if (Array.isArray(e[1])) {
            for (let i = 0; i < e[1].length; i++) {
                formData.append(e[0], e[1][i]);
            }
        } else if (e[0] && (e[1] || e[1] === false)) {
            formData.append(e[0], e[1]);
        }
    });
    return formData;
};

