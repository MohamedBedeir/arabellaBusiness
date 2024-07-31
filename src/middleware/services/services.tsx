import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client, clientFormData } from '../../network/apiClient';
import { setServicesLoader, setServiceAddState, setServiceEditState, setServiceDeleteState, setServicesData, setServicesData_More, setServiceCount } from '../../redux/store/services/servicesSlice';

interface ServiceAdd {
    data: any,
    image: any,
};
interface ServiceEdit {
    id: number,
    data: any,
    image: any,
};
interface ServiceDelete {
    id: number,
};
interface ServiceData {
    data?: any;
    page: number,
};

export const service_add = createAsyncThunk(
    'SERVICE_ADD',
    async (args: ServiceAdd, thunkApi) => {
        thunkApi.dispatch(setServiceAddState(''));
        thunkApi.dispatch(setServicesLoader(true));
        try {
            const image = new FormData();
            image.append('file', {
                name: JSON.parse(args.image)[0].name,
                type: JSON.parse(args.image)[0].type,
                uri: JSON.parse(args.image)[0].uri,
            });
            const response: any = await clientFormData.post(endpoints.uploadFile, image);
            if (response.status == 200 || response.status == 201) {
                const data = {featuredImage: response.data.data.fileName, ...args.data};
                const response2: any = await client.post(endpoints.serviceAction, data);
                if (response2.status == 200 || response2.status == 201) {
                    console.log('response2.status------------', response2.status);
                    thunkApi.dispatch(setServiceAddState('done'));
                    thunkApi.dispatch(setServicesLoader(false));
                    thunkApi.dispatch(service_data({page: 1}));
                } else {
                    thunkApi.dispatch(setServiceAddState('error'));
                    thunkApi.dispatch(setServicesLoader(false));
                }
            } else {
                thunkApi.dispatch(setServiceAddState('error'));
                thunkApi.dispatch(setServicesLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setServiceAddState('error'));
            thunkApi.dispatch(setServicesLoader(false));
        }
    },
);

export const service_edit = createAsyncThunk(
    'SERVICE_ADD',
    async (args: ServiceEdit, thunkApi) => {
        thunkApi.dispatch(setServiceEditState(''));
        thunkApi.dispatch(setServicesLoader(true));
        try {
            console.log('args-------service_edit---------', args);
            if (args.image != '') {
                const image = new FormData();
                image.append('file', {
                    name: JSON.parse(args.image)[0].name,
                    type: JSON.parse(args.image)[0].type,
                    uri: JSON.parse(args.image)[0].uri,
                });
                const response: any = await clientFormData.post(endpoints.uploadFile, image);
                if (response.status == 200 || response.status == 201) {
                    const data = {featuredImage: response.data.data.fileName, ...args.data};
                    const response2: any = await client.patch(`${endpoints.serviceAction}/${args.id}`, data);
                    if (response2.status == 200 || response.status == 201) {
                        thunkApi.dispatch(setServiceEditState('done'));
                        thunkApi.dispatch(setServicesLoader(false));
                        thunkApi.dispatch(service_data({page: 1}));
                    } else {
                        thunkApi.dispatch(setServiceEditState('error'));
                        thunkApi.dispatch(setServicesLoader(false));
                    };
                } else {
                    thunkApi.dispatch(setServiceEditState('error'));
                    thunkApi.dispatch(setServicesLoader(false));
                }
            } else {
                const data = {...args.data};
                const response: any = await client.patch(`${endpoints.serviceAction}/${args.id}`, data);
                console.log('response-------edit---------', response);
                if (response.status == 200 || response.status == 201) {
                    thunkApi.dispatch(setServiceEditState('done'));
                    thunkApi.dispatch(setServicesLoader(false));
                    thunkApi.dispatch(service_data({page: 1}));
                } else {
                    thunkApi.dispatch(setServiceEditState('error'));
                    thunkApi.dispatch(setServicesLoader(false));
                }
            };
        } catch (err) {
            thunkApi.dispatch(setServiceEditState('error'));
            thunkApi.dispatch(setServicesLoader(false));
        }
    },
);

export const service_delete = createAsyncThunk(
    'SERVICE_ADD',
    async (args: ServiceDelete, thunkApi) => {
        thunkApi.dispatch(setServiceDeleteState(''));
        thunkApi.dispatch(setServicesLoader(true));
        try {
            const response: any = await client.delete(`${endpoints.serviceAction}/${args.id}`);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setServiceDeleteState('done'));
                thunkApi.dispatch(setServicesLoader(false));
                thunkApi.dispatch(service_data({page: 1}));
            } else {
                thunkApi.dispatch(setServiceDeleteState('error'));
                thunkApi.dispatch(setServicesLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setServiceDeleteState('error'));
            thunkApi.dispatch(setServicesLoader(false));
        }
    },
);

export const service_data = createAsyncThunk(
    'SERVICE_ADD',
    async (args: ServiceData, thunkApi) => {
        thunkApi.dispatch(setServicesLoader(true));
        try {
            console.log('args.data--------------', args?.data);
            
            var fillter: string = `?orderBy=DESC&page=${args.page}&take=10`;
            fillter = args?.data?.name ? `${fillter}&filter[name][search]=${args.data.name}` : fillter;
            fillter = args?.data?.nameEn ? `${fillter}&filter[nameEn][search]=${args.data.nameEn}` : fillter;
            fillter = args?.data?.price ? `${fillter}&filter[price][eq]=${args.data.price}` : fillter;
            fillter = args?.data?.estimatedTime ? `${fillter}&filter[estimatedTime][eq]=${args.data.estimatedTime}` : fillter;
            fillter = args?.data?.categoryId ? `${fillter}&filter[categoryId][eq]=${args.data.categoryId}` : fillter;
            // fillter =  `${fillter}&isActive=${args.data.isActive}`;
            console.log('fillter--------------', fillter);
            const response: any = await client.get(`${endpoints.serviceAction}${fillter}`);
            thunkApi.dispatch(setServiceCount(response.data.metadata.pagination.itemCount))
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setServicesLoader(false));
                if (args.page == 1) {
                    thunkApi.dispatch(setServicesData(response.data.data));
                } else {
                    thunkApi.dispatch(setServicesData_More(response.data.data));
                }
            } else {
                thunkApi.dispatch(setServicesLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setServicesLoader(false));
        };
    },
);

