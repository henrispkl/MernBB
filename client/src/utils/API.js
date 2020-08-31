import axios from 'axios';

export default axios.create({
  baseURL: '/api/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
});
