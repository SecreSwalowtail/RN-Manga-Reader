const generateRandomString = length => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const characterArray = Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length)));
    return characterArray.join('');
};

export const getNewCodeVerifier = () => {
    const codeVerifier = generateRandomString(43 + Math.floor(Math.random() * (128 - 43 + 1)));
    return codeVerifier;
};