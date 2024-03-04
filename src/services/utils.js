export const ConvertFileToBase64 = (str) => {
    return Buffer.from(str).toString('base64');
};

export const ConvertBase64ToFile = (base64String) => {
    return Buffer.from(base64String, 'base64').toString('utf-8');
};