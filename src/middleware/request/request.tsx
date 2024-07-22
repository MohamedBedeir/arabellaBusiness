
import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client, clientFormData} from '../../network/apiClient';
import { setAddRequestLoader, setAddRequestState, setAllRequestsData, setAllRequestsLoader, setAllRequestsLoadmore, setAllRequestsTotal, setMyRequestsData, setMyRequestsLoader, setMyRequestsTotal, setRequestDetailsData, setRequestDetailsLoader } from '../../redux/store/requests/requeste';
import { userData } from '../profile/profile';

interface CreateRequest {
  data: any;
};

interface EditRequest {
  id: number;
  data: any;
  navigation: any;
};

interface RemoveImage {
  deletedImages: any;
  property_id: number;
};

interface UploadImage {
  imagesCount: number;
  imageIndex: number;
  property_id: number;
  image?: any;
};

export const createRequest = createAsyncThunk(
  'CREATE_REQUEST',
  async (args: CreateRequest, thunkApi) => {
    try {
      thunkApi.dispatch(setAddRequestLoader(true));
      thunkApi.dispatch(setAddRequestState(''));
      const response: any = await clientFormData.post(`${endpoints.requests}/create`, args.data);
      console.log('response-----createRequest---------', response);
      thunkApi.dispatch(setAddRequestLoader(false));
      if (response.status == 200) {
        thunkApi.dispatch(setAddRequestState('done'));
        thunkApi.dispatch(myRequests({}));
        thunkApi.dispatch(userData({}));
      }
    } catch (err) {
      thunkApi.dispatch(setAddRequestLoader(false));
      thunkApi.dispatch(setAddRequestState('error'));
      console.log('err---', err);
    }
  },
);

export const editRequest = createAsyncThunk(
  'EDIT_REQUEST',
  async (args: EditRequest, thunkApi) => {
    try {
      thunkApi.dispatch(setAddRequestLoader(true));
      thunkApi.dispatch(setAddRequestState(''));
      const response: any = await clientFormData.post(`${endpoints.requests}/edit/${args.id}`, args.data);
      console.log('response-----editRequest---------', response);
      thunkApi.dispatch(setAddRequestLoader(false));
      thunkApi.dispatch(setAddRequestState('done'));
      args.navigation.goBack();
      thunkApi.dispatch(myRequests({}));
      thunkApi.dispatch(getRequestDetails({id: args.id}));
      thunkApi.dispatch(userData({}));
    } catch (err) {
      thunkApi.dispatch(setAddRequestLoader(false));
      thunkApi.dispatch(setAddRequestState('error'));
      console.log('err-editProperty--', err);
    }
  },
);

export const deleteRequest = createAsyncThunk(
  'DELETE_REQUEST',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setRequestDetailsLoader(true));
    try {
      const response: any = await client.delete(`${endpoints.requests}/${args.id}`);
      console.log('response-----deleteRequest---------', response);
      args.navigation.goBack();
      thunkApi.dispatch(myRequests({}));
      thunkApi.dispatch(setRequestDetailsLoader(false));
    } catch (err) {
      thunkApi.dispatch(setRequestDetailsLoader(false));
      console.log(err);
    }
  },
);

export const myRequests = createAsyncThunk(
  'MY_REQUESTS',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setMyRequestsLoader(true));
    try {
      const response: any = await client.get(endpoints.requests);
      console.log('response---myRequests---------', response);
      thunkApi.dispatch(setMyRequestsData(response.data.data));
      thunkApi.dispatch(setMyRequestsTotal(response.data?.meta?.total));
      thunkApi.dispatch(setMyRequestsLoader(false));
    } catch (err) {
      thunkApi.dispatch(setMyRequestsLoader(false));
      console.log(err);
    }
  },
);

