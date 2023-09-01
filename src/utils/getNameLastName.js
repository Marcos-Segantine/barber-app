export const getNameLastName = (name) => {
    return name.split(" ").splice(0, 2).join(" ")
}