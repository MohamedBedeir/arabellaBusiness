import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client } from '../../network/apiClient';
import { setslotsLoader, setslotAddState, setslotEditState, setslotDeleteState, setslotsData, setslotsData_More, setslotCount } from '../../redux/store/slots/slotsSlice';

interface slotAdd {
    data: any,
};
interface slotEdit {
    id: number,
    data: any,
};
interface slotDelete {
    id: number,
};
interface slotData {
    page: number,
};

export const slot_add = createAsyncThunk(
    'SLOT_ADD',
    async (args: slotAdd, thunkApi) => {
        thunkApi.dispatch(setslotAddState(''));
        thunkApi.dispatch(setslotsLoader(true));
        try {
            const response: any = await client.post(endpoints.slotAction, args.data);
            console.log('response----slot_add------', response);
            
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setslotAddState('done'));
                thunkApi.dispatch(setslotsLoader(false));
            } else {
                thunkApi.dispatch(setslotAddState('error'));
                thunkApi.dispatch(setslotsLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setslotAddState('error'));
            thunkApi.dispatch(setslotsLoader(false));
        }
    },
);

export const slot_edit = createAsyncThunk(
    'SLOT_ADD',
    async (args: slotEdit, thunkApi) => {
        thunkApi.dispatch(setslotEditState(''));
        thunkApi.dispatch(setslotsLoader(true));
        try {
            const response: any = await client.patch(`${endpoints.slotAction}/${args.id}`, args.data);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setslotEditState('done'));
                thunkApi.dispatch(setslotsLoader(false));
            } else {
                thunkApi.dispatch(setslotEditState('error'));
                thunkApi.dispatch(setslotsLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setslotEditState('error'));
            thunkApi.dispatch(setslotsLoader(false));
        }
    },
);

export const slot_delete = createAsyncThunk(
    'SLOT_DELETE',
    async (args: slotDelete, thunkApi) => {
        thunkApi.dispatch(setslotDeleteState(''));
        thunkApi.dispatch(setslotsLoader(true));
        try {
            const response: any = await client.delete(`${endpoints.slotAction}/${args.id}`);
            console.log('response------slot_delete-------', response);
            if (response.status == 200 || response.status == 201) {
                // thunkApi.dispatch(setslotDeleteState('done'));
                thunkApi.dispatch(slots_data({page: 1}));
            } else {
                // thunkApi.dispatch(setslotDeleteState('error'));
                thunkApi.dispatch(setslotsLoader(false));
            }
        } catch (err) {
            // thunkApi.dispatch(setslotDeleteState('error'));
            thunkApi.dispatch(setslotsLoader(false));
        }
    },
);

export const slots_data = createAsyncThunk(
    'SLOT_DATA',
    async (args: slotData, thunkApi) => {
        thunkApi.dispatch(setslotsLoader(true));
        try {
            const response: any = await client.get(`${endpoints.slotAction}?orderBy=DESC&page=${args.page}&take=10`);
            thunkApi.dispatch(setslotCount(response.data.metadata.pagination.itemCount))
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setslotsLoader(false));
                if (args.page == 1) {
                    thunkApi.dispatch(setslotsData(response.data.data));
                } else {
                    thunkApi.dispatch(setslotsData_More(response.data.data));
                }
            } else {
                thunkApi.dispatch(setslotsLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setslotsLoader(false));
        };
    },
);

