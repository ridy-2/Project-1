import { useState } from "react";
import MataKuliahModal from "../components/features/MataKuliahModal";
import MataKuliahTable from "../components/features/MataKuliahTable";
import Pagination from "../components/molecules/Pagination";
import { confirmDelete } from "../helpers/swal";
import {
  useMataKuliahList,
  useCreateMataKuliah,
  useUpdateMataKuliah,
  useDeleteMataKuliah,
} from "../utils/useMataKuliah";

export default function MataKuliah() {
  const [selectedMK, setSelectedMK] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // React Query hooks
  const { data: mk = [], isLoading } = useMataKuliahList();
  const createMutation = useCreateMataKuliah();
  const updateMutation = useUpdateMataKuliah();
  const deleteMutation = useDeleteMataKuliah();

  // Calculate pagination details dynamically
  const totalItems = mk.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const activePage = currentPage > totalPages ? totalPages : currentPage;
  const paginatedMK = mk.slice((activePage - 1) * limit, activePage * limit);

  const handleSubmit = async (formData) => {
    if (selectedMK) {
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

  const openAddModal = () => { setSelectedMK(null); setIsModalOpen(true); };
  const openEditModal = (m) => { setSelectedMK(m); setIsModalOpen(true); };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h3 style={{ margin: 0 }}>Daftar Mata Kuliah</h3>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
        >
          + Tambah Mata Kuliah
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "16px", color: "#64748b" }}>Memuat data...</div>
      ) : (
        <>
          <MataKuliahTable mk={paginatedMK} openEditModal={openEditModal} onDelete={handleDelete} />
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

      <MataKuliahModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMK={selectedMK}
      />
    </div>
  );
}
