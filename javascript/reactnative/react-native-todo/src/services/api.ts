import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', // Para Android Emulator
  // baseURL: 'http://localhost:3000', // Para iOS Simulator
});

export default api;
