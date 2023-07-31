export const isValidPhoneNumber = (phoneNumber) => {
    if (phoneNumber === undefined) return false

    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    if (cleanedNumber.length !== 10 && cleanedNumber.length !== 11) return false;

    return true;
}
