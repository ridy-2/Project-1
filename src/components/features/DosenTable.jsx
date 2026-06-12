import React from "react";

export default function DosenTable({ dosen, openEditModal, onDelete }) {
  return (
    <div style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2563eb", color: "#fff" }}>
            <th style={{ padding: "15px", textAlign: "left", borderTopLeftRadius: "8px" }}>NIDN</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Nama</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "15px", textAlign: "center" }}>Status</th>
            <th style={{ padding: "15px", textAlign: "center", borderTopRightRadius: "8px" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dosen.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: "25px", textAlign: "center", color: "#64748b" }}>Tidak ada data dosen.</td>
            </tr>
          ) : (
            dosen.map((d) => (
              <tr key={d.nidn} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "15px", fontFamily: "monospace" }}>{d.nidn}</td>
                <td style={{ padding: "15px", fontWeight: "500", color: "#1e293b" }}>{d.nama}</td>
                <td style={{ padding: "15px", color: "#475569" }}>{d.email}</td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: "600",
                    backgroundColor: d.status ? "#d1fae5" : "#fee2e2",
                    color: d.status ? "#065f46" : "#991b1b"
                  }}>
                    {d.status ? "Aktif" : "Tidak Aktif"}
                  </span>
                </td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <button 
                    onClick={() => openEditModal(d)} 
                    style={{ backgroundColor: "#fbbf24", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", marginRight: "8px", fontWeight: "600" }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(d.nidn)} 
                    style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
