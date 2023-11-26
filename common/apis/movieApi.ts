import axios from 'axios';
import { API_READ_ACCESS_TOKEN } from './movieApiKey';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
  }
});
