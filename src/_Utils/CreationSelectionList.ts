export const CreationSelectionList = (infos : any) => {
    interface optionsSelect {
        label: string,
        value: number,
    }
    let options : optionsSelect[] = []
    if(infos.rows?.length === 0 || !infos.rows){
        options = [{label: 'Choose a customer', value: -1}, {label: 'Choose a customer 2', value: -2}]
    }else{
        options  = infos.rows?.map( row => {
            return { label: row[infos.label], value: row[infos.value]}
        })
        options.unshift({ label: 'Choose a customer', value: -1 })
        console.log('options customer =>',options);
        
    }
    

    return options;
}