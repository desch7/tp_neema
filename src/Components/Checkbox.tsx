import clsx from "clsx";
import React from "react";


interface CheckboxProps {
    label: string,
    id: string,
    type?: string,
    required?: boolean,
    register: any,
    errors: any

}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
 }) => {

    return(
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor={id}>{label}<span className="text-red-500">{required? '*' : ''}</span></label>
                {required? <>
                    <input type={type} id={id} {...register(id, {required: 'This is required'})} 
                
                className={clsx(`
                    form-input
                    block
                    mb-3
                    h-9
                    w-6`
                    )}
                />
                 {errors[id] && <p className="text-red-500">{errors[id]?.message}</p>} 
                </> : <>
                    <input type={type} id={id} {...register(id)} 

                    className={clsx(`
                        form-input
                        block
                        mb-3
                        h-9
                        w-6`
                        )}
                    />
                </>}
                
        </div>
    )
}

export default Checkbox;