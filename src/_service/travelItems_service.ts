import TravelItems from "../models/TravelItems.ts";

export const findAllTravelItems = async (pageInfo? : any) => {
    type donnee = {
        data: TravelItems[],
        totalRowCount : number,
    }
    let allTravelItems: donnee = {
        data: [],
        totalRowCount: 0
    };
    let param = pageInfo? `?page=${pageInfo.page}&page-size=${pageInfo.pageSize}` : ''

     await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/travel-items${param}`)
        .then(res => res.json())
        .then(resp =>{
            allTravelItems.data = resp.data
            allTravelItems.totalRowCount = resp.totalRowCount
            console.log('allTravelItems => ',allTravelItems)
        })
        .catch(err => {
            console.log('error fetch all TravelItems=> ',err)
        })

    return allTravelItems;
}