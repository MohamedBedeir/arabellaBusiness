import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client} from '../../network/apiClient';
import { setAllCitiesData, setAreasData, setCategoriesData, setCitiesData, setFacilitiesData, setFeaturesData, setSettingData, setTypesData } from '../../redux/store/general/general';

export const types = createAsyncThunk(
  'TYPES',
  async (args: any, thunkApi) => {
    try {
      const response: any = await client.get(endpoints.types);
      const data = [
        { id: 1, key: 'sale', name: "For Sale", name_ar: "بيع"  },
        { id: 2, key: 'rent', name: "For Rent", name_ar: "إيجار" },
        { id: 3, key: 'replacement', name: "Exchange", name_ar: "إستبدال" },
      ];
      thunkApi.dispatch(setTypesData(data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const categories = createAsyncThunk(
  'CATEGORIES',
  async (args: any, thunkApi) => {
    try {
      const response: any = await client.get(endpoints.categories);
      console.log('response-----categories-------', response);
      thunkApi.dispatch(setCategoriesData(response.data.data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const facilities = createAsyncThunk(
  'CATEGORIES',
  async (args: any, thunkApi) => {
    try {
      const response: any = await client.get(endpoints.facilities);
      console.log('response-----facilities-------', response);
      thunkApi.dispatch(setFacilitiesData(response.data.data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const features = createAsyncThunk(
  'CATEGORIES',
  async (args: any, thunkApi) => {
    try {
      const response: any = await client.get(endpoints.features);
      console.log('response-----features-------', response);
      thunkApi.dispatch(setFeaturesData(response.data.data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const allCities = createAsyncThunk(
  'CITIES',
  async (args: any, thunkApi) => {
    try {
      const response: any = await client.get(endpoints.cities);
      console.log('response----cities--------', response);
      const data: any = response.data.data;
      console.log('data------->>', data);
      var array: any = [];
      for (let c = 0; c < data.length; c++) {
        array.push({id: data[c].id, name: data[c].name, name_ar: data[c].name_ar, type: 'city'});
        for (let a = 0; a < data[c].areas.length; a++) {
          array.push({id: data[c].areas[a].id + 100, name: data[c].areas[a].name, name_ar: data[c].areas[a].name_ar, type: 'area'});
        }
      };
      thunkApi.dispatch(setAllCitiesData(array));
      console.log('array-------', array);
    } catch (err) {
      console.log(err);
    }
  },
);
sliders
export const cities = createAsyncThunk(
  'CITIES',
  async (args: any, thunkApi) => {
    try {
      const response: any = await client.get(endpoints.cities);
      thunkApi.dispatch(setCitiesData(response.data.data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const areas = createAsyncThunk(
  'AREAS',
  async (args: any, thunkApi) => {
    try {
      const response: any = await client.get(`${endpoints.areas}?city_id=${args.cityId}`);
      console.log('response-----areas-------', response);
      thunkApi.dispatch(setAreasData(response.data.data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const sliders = createAsyncThunk(
  'CITIES',
  async (args: any, thunkApi) => {
    try {
      const response: any = await client.get(endpoints.sliders);
      console.log('sliders--------', response);
      
      thunkApi.dispatch(setCitiesData(response.data.data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const settings = createAsyncThunk(
  'SETTINGS',
  async (args: any, thunkApi) => {
    try {
      const response: any = await client.get(endpoints.settings);
      thunkApi.dispatch(setSettingData(response.data.data));
    } catch (err) {
      console.log(err);
    }
  },
);