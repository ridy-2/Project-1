import { useState, useEffect } from "react";
import UserModal from "../components/features/UserModal";
import UserTable from "../components/features/UserTable";
import Pagination from "../components/molecules/Pagination";
import { confirmDelete } from "../helpers/swal";
import { toastSuccess, toastError } from "../helpers/toast";
import UserApi from "../api/UserApi";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  
  // Get current logged-in user from localStorage
  const currentLoggedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await UserApi.getAll();
      setUsers(data);
    } catch (err) {
      toastError("Gagal mengambil data user!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Calculate pagination details dynamically
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const activePage = currentPage > totalPages ? totalPages : currentPage;
  const paginatedUsers = users.slice((activePage - 1) * limit, activePage * limit);

  const handleSubmit = async (formData) => {
    try {
      await UserApi.update(formData.id, formData);
      toastSuccess("Data user (Role & Permission) berhasil diperbarui!");
      fetchUsers();
      
      // If the edited user is themselves, update their local metadata as well
      if (formData.email === currentLoggedUser.email) {
        const updatedLocalUser = {
          ...currentLoggedUser,
          name: formData.name,
          role: formData.role,
          permissions: formData.permissions
        };
        localStorage.setItem("currentUser", JSON.stringify(updatedLocalUser));
      }

      setIsModalOpen(false);
    } catch (err) {
      const errMsg = err.message || "Gagal menyimpan data!";
      toastError(errMsg);
    }
  };

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      try {
        await UserApi.delete(id);
        toastSuccess("User berhasil dihapus!");
        fetchUsers();
      } catch (err) {
        const errMsg = err.message || "Gagal menghapus data!";
        toastError(errMsg);
      }
    }
  };

  const openEditModal = (u) => {
    setSelectedUser(u);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h3 style={{ margin: 0, color: "#1e293b" }}>Kelola User, Role, & Permission</h3>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "16px", color: "#64748b" }}>Memuat data...</div>
      ) : (
        <>
          <UserTable 
            users={paginatedUsers} 
            openEditModal={openEditModal} 
            onDelete={handleDelete} 
            currentLoggedUserEmail={currentLoggedUser.email}
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

      <UserModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedUser={selectedUser}
      />
    </div>
  );
}

