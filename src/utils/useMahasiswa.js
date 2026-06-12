import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MahasiswaApi from '../api/MahasiswaApi';
import { toastSuccess, toastError } from '../helpers/toast';

const QUERY_KEY = 'mahasiswa';

// Hook untuk mengambil semua data mahasiswa
export function useMahasiswaList() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: MahasiswaApi.getAll,
  });
}

// Hook untuk mengambil satu mahasiswa berdasarkan id
export function useMahasiswaDetail(id) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => MahasiswaApi.getById(id),
    enabled: !!id,
  });
}

// Hook untuk tambah mahasiswa
export function useCreateMahasiswa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => MahasiswaApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Mahasiswa berhasil ditambahkan!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal menambahkan mahasiswa!');
    },
  });
}

// Hook untuk update mahasiswa
export function useUpdateMahasiswa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => MahasiswaApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Data mahasiswa berhasil diperbarui!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal memperbarui mahasiswa!');
    },
  });
}

// Hook untuk hapus mahasiswa
export function useDeleteMahasiswa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => MahasiswaApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toastSuccess('Data mahasiswa berhasil dihapus!');
    },
    onError: (err) => {
      toastError(err.message || 'Gagal menghapus mahasiswa!');
    },
  });
}
