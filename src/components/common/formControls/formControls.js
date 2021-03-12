import React from 'react'
import { Field } from 'redux-form'
import s from './../formControls/FormsControl.module.css'


const FormControl = ({ input, meta, child, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : " ")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}


export const TextArea = (props) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


export const createField = (placeholder, name, validate, component, props = {}, text = "") => (
    <div> <Field
        validate={validate}
        placeholder={placeholder}
        name={name}
        component={component}
        {...props}
    /> {text}
    </div>
)

// const Element = Element => ({ input, meta, ...props }) => {
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={s.formControl + " " + (hasError ? s.error : " ")}>
//             <Element {...input} {...props} />
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }