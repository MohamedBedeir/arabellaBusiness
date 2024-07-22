import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client, clientFormData} from '../../network/apiClient';
import { setAddPropertyLoader, setAddPropertyState, setAgentPropertiesData, setAgentPropertiesLoader, setAgentPropertiesLoadmore, setAgentPropertiesTotal, setAllPropertiesData, setAllPropertiesLoader, setAllPropertiesLoadmore, setExclusivePropertiesData, setExclusivePropertiesLoader, setExclusivePropertiesLoadmore, setExclusivePropertiesTotal, setMyPropertiesData, setMyPropertiesLoader, setMyPropertiesTotal, setPropertyDetailsData, setPropertyDetailsLoader, setSearchPropertiesData, setSearchPropertiesLoader, setSearchPropertiesLoadmore, setSearchPropertiesTotal } from '../../redux/store/properties/properties';
import { setAgentsLoader } from '../../redux/store/agents/agents';
import { userData } from '../profile/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myRequests } from '../request/request';

interface CreateProperty {
  data: any;
  imagesData: any;
};

interface EditProperty {
  id: number;
  data: any;
  imagesData: any;
  deletedImages: any;
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

export const createProperty = createAsyncThunk(
  'CREATE_PROPERTY',
  async (args: CreateProperty, thunkApi) => {
    try {
      thunkApi.dispatch(setAddPropertyLoader(true));
      thunkApi.dispatch(setAddPropertyState(''));
      const imagesData: any = args.imagesData;
      const response: any = await clientFormData.post(endpoints.create_property, args.data);
      if (imagesData.length > 0) {
        for (let i = 0; i < imagesData.length; i++) {
          const image = new FormData();
          image.append('image', {
            name: JSON.parse(imagesData[i].imageFile)[0].name,
            type: JSON.parse(imagesData[i].imageFile)[0].type,
            uri: JSON.parse(imagesData[i].imageFile)[0].uri,
          })
          image.append('property_id', response.data.data.id);
          thunkApi.dispatch(uploadImage({property_id: response.data.data.id, image, imagesCount: imagesData.length, imageIndex: i}))
        }
      } {
        thunkApi.dispatch(setAddPropertyLoader(false));
        thunkApi.dispatch(setAddPropertyState('done'));
        thunkApi.dispatch(myProperties({}));
      };
      thunkApi.dispatch(userData({}));
    } catch (err) {
      thunkApi.dispatch(setAddPropertyState('error'));
      console.log('err---', err);
    }
  },
);

export const editProperty = createAsyncThunk(
  'CREATE_PROPERTY',
  async (args: EditProperty, thunkApi) => {
    try {
      console.log('args------------>>>>>>>', args);
      
      thunkApi.dispatch(setAddPropertyLoader(true));
      thunkApi.dispatch(setAddPropertyState(''));
      const imagesData: any = args.imagesData;
      const response: any = await clientFormData.post(`${endpoints.edit_property}/${args.id}`, args.data);
      if (args.deletedImages.length > 0) {
        thunkApi.dispatch(removeImages({deletedImages: args.deletedImages, property_id: args.id}))
      };
      if (imagesData.length > 0) {
        for (let i = 0; i < imagesData.length; i++) {
          const image = new FormData();
          image.append('image', {
            name: JSON.parse(imagesData[i].imageFile)[0].name,
            type: JSON.parse(imagesData[i].imageFile)[0].type,
            uri: JSON.parse(imagesData[i].imageFile)[0].uri,
          })
          image.append('property_id', 37);
          thunkApi.dispatch(uploadImage({property_id: 37, image, imagesCount: imagesData.length, imageIndex: i}))
        }
      } {
        thunkApi.dispatch(setAddPropertyLoader(false));
        thunkApi.dispatch(setAddPropertyState('done'));
        thunkApi.dispatch(myProperties({}));
        thunkApi.dispatch(getPropertyDetails({id: args.id}));
      };
      thunkApi.dispatch(userData({}));
    } catch (err) {
      thunkApi.dispatch(setAddPropertyState('error'));
      console.log('err-editProperty--', err);
    }
  },
);

export const removeImages = createAsyncThunk(
  'UPLOAD_IMAGE',
  async (args: RemoveImage, thunkApi) => {
    try {
      const data = {
        property_id: args.property_id,
        images_removed: args.deletedImages,
      };
      const response: any = await clientFormData.post(endpoints.removeImages, data);
      console.log('response--------removeImages------', response);
      
    } catch (err) {
      console.log('err--removeImages-', err);
    }
  },
);

export const uploadImage = createAsyncThunk(
  'UPLOAD_IMAGE',
  async (args: UploadImage, thunkApi) => {
    try {
      const data = args.image;
      const response: any = await clientFormData.post(endpoints.uploadImage, data);
      console.log('response--------uploadImage------', response);
      if (args.imagesCount == args.imageIndex + 1) {
        thunkApi.dispatch(setAddPropertyLoader(false));
        thunkApi.dispatch(setAddPropertyState('done'));
        thunkApi.dispatch(myProperties({}));
        thunkApi.dispatch(getPropertyDetails({id: args.property_id}));
      }
    } catch (err) {
      thunkApi.dispatch(setAddPropertyLoader(false));
      thunkApi.dispatch(setAddPropertyState('error for images'));
      console.log('err--uploadImage-', err);
    }
  },
);

export const myProperties = createAsyncThunk(
  'MY_PROPERTIES',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setMyPropertiesLoader(true));
    try {
      const response: any = await client.get(endpoints.properties);
      console.log('response---myProperties---------', response);
      thunkApi.dispatch(myRequests({}));
      thunkApi.dispatch(setMyPropertiesData(response.data.data));
      thunkApi.dispatch(setMyPropertiesTotal(response.data?.meta?.total));
      thunkApi.dispatch(setMyPropertiesLoader(false));
    } catch (err) {
      thunkApi.dispatch(setMyPropertiesLoader(false));
      console.log(err);
    }
  },
);

export const updatePropertyStatus = createAsyncThunk(
  'UPDATE_PROPERTY_STATUS',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setPropertyDetailsLoader(true));
    try {
      const response: any = await client.put(`${endpoints.properties}/change-status/${args.id}`, {status: args.status});
      thunkApi.dispatch(getPropertyDetails({id: args.id}));
      thunkApi.dispatch(myProperties({}));
      thunkApi.dispatch(setPropertyDetailsLoader(false));
    } catch (err) {
      thunkApi.dispatch(setPropertyDetailsLoader(false));
      console.log(err);
    }
  },
);

export const upgradePropertyToFeature = createAsyncThunk(
  'UPDATE_PROPERTY_STATUS',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setPropertyDetailsLoader(true));
    try {
      const response: any = await client.put(`${endpoints.properties}/updgrade-to-feature/${args.id}`);
      console.log('upgradePropertyToFeature--------', response);
      
      thunkApi.dispatch(getPropertyDetails({id: args.id}));
      thunkApi.dispatch(myProperties({}));
      thunkApi.dispatch(allProperties({page: 1}));
      thunkApi.dispatch(setPropertyDetailsLoader(false));
    } catch (err) {
      thunkApi.dispatch(setPropertyDetailsLoader(false));
      console.log(err);
    }
  },
);

export const deleteProperty = createAsyncThunk(
  'DELETE_PROPERTY',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setPropertyDetailsLoader(true));
    try {
      const response: any = await client.delete(`${endpoints.properties}/${args.id}`);
      args.navigation.goBack();
      thunkApi.dispatch(myProperties({}));
      thunkApi.dispatch(setPropertyDetailsLoader(false));
    } catch (err) {
      thunkApi.dispatch(setPropertyDetailsLoader(false));
      console.log(err);
    }
  },
);

export const allProperties = createAsyncThunk(
  'All_PROPERTIES',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setAllPropertiesLoader(true));
    try {
      const user_data: any = await AsyncStorage.getItem('user');
      const token = JSON.parse(user_data)?.access_token ? `token=${JSON.parse(user_data)?.access_token}` : '';
      const response: any = await client.get(`${endpoints.allProperties}?paginate=10&page=${args.page}&${token}`);
      console.log('allProperties---------', response);
      if (args.page == 1) {
        thunkApi.dispatch(setAllPropertiesData(response.data.data));
      } else {
        thunkApi.dispatch(setAllPropertiesLoadmore(response.data.data));
      }
      thunkApi.dispatch(setAllPropertiesLoader(false));
      thunkApi.dispatch(setAgentsLoader(false))
    } catch (err) {
      thunkApi.dispatch(setAllPropertiesLoader(false));
      thunkApi.dispatch(setAgentsLoader(false))
      console.log(err);
    }
  },
);

export const exclusiveProperties = createAsyncThunk(
  'EXCLUSIVE_PROPERTIES',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setExclusivePropertiesLoader(true));
    try {
      const user_data: any = await AsyncStorage.getItem('user');
      const token = JSON.parse(user_data)?.access_token ? `token=${JSON.parse(user_data)?.access_token}` : '';
      const response: any = await client.get(`${endpoints.allProperties}/?feature_ads=1&paginate=10&page=${args.page}&${token}`);
      console.log('exclusiveProperties--------', response);
      if (args.page == 1) {
        thunkApi.dispatch(setExclusivePropertiesData(response.data.data));
      } else {
        thunkApi.dispatch(setExclusivePropertiesLoadmore(response.data.data));
      }
      thunkApi.dispatch(setExclusivePropertiesTotal(response.data.meta.total));
      thunkApi.dispatch(setExclusivePropertiesLoader(false));
      thunkApi.dispatch(allProperties({page: 1}));
    } catch (err) {
      thunkApi.dispatch(setExclusivePropertiesLoader(false));
      console.log(err);
    }
  },
);

