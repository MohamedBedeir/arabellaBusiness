import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client, clientFormData } from '../../network/apiClient';
import { setEmployeesLoader, setEmployeeAddState, setEmployeeEditState, setEmployeeDeleteState, setEmployeesData, setEmployeesData_More, setEmployeeCount } from '../../redux/store/employees/employeesSlice';
interface EmployeeAdd {
    data: any,
};
interface EmployeeEdit {
    id: number,
    data: any,
    image: any,
};
interface EmployeeDelete {
    id: number,
};
interface EmployeeData {
    data?: any;
    page: number,
};

export const employee_add = createAsyncThunk(
    'EMPLOYEE_ADD',
    async (args: EmployeeAdd, thunkApi) => {
        thunkApi.dispatch(setEmployeeAddState(''));
        thunkApi.dispatch(setEmployeesLoader(true));
        try {
            const response: any = await client.post(endpoints.employeeAction, args.data);
            console.log('response--------employee_add----------', response);
             if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setEmployeeAddState('done'));
                thunkApi.dispatch(setEmployeesLoader(false));
                thunkApi.dispatch(employee_data({page: 1}));
            } else {
                thunkApi.dispatch(setEmployeeAddState('error'));
                thunkApi.dispatch(setEmployeesLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setEmployeeAddState('error'));
            thunkApi.dispatch(setEmployeesLoader(false));
        }
    },
);

export const employee_edit = createAsyncThunk(
    'EMPLOYEE_ADD',
    async (args: EmployeeEdit, thunkApi) => {
        thunkApi.dispatch(setEmployeeEditState(''));
        thunkApi.dispatch(setEmployeesLoader(true));
        try {
            console.log('args-------employee_edit---------', args);
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
                    const response2: any = await client.patch(`${endpoints.employeeAction}/${args.id}`, data);
                    if (response2.status == 200 || response.status == 201) {
                        thunkApi.dispatch(setEmployeeEditState('done'));
                        thunkApi.dispatch(setEmployeesLoader(false));
                        thunkApi.dispatch(employee_data({page: 1}));
                    } else {
                        thunkApi.dispatch(setEmployeeEditState('error'));
                        thunkApi.dispatch(setEmployeesLoader(false));
                    };
                } else {
                    thunkApi.dispatch(setEmployeeEditState('error'));
                    thunkApi.dispatch(setEmployeesLoader(false));
                }
            } else {
                const data = {...args.data};
                const response: any = await client.patch(`${endpoints.employeeAction}/${args.id}`, data);
                console.log('response-------edit---------', response);
                if (response.status == 200 || response.status == 201) {
                    thunkApi.dispatch(setEmployeeEditState('done'));
                    thunkApi.dispatch(setEmployeesLoader(false));
                    thunkApi.dispatch(employee_data({page: 1}));
                } else {
                    thunkApi.dispatch(setEmployeeEditState('error'));
                    thunkApi.dispatch(setEmployeesLoader(false));
                }
            };
        } catch (err) {
            thunkApi.dispatch(setEmployeeEditState('error'));
            thunkApi.dispatch(setEmployeesLoader(false));
        }
    },
);

export const employee_delete = createAsyncThunk(
    'EMPLOYEE_ADD',
    async (args: EmployeeDelete, thunkApi) => {
        thunkApi.dispatch(setEmployeeDeleteState(''));
        thunkApi.dispatch(setEmployeesLoader(true));
        try {
            const response: any = await client.delete(`${endpoints.employeeAction}/${args.id}`);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setEmployeeDeleteState('done'));
                thunkApi.dispatch(setEmployeesLoader(false));
                thunkApi.dispatch(employee_data({page: 1}));
            } else {
                thunkApi.dispatch(setEmployeeDeleteState('error'));
                thunkApi.dispatch(setEmployeesLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setEmployeeDeleteState('error'));
            thunkApi.dispatch(setEmployeesLoader(false));
        }
    },
);

export const employee_data = createAsyncThunk(
    'EMPLOYEE_ADD',
    async (args: EmployeeData, thunkApi) => {
        thunkApi.dispatch(setEmployeesLoader(true));
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
            const response: any = await client.get(`${endpoints.employeeAction}${fillter}`);
            thunkApi.dispatch(setEmployeeCount(response.data.metadata.pagination.itemCount))
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setEmployeesLoader(false));
                if (args.page == 1) {
                    thunkApi.dispatch(setEmployeesData(response.data.data));
                } else {
                    thunkApi.dispatch(setEmployeesData_More(response.data.data));
                }
            } else {
                thunkApi.dispatch(setEmployeesLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setEmployeesLoader(false));
        };
    },
);

