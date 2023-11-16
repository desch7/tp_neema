import clsx from "clsx";
import React from "react";

interface optionsProps {
    label: string,
    value: string,
}

interface SelectProps {
    label: string,
    id: string,
    optionsList: optionsProps[],
    required?: boolean,
    register: any,
    errors: any,
    onChangeSelect?: any,

}

const Select:React.FC<SelectProps> = ({
    label,
    id,
    optionsList,
    required,
    register,
    errors,
    onChangeSelect,
}) => {
    // const onChangeSelect = (e) => {
    //     console.log('Change');
    //     console.log(e.target.value)
    // }
    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor={id}>{label}<span className="text-red-500">{required? '*' : ''}</span></label>
            {required? <>
                <select id={id} {...register(id, {required : 'This is required'})} 
                  onChange={(e) => onChangeSelect(e)}
            className={clsx(`
                form-input
                block
                w-full
                mb-3
                h-9
                rounded-md
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
                sm:leading-6`
            )}
            >
                {optionsList.map((option)=>{
                    return <option value={option.value}>{option.label}</option>
                })}
            </select>
            {errors[id] && <p className="text-red-500">{errors[id]?.message}</p>}
            </> : <>
            <select id={id} {...register(id)} 
                 onChange={(e) => onChangeSelect(e)}
                 className={clsx(`
                     form-input
                     block
                     w-full
                     mb-3
                     h-9
                     rounded-md
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
                     sm:leading-6`
                 )}
                 >
                     {optionsList.map((option)=>{
                         return <option value={option.value}>{option.label}</option>
                     })}
                 </select>
            </>}
            
        </div>
    )
}

export default Select;