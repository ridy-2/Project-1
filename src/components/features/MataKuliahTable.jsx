import React from "react";

export default function MataKuliahTable({ mk, openEditModal, onDelete }) {
  return (
    <div style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2563eb", color: "#fff" }}>
            <th style={{ padding: "15px", textAlign: "left", borderTopLeftRadius: "8px" }}>Kode MK</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Nama Mata Kuliah</th>
            <th style={{ padding: "15px", textAlign: "center" }}>SKS</th>
            <th style={{ padding: "15px", textAlign: "center" }}>Semester</th>
            <th style={{ padding: "15px", textAlign: "center", borderTopRightRadius: "8px" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mk.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: "25px", textAlign: "center", color: "#64748b" }}>Tidak ada data mata kuliah.</td>
            </tr>
          ) : (
            mk.map((m) => (
              <tr key={m.kode} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "15px", fontFamily: "monospace", fontWeight: "600" }}>{m.kode}</td>
                <td style={{ padding: "15px", fontWeight: "500", color: "#1e293b" }}>{m.nama}</td>
                <td style={{ padding: "15px", textAlign: "center", color: "#475569" }}>{m.sks} SKS</td>
                <td style={{ padding: "15px", textAlign: "center", color: "#475569" }}>Semester {m.semester}</td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <button 
                    onClick={() => openEditModal(m)} 
                    style={{ backgroundColor: "#fbbf24", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", marginRight: "8px", fontWeight: "600" }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(m.kode)} 
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
