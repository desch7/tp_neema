export const CreationSelectionList = (infos : any) => {
    interface optionsSelect {
        label: string,
        value: string,
    }
    let options : optionsSelect[] = [{label: 'Choose a customer', value: ''}]

    if(infos.rows?.length === 0 || !infos.rows){
        options = [{label: 'Nothing', value: 'Nothing'}, {label: 'Nothing2', value: 'Nothing2'}]
    }else{
        options  = infos.rows?.map( row => {
            return { label: row[infos.label], value: row[infos.value]}
        })
    }
    

    return options;
}