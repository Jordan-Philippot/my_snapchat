import axios from 'axios';

export const register = async (email, password) => {
  return axios.post('http://snapi.epitech.eu/inscription', {email, password});
};

export const login = async (email, password) => {
  return axios.post('http://snapi.epitech.eu/connection', {email, password});
};
