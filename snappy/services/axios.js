import axios from 'axios';
import { getData } from './localStorage';

const instance = axios.create({
  baseURL: 'http://snapi.epitech.eu/',
  responseType: 'json'
});

// Set the AUTH token for any request
instance.interceptors.request.use(async config => {
  const token = await getData('token');
  /* console.log(token); */
  if (token) {
    config.headers.token = token;
  }

  return config;
});

export default instance;
