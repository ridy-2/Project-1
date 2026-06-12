import { useState } from "react";
import MahasiswaModal from "../components/features/MahasiswaModal";
import MahasiswaTable from "../components/features/MahasiswaTable";
import Pagination from "../components/molecules/Pagination";
import { confirmDelete } from "../helpers/swal";
import {
  useMahasiswaList,
  useCreateMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "../utils/useMahasiswa";
import { useKelasList } from "../utils/useKelas";
import { useMataKuliahList } from "../utils/useMataKuliah";

export default function Mahasiswa() {
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // React Query hooks
  const { data: mahasiswa = [], isLoading: isMhsLoading } = useMahasiswaList();
  const { data: kelas = [], isLoading: isKelasLoading } = useKelasList();
  const { data: mk = [], isLoading: isMkLoading } = useMataKuliahList();

  const createMutation = useCreateMahasiswa();
  const updateMutation = useUpdateMahasiswa();
  const deleteMutation = useDeleteMahasiswa();

  const isLoading = isMhsLoading || isKelasLoading || isMkLoading;

  // Calculate pagination details dynamically
  const totalItems = mahasiswa.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const activePage = currentPage > totalPages ? totalPages : currentPage;
  const paginatedMahasiswa = mahasiswa.slice((activePage - 1) * limit, activePage * limit);

  const handleSubmit = async (formData) => {
    if (selectedMahasiswa) {
      await updateMutation.mutateAsync({ id: formData.nim, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (nim) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await deleteMutation.mutateAsync(nim);
    }
  };

  const openAddModal = () => { setSelectedMahasiswa(null); setIsModalOpen(true); };
  const openEditModal = (mhs) => { setSelectedMahasiswa(mhs); setIsModalOpen(true); };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h3 style={{ margin: 0 }}>Daftar Mahasiswa</h3>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
        >
          + Tambah Mahasiswa
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "16px", color: "#64748b" }}>Memuat data...</div>
      ) : (
        <>
          <MahasiswaTable 
            mahasiswa={paginatedMahasiswa} 
            openEditModal={openEditModal} 
            onDelete={handleDelete} 
            kelas={kelas}
            mataKuliah={mk}
          />
          <Pagination
            currentPage={activePage}
            totalItems={totalItems}
            limit={limit}
            onPageChange={setCurrentPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setCurrentPage(1);
            }}
          />
        </>
      )}


      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </div>
  );
}