import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client, clientFormData } from '../../network/apiClient';
import { setProfileData, setProfileLoader, setProfileUpdateState } from '../../redux/store/profile/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileUpdate {
    data: any,
};
interface ProfileData {
    id: number,
};

export const profile_updateUser = createAsyncThunk(
    'PROFILE_UPDATE',
    async (args: ProfileUpdate, thunkApi) => {
        thunkApi.dispatch(setProfileUpdateState(''));
        thunkApi.dispatch(setProfileLoader(true));
        console.log('args------profile_updateUser------', args);
        try {
            const data = {
                name: args?.data?.name,
                email: args?.data?.email,
            };
            const response: any = await client.patch(endpoints.profiles, data);
            console.log('response------profile_updateUser------', response);
            if (response.status == 200 || response.status == 201) {
                console.log('response------profile_updateUser------>>>>>>>>>>>>>>>>>>>000');
                if (args?.data?.image && JSON.parse(args?.data?.image)[0].name) {
                    console.log('response------profile_updateUser------>>>>>>>>>>>>>>>>>>>111');
                    thunkApi.dispatch(profile_updateProfider(args));
                } else {
                    thunkApi.dispatch(profile_data({id: args.data.user_id}));
                    console.log('response------profile_updateUser------>>>>>>>>>>>>>>>>>>>222');
                    thunkApi.dispatch(setProfileUpdateState('done'));
                    thunkApi.dispatch(setProfileLoader(false));
                }
            } else {
                console.log('response------profile_updateUser------>>>>>>>>>>>>>>>>>>>333');
                thunkApi.dispatch(setProfileUpdateState('error'));
                thunkApi.dispatch(setProfileLoader(false));
            }
        } catch (err) {
            console.log('response------profile_updateUser------>>>>>>>>>>>>>>>>>>>444');
            thunkApi.dispatch(setProfileUpdateState('error'));
            thunkApi.dispatch(setProfileLoader(false));
        }
    },
);

export const profile_updateProfider = createAsyncThunk(
    'PROFILE_UPDATE',
    async (args: ProfileUpdate, thunkApi) => {
        thunkApi.dispatch(setProfileUpdateState(''));
        thunkApi.dispatch(setProfileLoader(true));
        try {
            const image = new FormData();
            image.append('file', {
                name: JSON.parse(args?.data?.image)[0].name,
                type: JSON.parse(args?.data?.image)[0].type,
                uri: JSON.parse(args?.data?.image)[0].uri,
            });
            const response: any = await clientFormData.post(endpoints.uploadFile, image);
            if (response.status == 200 || response.status == 201) {
                const data = {
                    featuredImage: response.data.data.fileName,
                    name: args?.data?.profiderName,
                    nameEn: args?.data?.profiderNameEn,
                };
                const response2: any = await client.patch(`${endpoints.service_providers}/${args?.data?.profider_id}/profile`, data);
                console.log('response2------profile_updateProfider----------', response2);
                if (response2.status == 200 || response.status == 201) {
                    thunkApi.dispatch(profile_data({id: args.data.user_id}));
                    thunkApi.dispatch(setProfileUpdateState('done'));
                    thunkApi.dispatch(setProfileLoader(false));
                } else {
                    thunkApi.dispatch(setProfileUpdateState('error'));
                    thunkApi.dispatch(setProfileLoader(false));
                }
            } else {
                thunkApi.dispatch(setProfileUpdateState('error'));
                thunkApi.dispatch(setProfileLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setProfileUpdateState('error'));
            thunkApi.dispatch(setProfileLoader(false));
        }
    },
);



export const profile_data = createAsyncThunk(
    'PROFILE_DATA',
    async (args: ProfileData, thunkApi) => {
        thunkApi.dispatch(setProfileLoader(true));
        try {
            const response: any = await client.get(endpoints.profiles);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setProfileLoader(false));
                await AsyncStorage.setItem('user', JSON.stringify(response.data.data));
                thunkApi.dispatch(setProfileData(JSON.stringify(response.data.data)));
            } else {
                thunkApi.dispatch(setProfileLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setProfileLoader(false));
        };
    },
);

