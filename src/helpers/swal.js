import Swal from "sweetalert2";

export const confirmDelete = () =>
  Swal.fire({
    title: "Hapus Data?",
    text: "Data yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  });

export const confirmSave = () =>
  Swal.fire({
    title: "Simpan Perubahan?",
    text: "Pastikan data yang dimasukkan sudah benar.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Ya, Simpan!",
    cancelButtonText: "Batal",
  });

export const confirmLogout = () =>
  Swal.fire({
    title: "Logout?",
    text: "Apakah Anda yakin ingin keluar?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Ya, Logout!",
    cancelButtonText: "Batal",
  });