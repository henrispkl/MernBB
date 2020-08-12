import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4000/api/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
});
