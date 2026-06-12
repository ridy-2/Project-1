import api from '../helpers/api';

const KelasApi = {
  getAll: async () => {
    const response = await api.get('/kelas');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/kelas/${id}`);
    return response.data;
  },
  create: async (data) => {
    const dataWithId = { ...data, id: data.kode };
    const response = await api.post('/kelas', dataWithId);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/kelas/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/kelas/${id}`);
    return response.data;
  }
};

export default KelasApi;
