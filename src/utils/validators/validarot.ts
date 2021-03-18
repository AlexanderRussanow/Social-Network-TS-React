
export type ValidatorType = (value: string) => string | undefined


export const required: ValidatorType = (value) => {
    if (value) return undefined 
    return 'Field is requred'
}

export const maxLengthCreator = (maxLength: number): ValidatorType => (value) => {
    if (value.length > maxLength) return `Max lenght is ${maxLength} symbols`
    return undefined
}


export const minLengthCreator = (minLength: number): ValidatorType => (value) => {
    if (value.length < minLength) return `Min legth is ${minLength} symbols`
    return undefined
}

