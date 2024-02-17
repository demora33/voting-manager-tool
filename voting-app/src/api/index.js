import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

export default apiClient;


// import apiClient from './api';

// apiClient.get('/watchlist')
//   .then(response => {
//     console.log(response.data); // debería imprimir "hola"
//   })
//   .catch(error => {
//     console.error(error);
//   });