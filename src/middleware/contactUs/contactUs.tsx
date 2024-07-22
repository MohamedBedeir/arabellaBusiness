import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client } from '../../network/apiClient';
import { setContactUsLoader, setContactUsState } from '../../redux/store/contactUs/contactUs';

interface CreateContactUs {
    name: number,
    phone: number,
    email: string,
    content: string,
};

export const createContactUs = createAsyncThunk(
    'CREATE_REPORT',
    async (args: CreateContactUs, thunkApi) => {
        console.log('args---createContactUs-----', args);
        thunkApi.dispatch(setContactUsState(''));
        thunkApi.dispatch(setContactUsLoader(true));
        try {
            const data = {
                name: args.name,
                phone: args.phone,
                email: args.email,
                content: args.content,
            };
            const response: any = await client.post(endpoints.contactUs, data);
            thunkApi.dispatch(setContactUsLoader(false));
            thunkApi.dispatch(setContactUsState('done'));
            
        } catch (err) {
            thunkApi.dispatch(setContactUsState('error'));
            console.log('err--createContactUs-', err);
        }
    },
);