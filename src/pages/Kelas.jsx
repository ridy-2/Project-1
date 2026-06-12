import { useState } from "react";
import KelasModal from "../components/features/KelasModal";
import KelasTable from "../components/features/KelasTable";
import Pagination from "../components/molecules/Pagination";
import { confirmDelete } from "../helpers/swal";
import {
  useKelasList,
  useCreateKelas,
  useUpdateKelas,
  useDeleteKelas,
} from "../utils/useKelas";
import { useDosenList } from "../utils/useDosen";
import { useMataKuliahList } from "../utils/useMataKuliah";
import { useMahasiswaList } from "../utils/useMahasiswa";

export default function Kelas() {
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // React Query hooks
  const { data: kelas = [], isLoading: isKelasLoading } = useKelasList();
  const { data: dosen = [], isLoading: isDosenLoading } = useDosenList();
  const { data: mk = [], isLoading: isMkLoading } = useMataKuliahList();
  const { data: mahasiswa = [], isLoading: isMhsLoading } = useMahasiswaList();

  const createMutation = useCreateKelas();
  const updateMutation = useUpdateKelas();
  const deleteMutation = useDeleteKelas();

  const isLoading = isKelasLoading || isDosenLoading || isMkLoading || isMhsLoading;

  // Calculate pagination details dynamically
  const totalItems = kelas.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const activePage = currentPage > totalPages ? totalPages : currentPage;
  const paginatedKelas = kelas.slice((activePage - 1) * limit, activePage * limit);

  const handleSubmit = async (formData) => {
    if (selectedKelas) {
      await updateMutation.mutateAsync({ id: formData.kode, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (kode) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await deleteMutation.mutateAsync(kode);
    }
  };

  const openAddModal = () => { setSelectedKelas(null); setIsModalOpen(true); };
  const openEditModal = (k) => { setSelectedKelas(k); setIsModalOpen(true); };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h3 style={{ margin: 0 }}>Daftar Kelas</h3>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
        >
          + Tambah Kelas
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "16px", color: "#64748b" }}>Memuat data...</div>
      ) : (
        <>
          <KelasTable 
            kelas={paginatedKelas} 
            openEditModal={openEditModal} 
            onDelete={handleDelete} 
            dosen={dosen}
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

      <KelasModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedKelas={selectedKelas}
        dosen={dosen}
        mataKuliah={mk}
        mahasiswa={mahasiswa}
        allKelas={kelas}
      />
    </div>
  );
}


