import api from '../helpers/api';

const MahasiswaApi = {
  getAll: async () => {
    const response = await api.get('/mahasiswa');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/mahasiswa/${id}`);
    return response.data;
  },
  create: async (data) => {
    const dataWithId = { ...data, id: data.nim };
    const response = await api.post('/mahasiswa', dataWithId);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/mahasiswa/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/mahasiswa/${id}`);
    return response.data;
  }
};

export default MahasiswaApi;
