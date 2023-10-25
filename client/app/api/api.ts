//import axios from 'axios';
//
//const api = axios.create({
//  baseURL: 'http://127.0.0.1:8000',
//});
//
//export const getRecurso = async (token: string) => {
//  try {
//    const response = await api.get('/equipamentos', {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    });
//    return response.data;
//  } catch (error) {
//    throw new Error(`Erro ao buscar recurso: ${error}`);
//  }
//};
//
//export default api;
