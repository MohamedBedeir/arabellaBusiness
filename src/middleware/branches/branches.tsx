import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client, clientFormData } from '../../network/apiClient';
import { setBranchData, setBranchData_More, setBrancheAddState, setBrancheDeleteState, setBrancheEditState, setBranchesCount, setBranchesLoader } from '../../redux/store/branches/branchesSlice';

interface BrancheAdd {
    data: any,
    image: any,
};
interface BrancheEdit {
    id: number,
    data: any,
};
interface BrancheDelete {
    id: number,
};
interface BrancheData {
    page: number,
};

export const branch_add = createAsyncThunk(
    'SLOT_ADD',
    async (args: BrancheAdd, thunkApi) => {
        thunkApi.dispatch(setBrancheAddState(''));
        thunkApi.dispatch(setBranchesLoader(true));
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
                const response2: any = await client.post(endpoints.brancheAction, data);
                if (response2.status == 200 || response.status == 201) {
                    thunkApi.dispatch(setBrancheAddState('done'));
                    thunkApi.dispatch(setBranchesLoader(false));
                    thunkApi.dispatch(branches_data({page: 1}))
                } else {
                    thunkApi.dispatch(setBrancheAddState('error'));
                    thunkApi.dispatch(setBranchesLoader(false));
                }
            } else {
                thunkApi.dispatch(setBrancheAddState('error'));
                thunkApi.dispatch(setBranchesLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setBrancheAddState('error'));
            thunkApi.dispatch(setBranchesLoader(false));
        }
    },
);

export const branch_edit = createAsyncThunk(
    'SLOT_ADD',
    async (args: BrancheEdit, thunkApi) => {
        thunkApi.dispatch(setBrancheEditState(''));
        thunkApi.dispatch(setBranchesLoader(true));
        try {
            const response: any = await client.patch(`${endpoints.brancheAction}/${args.id}`, args.data);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setBrancheEditState('done'));
                thunkApi.dispatch(setBranchesLoader(false));
            } else {
                thunkApi.dispatch(setBrancheEditState('error'));
                thunkApi.dispatch(setBranchesLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setBrancheEditState('error'));
            thunkApi.dispatch(setBranchesLoader(false));
        }
    },
);

export const branch_delete = createAsyncThunk(
    'SLOT_DELETE',
    async (args: BrancheDelete, thunkApi) => {
        thunkApi.dispatch(setBrancheDeleteState(''));
        thunkApi.dispatch(setBranchesLoader(true));
        try {
            const response: any = await client.delete(`${endpoints.brancheAction}/${args.id}`);
            console.log('response------slot_delete-------', response);
            if (response.status == 200 || response.status == 201) {
                // thunkApi.dispatch(setslotDeleteState('done'));
                thunkApi.dispatch(branches_data({page: 1}));
                thunkApi.dispatch(branches_data({page: 1}))
            } else {
                // thunkApi.dispatch(setslotDeleteState('error'));
                thunkApi.dispatch(setBranchesLoader(false));
            }
        } catch (err) {
            // thunkApi.dispatch(setslotDeleteState('error'));
            thunkApi.dispatch(setBranchesLoader(false));
        }
    },
);

export const branches_data = createAsyncThunk(
    'SLOT_DATA',
    async (args: BrancheData, thunkApi) => {
        thunkApi.dispatch(setBranchesLoader(true));
        try {
            const response: any = await client.get(`${endpoints.brancheAction}?orderBy=DESC&page=${args.page}&take=10`);
            thunkApi.dispatch(setBranchesCount(response.data.metadata.pagination.itemCount))
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setBranchesLoader(false));
                if (args.page == 1) {
                    thunkApi.dispatch(setBranchData(response.data.data));
                } else {
                    thunkApi.dispatch(setBranchData_More(response.data.data));
                }
            } else {
                thunkApi.dispatch(setBranchesLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setBranchesLoader(false));
        };
    },
);

