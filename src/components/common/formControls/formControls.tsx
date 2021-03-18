import { ValidatorType } from '../../../utils/validators/validarot';
import React from 'react'
import { Field, WrappedFieldProps } from 'redux-form'
import {WrappedFieldMetaProps} from 'redux-form/lib/Field' 
import s from './../formControls/FormsControl.module.css'

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlsPropsType> = ({meta: {touched, error}, children }) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : " ")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


export function createField<FormKeysType extends string> (placeholder: string | undefined, 
                            name: FormKeysType, 
                            validate: Array<ValidatorType>, 
                            component: React.FC<WrappedFieldProps>, 
                            props = {}, text = "") {
                             return <div>
                                    <Field validate={validate}
                                        placeholder={placeholder}
                                        name={name}
                                        component={component}
                                        {...props}
                                    /> {text}
                                    </div>
                            }

// const Element = Element => ({ input, meta, ...props }) => {
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={s.formControl + " " + (hasError ? s.error : " ")}>
//             <Element {...input} {...props} />
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }