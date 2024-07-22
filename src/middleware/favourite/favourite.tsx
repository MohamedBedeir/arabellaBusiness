import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client } from '../../network/apiClient';
import { setAllPropertiesData, setExclusivePropertiesData, setPropertyDetailsData, setSearchPropertiesData } from '../../redux/store/properties/properties';
import { setFavouritesRequestData, setFavouritesRequestLoader, setFavouritesPropertyData, setFavouritesPropertyLoader } from '../../redux/store/favourites/favourites';
import { setAllRequestsData } from '../../redux/store/requests/requeste';

interface Favourites {
    property_id: number,
    allPropertiesData?: any;
    exclusivePropertiesData?: any;
    searchPropertiesData?: any;
    item: any;
};

export const getFavouritesProperty = createAsyncThunk(
    'REPORT_REASONS',
    async (args: any, thunkApi) => {
        thunkApi.dispatch(setFavouritesPropertyLoader(true));
        try {
            const response: any = await client.get(endpoints.getfavouritesProperty);
            console.log('response---getFavourites-----', response);
            thunkApi.dispatch(setFavouritesPropertyData(response.data.data));
            thunkApi.dispatch(setFavouritesPropertyLoader(false));
        } catch (err) {
            thunkApi.dispatch(setFavouritesPropertyLoader(false));
            console.log(err);
        }
    },
);

export const createFavouritesProperty = createAsyncThunk(
    'CREATE_Favourites',
    async (args: Favourites, thunkApi) => {
        console.log('args---createFavourites-----', args);
        thunkApi.dispatch(setFavouritesPropertyLoader(true));
        try {
            const response: any = await client.post(endpoints.createfavourites, {model_id: args.property_id, model_type: 'properties'});
            console.log('response---createFavourites-----', response);
            if (response.status == 200) {
                thunkApi.dispatch(getFavouritesProperty({}));
                const newAll = args.allPropertiesData.map((obj: any) =>
                    obj.id === args.property_id ? { ...obj, is_favourite: true } : obj
                );
                thunkApi.dispatch(setAllPropertiesData(newAll));
                const newExclusive = args.exclusivePropertiesData.map((obj: any) =>
                    obj.id === args.property_id ? { ...obj, is_favourite: true } : obj
                );
                thunkApi.dispatch(setExclusivePropertiesData(newExclusive));
                const newSearch = args.searchPropertiesData.map((obj: any) =>
                    obj.id === args.property_id ? { ...obj, is_favourite: true } : obj
                );
                thunkApi.dispatch(setSearchPropertiesData(newSearch));
                thunkApi.dispatch(setPropertyDetailsData({ ...args.item, is_favourite: true }));
            };
            thunkApi.dispatch(setFavouritesPropertyLoader(false));
        } catch (err) {
            thunkApi.dispatch(setFavouritesPropertyLoader(false));
            console.log('err--createFavourites-', err);
        }
    },
);

export const deleteFavouritesProperty = createAsyncThunk(
    'DELETE_Favourites',
    async (args: Favourites, thunkApi) => {
        console.log('args---deleteFavourites-----', args);
        thunkApi.dispatch(setFavouritesPropertyLoader(true));
        try {
            const response: any = await client.delete(endpoints.deletefavourites, {model_id: args.property_id, model_type: 'properties'});
            console.log('response---deleteFavourites-----', response);
            if (response.status == 200) {
                thunkApi.dispatch(getFavouritesProperty({}));
                const newAll = args.allPropertiesData.map((obj: any) =>
                    obj.id === args.property_id ? { ...obj, is_favourite: false } : obj
                );
                thunkApi.dispatch(setAllPropertiesData(newAll));
                const newExclusive = args.exclusivePropertiesData.map((obj: any) =>
                    obj.id === args.property_id ? { ...obj, is_favourite: false } : obj
                );
                thunkApi.dispatch(setExclusivePropertiesData(newExclusive));
                const newSearch = args.searchPropertiesData.map((obj: any) =>
                    obj.id === args.property_id ? { ...obj, is_favourite: false } : obj
                );
                thunkApi.dispatch(setSearchPropertiesData(newSearch));
                thunkApi.dispatch(setPropertyDetailsData({ ...args.item, is_favourite: false }));
            };
            thunkApi.dispatch(setFavouritesPropertyLoader(false));
        } catch (err) {
            thunkApi.dispatch(setFavouritesPropertyLoader(false));
            console.log('err--deleteFavourites-', err);
        }
    },
);


export const getFavouritesRequest = createAsyncThunk(
    'REPORT_REASONS',
    async (args: any, thunkApi) => {
        thunkApi.dispatch(setFavouritesRequestLoader(true));
        try {
            const response: any = await client.get(endpoints.getfavouritesRequest);
            console.log('response---getFavourites-----', response);
            thunkApi.dispatch(setFavouritesRequestData(response.data.data));
            thunkApi.dispatch(setFavouritesRequestLoader(false));
        } catch (err) {
            thunkApi.dispatch(setFavouritesRequestLoader(false));
            console.log(err);
        }
    },
);

export const createFavouritesRequest = createAsyncThunk(
    'CREATE_Favourites',
    async (args: Favourites, thunkApi) => {
        console.log('args---createFavourites-----', args);
        thunkApi.dispatch(setFavouritesRequestLoader(true));
        try {
            const response: any = await client.post(endpoints.createfavourites, {model_id: args.property_id, model_type: 'properties_requests'});
            console.log('response---createFavourites-----', response);
            if (response.status == 200) {
                thunkApi.dispatch(getFavouritesRequest({}));
                const newAll = args.allPropertiesData.map((obj: any) =>
                    obj.id === args.property_id ? { ...obj, is_favourite: true } : obj
                );
                thunkApi.dispatch(setAllRequestsData(newAll));
                // const newExclusive = args.exclusivePropertiesData.map((obj: any) =>
                //     obj.id === args.property_id ? { ...obj, is_favourite: true } : obj
                // );
                // thunkApi.dispatch(setExclusivePropertiesData(newExclusive));
                // const newSearch = args.searchPropertiesData.map((obj: any) =>
                //     obj.id === args.property_id ? { ...obj, is_favourite: true } : obj
                // );
                // thunkApi.dispatch(setSearchPropertiesData(newSearch));
                // thunkApi.dispatch(setPropertyDetailsData({ ...args.item, is_favourite: true }));
            };
            thunkApi.dispatch(setFavouritesRequestLoader(false));
        } catch (err) {
            thunkApi.dispatch(setFavouritesRequestLoader(false));
            console.log('err--createFavourites-', err);
        }
    },
);

export const deleteFavouritesRequest = createAsyncThunk(
    'DELETE_Favourites',
    async (args: Favourites, thunkApi) => {
        console.log('args---deleteFavourites-----', args);
        thunkApi.dispatch(setFavouritesRequestLoader(true));
        try {
            const response: any = await client.delete(endpoints.deletefavourites, {model_id: args.property_id, model_type: 'properties_requests'});
            console.log('response---deleteFavourites-----', response);
            if (response.status == 200) {
                thunkApi.dispatch(getFavouritesRequest({}));
                const newAll = args.allPropertiesData.map((obj: any) =>
                    obj.id === args.property_id ? { ...obj, is_favourite: false } : obj
                );
                thunkApi.dispatch(setAllRequestsData(newAll));
                // const newExclusive = args.exclusivePropertiesData.map((obj: any) =>
                //     obj.id === args.property_id ? { ...obj, is_favourite: false } : obj
                // );
                // thunkApi.dispatch(setExclusivePropertiesData(newExclusive));
                // const newSearch = args.searchPropertiesData.map((obj: any) =>
                //     obj.id === args.property_id ? { ...obj, is_favourite: false } : obj
                // );
                // thunkApi.dispatch(setSearchPropertiesData(newSearch));
                // thunkApi.dispatch(setPropertyDetailsData({ ...args.item, is_favourite: false }));
            };
            thunkApi.dispatch(setFavouritesRequestLoader(false));
        } catch (err) {
            thunkApi.dispatch(setFavouritesRequestLoader(false));
            console.log('err--deleteFavourites-', err);
        }
    },
);