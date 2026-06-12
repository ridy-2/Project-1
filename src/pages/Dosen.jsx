import { useState } from "react";
import DosenModal from "../components/features/DosenModal";
import DosenTable from "../components/features/DosenTable";
import Pagination from "../components/molecules/Pagination";
import { confirmDelete } from "../helpers/swal";
import {
  useDosenList,
  useCreateDosen,
  useUpdateDosen,
  useDeleteDosen,
} from "../utils/useDosen";

export default function Dosen() {
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // React Query hooks
  const { data: dosen = [], isLoading } = useDosenList();
  const createMutation = useCreateDosen();
  const updateMutation = useUpdateDosen();
  const deleteMutation = useDeleteDosen();

  // Calculate pagination details dynamically
  const totalItems = dosen.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const activePage = currentPage > totalPages ? totalPages : currentPage;
  const paginatedDosen = dosen.slice((activePage - 1) * limit, activePage * limit);

  const handleSubmit = async (formData) => {
    if (selectedDosen) {
      await updateMutation.mutateAsync({ id: formData.nidn, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (nidn) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await deleteMutation.mutateAsync(nidn);
    }
  };

  const openAddModal = () => { setSelectedDosen(null); setIsModalOpen(true); };
  const openEditModal = (dsn) => { setSelectedDosen(dsn); setIsModalOpen(true); };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h3 style={{ margin: 0 }}>Daftar Dosen</h3>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
        >
          + Tambah Dosen
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "16px", color: "#64748b" }}>Memuat data...</div>
      ) : (
        <>
          <DosenTable dosen={paginatedDosen} openEditModal={openEditModal} onDelete={handleDelete} />
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

      <DosenModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedDosen={selectedDosen}
      />
    </div>
  );
}

