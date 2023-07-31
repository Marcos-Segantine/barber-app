export const isValidEmail = (email) => {
    if(email === undefined) return false

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}