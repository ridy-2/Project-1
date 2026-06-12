import api from '../helpers/api';

const DosenApi = {
  getAll: async () => {
    const response = await api.get('/dosen');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/dosen/${id}`);
    return response.data;
  },
  create: async (data) => {
    const dataWithId = { ...data, id: data.nidn };
    const response = await api.post('/dosen', dataWithId);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/dosen/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/dosen/${id}`);
    return response.data;
  }
};

export default DosenApi;
