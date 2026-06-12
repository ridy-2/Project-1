import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MataKuliahApi from '../api/MataKuliahApi';
import { toastSuccess, toastError } from '../helpers/toast';

const QUERY_KEY = 'matakuliah';

// Hook untuk mengambil semua data mata kuliah
export function useMataKuliahList() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: MataKuliahApi.getAll,
  });
}

// Hook untuk mengambil satu mata kuliah berdasarkan id
export function useMataKuliahDetail(id) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => MataKuliahApi.getById(id),
    enabled: !!id,
  });
}

// Hook untuk tambah mata kuliah
export function useCreateMataKuliah() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => MataKuliahApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Mata kuliah berhasil ditambahkan!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal menambahkan mata kuliah!');
    },
  });
}

// Hook untuk update mata kuliah
export function useUpdateMataKuliah() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => MataKuliahApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Data mata kuliah berhasil diperbarui!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal memperbarui mata kuliah!');
    },
  });
}

// Hook untuk hapus mata kuliah
export function useDeleteMataKuliah() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => MataKuliahApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Data mata kuliah berhasil dihapus!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal menghapus mata kuliah!');
    },
  });
}
