export const CreationSelectionList = (infos : any) => {
    interface optionsSelect {
        label: string,
        value: number,
    }
    let options : optionsSelect[] = [{label: 'Choose a customer', value: -1}]

    if(infos.rows?.length === 0 || !infos.rows){
        options = [{label: 'Choose a customer', value: -1}]
    }else{
        options  = infos.rows?.map( row => {
            return { label: row[infos.label], value: row[infos.value]}
        })
    }
    

    return options;
}