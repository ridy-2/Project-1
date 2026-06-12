import api from '../helpers/api';

const MataKuliahApi = {
  getAll: async () => {
    const response = await api.get('/matakuliah');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/matakuliah/${id}`);
    return response.data;
  },
  create: async (data) => {
    const dataWithId = { ...data, id: data.kode };
    const response = await api.post('/matakuliah', dataWithId);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/matakuliah/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/matakuliah/${id}`);
    return response.data;
  }
};

export default MataKuliahApi;
