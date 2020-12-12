import axios from 'axios';

export default axios.create({
  baseURL: 'https://ugcompass.herokuapp.com/api/v1',
  // baseURL: 'http://localhost:5000/api/v1',
});
