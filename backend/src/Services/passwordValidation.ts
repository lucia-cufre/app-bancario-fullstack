export const regexPassword = () => {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,35}$/;
 };