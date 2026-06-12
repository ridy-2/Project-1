import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import KelasApi from '../api/KelasApi';
import { toastSuccess, toastError } from '../helpers/toast';

const QUERY_KEY = 'kelas';

// Hook untuk mengambil semua data kelas
export function useKelasList() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: KelasApi.getAll,
  });
}

// Hook untuk mengambil satu kelas berdasarkan id
export function useKelasDetail(id) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => KelasApi.getById(id),
    enabled: !!id,
  });
}

// Hook untuk tambah kelas
export function useCreateKelas() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => KelasApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Kelas berhasil ditambahkan!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal menambahkan kelas!');
    },
  });
}

// Hook untuk update kelas
export function useUpdateKelas() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => KelasApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Data kelas berhasil diperbarui!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal memperbarui kelas!');
    },
  });
}

// Hook untuk hapus kelas
export function useDeleteKelas() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => KelasApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Data kelas berhasil dihapus!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal menghapus kelas!');
    },
  });
}
