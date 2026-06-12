import React from "react";

export default function UserTable({ users, openEditModal, onDelete, currentLoggedUserEmail }) {
  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return { bg: "#fef3c7", text: "#d97706" }; // Amber
      case "editor":
        return { bg: "#e0e7ff", text: "#4f46e5" }; // Indigo
      default:
        return { bg: "#f3f4f6", text: "#4b5563" }; // Gray
    }
  };

  const getPermissionColor = (perm) => {
    switch (perm?.toLowerCase()) {
      case "read":
        return { bg: "#e6f4ea", text: "#137333" }; // Green
      case "write":
        return { bg: "#e8f0fe", text: "#1a73e8" }; // Blue
      case "delete":
        return { bg: "#fce8e6", text: "#c5221f" }; // Red
      case "manage users":
        return { bg: "#f3e8ff", text: "#7e22ce" }; // Purple
      default:
        return { bg: "#f1f5f9", text: "#475569" };
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2563eb", color: "#fff" }}>
            <th style={{ padding: "15px", textAlign: "left", borderTopLeftRadius: "8px" }}>Nama</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "15px", textAlign: "center" }}>Role</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Permissions</th>
            <th style={{ padding: "15px", textAlign: "center", borderTopRightRadius: "8px" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: "25px", textAlign: "center", color: "#64748b" }}>Tidak ada data user.</td>
            </tr>
          ) : (
            users.map((u) => {
              const roleStyle = getRoleColor(u.role);
              const isSelf = u.email === currentLoggedUserEmail;

              return (
                <tr key={u.id || u.email} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "15px", fontWeight: "500", color: "#1e293b" }}>
                    {u.name} {isSelf && <span style={{ fontSize: "11px", color: "#64748b", fontStyle: "italic" }}>(Anda)</span>}
                  </td>
                  <td style={{ padding: "15px", color: "#475569" }}>{u.email}</td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <span style={{
                      backgroundColor: roleStyle.bg,
                      color: roleStyle.text,
                      padding: "4px 10px",
                      borderRadius: "50px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      {u.role || "User"}
                    </span>
                  </td>
                  <td style={{ padding: "15px" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {Array.isArray(u.permissions) && u.permissions.length > 0 ? (
                        u.permissions.map((perm, idx) => {
                          const pStyle = getPermissionColor(perm);
                          return (
                            <span key={idx} style={{
                              backgroundColor: pStyle.bg,
                              color: pStyle.text,
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "11px",
                              fontWeight: "600"
                            }}>
                              {perm}
                            </span>
                          );
                        })
                      ) : (
                        <span style={{ fontSize: "12px", color: "#94a3b8", fontStyle: "italic" }}>No Permissions</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button 
                      onClick={() => openEditModal(u)} 
                      style={{ backgroundColor: "#fbbf24", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", marginRight: "8px", fontWeight: "600" }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(u.id || u.email)} 
                      disabled={isSelf}
                      style={{ 
                        backgroundColor: isSelf ? "#fca5a5" : "#ef4444", 
                        color: "#fff", 
                        border: "none", 
                        padding: "6px 12px", 
                        borderRadius: "4px", 
                        cursor: isSelf ? "not-allowed" : "pointer", 
                        fontWeight: "600" 
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
