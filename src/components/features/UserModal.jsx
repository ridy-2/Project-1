import React, { useState, useEffect } from "react";
import { confirmSave } from "../../helpers/swal";
import { toastError } from "../../helpers/toast";

const AVAILABLE_PERMISSIONS = ["Read", "Write", "Delete", "Manage Users"];

export default function UserModal({ isModalOpen, onClose, onSubmit, selectedUser }) {
  const [form, setForm] = useState({ name: "", email: "", role: "User", permissions: ["Read"] });

  useEffect(() => {
    if (selectedUser) {
      setForm({
        ...selectedUser,
        role: selectedUser.role || "User",
        permissions: selectedUser.permissions || ["Read"]
      });
    }
  }, [selectedUser, isModalOpen]);

  if (!isModalOpen) return null;

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value });
  };

  const handlePermissionChange = (perm) => {
    const isChecked = form.permissions.includes(perm);
    let updatedPermissions;
    if (isChecked) {
      // Remove from permissions
      updatedPermissions = form.permissions.filter(p => p !== perm);
    } else {
      // Add to permissions
      updatedPermissions = [...form.permissions, perm];
    }
    setForm({ ...form, permissions: updatedPermissions });
  };

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      toastError("Nama wajib diisi!");
      return;
    }

    const result = await confirmSave();
    if (result.isConfirmed) {
      onSubmit(form);
      onClose();
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "420px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginTop: 0, color: "#1e293b", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px", marginBottom: "20px" }}>
          🖊️ Edit Role & Permission
        </h3>
        
        <form onSubmit={handleLocalSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Nama</label>
            <input
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Email</label>
            <input
              name="email"
              value={form.email}
              disabled
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", backgroundColor: "#f3f4f6", color: "#9ca3af" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleRoleChange}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", backgroundColor: "#fff" }}
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="User">User</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Permissions</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "8px" }}>
              {AVAILABLE_PERMISSIONS.map((perm) => {
                const isChecked = form.permissions.includes(perm);
                return (
                  <label key={perm} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer", color: "#374151" }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handlePermissionChange(perm)}
                      style={{ cursor: "pointer", width: "16px", height: "16px" }}
                    />
                    {perm}
                  </label>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "15px" }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #d1d5db", backgroundColor: "#fff", color: "#475569", cursor: "pointer", fontWeight: "600" }}
            >
              Batal
            </button>
            <button 
              type="submit" 
              style={{ padding: "10px 20px", borderRadius: "6px", backgroundColor: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontWeight: "600" }}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
