export const required = (value) => {
    if (value) return undefined 
    return 'Field is requred'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max lenght is ${maxLength} symbols`
    return undefined
}


export const minLengthCreator = (minLength) => (value) => {
    if (value.length < minLength) return `Min legth is ${minLength} symbols`
    return undefined
}

