import { createAsyncThunk } from "@reduxjs/toolkit";
import TravelItems from "../models/TravelItems.ts";

type pageInfoType = {
    page: number,
    pageSize : number,
}
type donnee = {
        data: TravelItems[],
        totalRowCount : number,
    }

export const FIND_ALLTRAVELITEMS = 'FIND_ALLTRAVELITEMS'

export const findAllTravelItems = createAsyncThunk(FIND_ALLTRAVELITEMS, async (pageInfo?: pageInfoType) =>
    {
    
        let allTravelItems: donnee = {
            data: [],
            totalRowCount: 0
        };
        let param = pageInfo? `?page=${pageInfo.page}&page-size=${pageInfo.pageSize}` : ''
        try {
            const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/travel-items${param}`)
            const response = await result.json()
            allTravelItems.data = response.data
            allTravelItems.totalRowCount = response.totalRowCount
            console.log('allTravelItems in action file=> ', allTravelItems)
            return allTravelItems
        } catch (error) {
            console.log('error in allTravelItems .then find all travel items=> ', error);
                return error.message;
        }
    }
)