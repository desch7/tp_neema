import React from "react"
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PaymentIcon from '@mui/icons-material/PaymentOutlined';

interface TableProps {
    content: any,
    credit: any,
    headers: any,
    checkedAll: any,
    singleOnChange: any,
    toggleAll: any,
    actions: any,
    edit?: any,
    imputation?: any,
    loading?: any,
}

const DatasTable = (
    {
        content,
        credit,
        headers,
        checkedAll,
        singleOnChange,
        toggleAll,
        actions,
        edit,
        imputation,
        loading,
    }: TableProps) => {


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    return (

        <div className="sm:px-2 lg:px-4 lg:h-[25rem]">
            <div className="-mx-4 mt-2 ring-1 h-full ring-gray-300 sm:mx-0 sm:rounded-lg my-2 overflow-scroll">
                <table className="min-w-full divide-y divide-gray-300 -mb-40 overflow-auto">
                    <thead className=" z-10 top-0 sticky bg-slate-100 ">
                        <tr>
                            <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                <input
                                    type="checkbox"
                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-600"
                                    //ref={checkboxAll}
                                    checked={checkedAll}
                                    onChange={toggleAll}
                                />
                            </th>
                            {headers?.map((head) => (
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                                    {head?.label}
                                </th>
                            ))}
                            {actions ? (
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                                    Actions
                                </th>
                            ) : (<div className="bg-slate-100"></div>)}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ?
                            (<div className="flex justify-center">Loading...</div>) :
                            content?.map((plan, planIdx) => (
                                <tr className="" key={plan.id}>
                                    <td className="relative px-7 sm:w-12 sm:px-6">
                                        <input
                                            type="checkbox"
                                            className="absolute py-1.5 left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-600"
                                            //value={singleCheckValue}
                                            //checked={singleCheck}
                                            onChange={e => singleOnChange(plan.id)}
                                        />
                                        {planIdx !== 0 ? <div className="absolute -top-px left-0 right-0 h-px bg-gray-200" /> : null}
                                    </td>
                                    {headers?.map((head) => (
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200 text-center',
                                                'hidden px-3 py-1.5 text-sm text-gray-500 lg:table-cell text-center'
                                            )}
                                        >

                                            {plan?.[head.value]}

                                            {planIdx !== 0 ? <div className="absolute -top-px  right-0 h-px bg-gray-200" /> : null}
                                        </td>
                                    ))}

                                    <td
                                        className={classNames(
                                            planIdx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-1.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                                        )}
                                    >
                                        <div className="flex justify-center text-center">
                                            {actions ? (<button
                                                type="button"
                                                className="font-light hover:bg-slate-200 rounded-full "
                                                onClick={edit(plan.id)}
                                            >
                                                <EditIcon />
                                            </button>) : ''}
                                            {credit ? (<button
                                                type="button"
                                                className="font-light hover:bg-slate-200 rounded-full "
                                                onClick={imputation(plan.id)}
                                            >
                                                <PaymentIcon />
                                            </button>) : ''}
                                            {actions ? (<button
                                                type="button"
                                                className="font-light hover:bg-slate-200 rounded-full"
                                            >
                                                <DeleteIcon />
                                            </button>) : ''}
                                        </div>

                                        {planIdx !== 0 ? <div className="absolute -top-px left-0 right-0 h-px bg-gray-200" /> : null}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>)
}

export default DatasTable