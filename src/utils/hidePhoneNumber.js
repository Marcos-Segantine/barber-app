export const hidePhoneNumber = (phoneNumber) => {

    const firstPartNumber = phoneNumber.split("").splice(0, 4).join("")
    const finalPartNumber = phoneNumber.split("").splice(9).join("")

    return firstPartNumber + "*****" + finalPartNumber
}