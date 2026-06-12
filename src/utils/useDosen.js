import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DosenApi from '../api/DosenApi';
import { toastSuccess, toastError } from '../helpers/toast';

const QUERY_KEY = 'dosen';

// Hook untuk mengambil semua data dosen
export function useDosenList() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: DosenApi.getAll,
  });
}

// Hook untuk mengambil satu dosen berdasarkan id
export function useDosenDetail(id) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => DosenApi.getById(id),
    enabled: !!id,
  });
}

// Hook untuk tambah dosen
export function useCreateDosen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => DosenApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Dosen berhasil ditambahkan!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal menambahkan dosen!');
    },
  });
}

// Hook untuk update dosen
export function useUpdateDosen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => DosenApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Data dosen berhasil diperbarui!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal memperbarui dosen!');
    },
  });
}

// Hook untuk hapus dosen
export function useDeleteDosen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => DosenApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Data dosen berhasil dihapus!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal menghapus dosen!');
    },
  });
}