export const agentProperties = createAsyncThunk(
  'AGENT_PROPERTIES',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setAgentPropertiesLoader(true));
    try {
      const user_data: any = await AsyncStorage.getItem('user');
      const token = JSON.parse(user_data)?.access_token ? `token=${JSON.parse(user_data)?.access_token}` : '';
      const response: any = await client.get(`${endpoints.allProperties}/?client_id=${args.id}&paginate=10&page=${args.page}&${token}`);
      console.log('agentProperties--------', response);
      if (args.page == 1) {
        thunkApi.dispatch(setAgentPropertiesData(response.data.data));
      } else {
        thunkApi.dispatch(setAgentPropertiesLoadmore(response.data.data));
      }
      thunkApi.dispatch(setAgentPropertiesTotal(response.data.meta.total))
      thunkApi.dispatch(setAgentPropertiesLoader(false));
      thunkApi.dispatch(allProperties({page: 1}));
    } catch (err) {
      thunkApi.dispatch(setAgentPropertiesLoader(false));
      console.log(err);
    }
  },
);

export const getPropertySearch = createAsyncThunk(
  'GET_PROPERTY_SEARCH',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setSearchPropertiesLoader(true));
    console.log('args----------', args);
    
    let url: string = `paginate=10&page=${args.page}`;
    args.search != "" ? url = `${url}search_text=${args.search}` : `${url}search_text=`;
    args.category_id != undefined ? url = `${url}&category_id=${args.category_id}` : null;
    args.marital_status != "" ? url = `${url}&marital_status=${args.marital_status}` : null;
    args.price_order_max != 0 ? url = `${url}&price_order_max=${args.price_order_max}` : null;
    args.price_order_min != 0 ? url = `${url}&price_order_min=${args.price_order_min}` : null;
    args.type != undefined ? url = `${url}&type=${args.type}` : null;
    args.num_bathroom != undefined ? url = `${url}&num_bathroom=${args.num_bathroom}` : null;
    args.num_livingroom != undefined ? url = `${url}&num_livingroom=${args.num_livingroom}` : null;
    args.num_rooms != undefined ? url = `${url}&num_rooms=${args.num_rooms}` : null;
    args.max_area != "" ? url = `${url}&max_area=${args.max_area}` : null;
    args.max_price != "" ? url = `${url}&max_price=${args.max_price}` : null;
    args.min_area != "" ? url = `${url}&min_area=${args.min_area}` : null;
    args.min_price != "" ? url = `${url}&min_price=${args.min_price}` : null;
    args.selected_search_type != "" ? url = `${url}&selected_search_type=${args.selected_search_type}&selected_search_ids=[${args.selected_search_ids}]` : null;
    try {
      const user_data: any = await AsyncStorage.getItem('user');
      const token = JSON.parse(user_data)?.token ? `token=${JSON.parse(user_data)?.token}` : '';
      console.log('user_data--------', JSON.parse(user_data));
      
      const response: any = await client.get(`${endpoints.allProperties}?${url}&${token}`);
      console.log('response-----getPropertySearch-------', response);
      if (args.page == 1) {
        thunkApi.dispatch(setSearchPropertiesData(response.data.data));
      } else {
        thunkApi.dispatch(setSearchPropertiesLoadmore(response.data.data));
      }
      
      thunkApi.dispatch(setSearchPropertiesTotal(response.data.meta.total));
      thunkApi.dispatch(setSearchPropertiesLoader(false));
    } catch (err) {
      thunkApi.dispatch(setSearchPropertiesLoader(false));
      console.log(err);
    }
  },
);

export const getPropertyDetails = createAsyncThunk(
  'PROPERTY_LIST',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setPropertyDetailsLoader(true));
    try {
      const user_data: any = await AsyncStorage.getItem('user');
      const token = JSON.parse(user_data)?.access_token ? `token=${JSON.parse(user_data)?.access_token}` : '';
      const response: any = await client.get(`${endpoints.properties}/${args.id}?${token}`);
      console.log('response-----getPropertyDetails-------', response);
      thunkApi.dispatch(setPropertyDetailsData(response.data.data));
      thunkApi.dispatch(setPropertyDetailsLoader(false));
    } catch (err) {
      thunkApi.dispatch(setPropertyDetailsLoader(false));
      console.log(err);
    }
  },
);