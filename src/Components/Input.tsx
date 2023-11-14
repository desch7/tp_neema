import clsx from "clsx";
import React from "react";


interface InputProps {
    label: string,
    id: string,
    type?: string,
    placeholder?: string,
    required?: boolean,
    register: any,
    errors: any,

}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    placeholder,
    required,
    register,
    errors,
 }) => {

    return(
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor={id}>{label}<span className="text-red-500">{required? '*' : ''}</span></label>
            {required? <>
                <input type={type} id={id} placeholder={placeholder} 
                    {...register(id, {required: "This is required"})} 
                className={clsx(`
                    form-input
                    block
                    w-full
                    mb-3
                    rounded-md
                    px-1
                    border-0
                    py-1.5
                    text-gray-900
                    shadow-sm
                    ring-1
                    ring-inset
                    ring-gray-300
                    placeholder:text-gray-400
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-sky-600
                    sm:text-sm
                    sm:leading-6`,
                    //errors[id] && 'focus:ring-red-500',
                    )}
                /> 
                {errors[id] && <p className="text-red-500">{errors[id]?.message}</p>}
            </> : <>
            <input type={type} id={id} placeholder={placeholder} 
                    {...register(id)} 
                className={clsx(`
                    form-input
                    block
                    w-full
                    mb-3
                    rounded-md
                    px-1
                    border-0
                    py-1.5
                    text-gray-900
                    shadow-sm
                    ring-1
                    ring-inset
                    ring-gray-300
                    placeholder:text-gray-400
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-sky-600
                    sm:text-sm
                    sm:leading-6`,
                    //errors[id] && 'focus:ring-rose-500',
                    )}
                /> 
            </>}
                
        </div>
    )
}

export default Input;