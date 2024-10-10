import apisauce from 'apisauce';
import endpoints from './endpoints';

const client = apisauce.create({
  baseURL: endpoints?.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
const clientFormData = apisauce.create({
  baseURL: endpoints?.baseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export {client, clientFormData};