export const updateRequestStatus = createAsyncThunk(
  'UPDATE_REQUEST_STATUS',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setRequestDetailsLoader(true));
    try {
      const response: any = await client.put(`${endpoints.requests}/change-status/${args.id}`, {status: args.status});
      console.log('response-----updateRequestStatus---------', response);
      thunkApi.dispatch(getRequestDetails({id: args.id}));
      thunkApi.dispatch(myRequests({}));
      thunkApi.dispatch(setRequestDetailsLoader(false));
    } catch (err) {
      thunkApi.dispatch(setRequestDetailsLoader(false));
      console.log(err);
    }
  },
);

export const allRequests = createAsyncThunk(
  'All_PROPERTIES',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setAllRequestsLoader(true));
    try {
      const response: any = await client.get(`${endpoints.all_requests}?paginate=10`);
      console.log('response-----allRequests---------', response);
      thunkApi.dispatch(setAllRequestsTotal(response.data.meta.total));
      if (args.page == 1) {
        thunkApi.dispatch(setAllRequestsData(response.data.data));
      } else {
        thunkApi.dispatch(setAllRequestsLoadmore(response.data.data));
      }
      thunkApi.dispatch(setAllRequestsLoader(false));
    } catch (err) {
      thunkApi.dispatch(setAllRequestsLoader(false));
      console.log(err);
    }
  },
);

// export const getPropertySearch = createAsyncThunk(
//   'GET_PROPERTY_SEARCH',
//   async (args: any, thunkApi) => {
//     thunkApi.dispatch(setSearchPropertiesLoader(true));
//     let url: string = `paginate=10&page=${args.page}`;
//     args.search != "" ? url = `${url}search_text=${args.search}` : `${url}search_text=`;
//     args.category_id != undefined ? url = `${url}&category_id=${args.category_id}` : null;
//     args.marital_status != "" ? url = `${url}&marital_status=${args.marital_status}` : null;
//     args.price_order_max != 0 ? url = `${url}&price_order_max=${args.price_order_max}` : null;
//     args.price_order_min != 0 ? url = `${url}&price_order_min=${args.price_order_min}` : null;
//     args.type != undefined ? url = `${url}&type=${args.type}` : null;
//     args.num_bathroom != undefined ? url = `${url}&num_bathroom=${args.num_bathroom}` : null;
//     args.num_livingroom != undefined ? url = `${url}&num_livingroom=${args.num_livingroom}` : null;
//     args.num_rooms != undefined ? url = `${url}&num_rooms=${args.num_rooms}` : null;
//     args.max_area != "" ? url = `${url}&max_area=${args.max_area}` : null;
//     args.max_price != "" ? url = `${url}&max_price=${args.max_price}` : null;
//     args.min_area != "" ? url = `${url}&min_area=${args.min_area}` : null;
//     args.min_price != "" ? url = `${url}&min_price=${args.min_price}` : null;
//     try {
//       const user_data: any = await AsyncStorage.getItem('user');
//       const token = JSON.parse(user_data)?.access_token ? `token=${JSON.parse(user_data)?.access_token}` : '';
//       const response: any = await client.get(`${endpoints.allProperties}?${url}&${token}`);
//       console.log('response-----getPropertySearch-------', response);
//       if (args.page == 1) {
//         thunkApi.dispatch(setSearchPropertiesData(response.data.data));
//       } else {
//         thunkApi.dispatch(setSearchPropertiesLoadmore(response.data.data));
//       }
      
//       thunkApi.dispatch(setSearchPropertiesTotal(response.data.meta.total));
//       thunkApi.dispatch(setSearchPropertiesLoader(false));
//     } catch (err) {
//       thunkApi.dispatch(setSearchPropertiesLoader(false));
//       console.log(err);
//     }
//   },
// );

export const getRequestDetails = createAsyncThunk(
  'REQUEST_DETAILS',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setRequestDetailsLoader(true));
    try {
      const response: any = await client.get(`${endpoints.requests}/${args.id}`);
      console.log('response-----getRequestDetails-------', response);
      thunkApi.dispatch(setRequestDetailsData(response.data.data));
      thunkApi.dispatch(setRequestDetailsLoader(false));
    } catch (err) {
      thunkApi.dispatch(setRequestDetailsLoader(false));
      console.log(err);
    }
  },
);