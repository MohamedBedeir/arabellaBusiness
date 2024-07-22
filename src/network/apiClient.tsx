import apisauce from 'apisauce';

const client = apisauce.create({
  baseURL: 'https://api.arabella-test.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
const clientFormData = apisauce.create({
  baseURL: 'https://api.arabella-test.com/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export {client, clientFormData};
