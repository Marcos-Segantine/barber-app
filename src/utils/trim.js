export const trim = (data) => {
    if (typeof data === 'string') {
        return data.trim()
    }

    for (const string of data) {
        data[string] = data[string].trim()
    }

    return data
}