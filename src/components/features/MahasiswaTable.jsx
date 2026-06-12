import React from "react";
import { Link } from "react-router-dom";

export default function MahasiswaTable({ mahasiswa, openEditModal, onDelete, kelas = [], mataKuliah = [] }) {
  const getEnrolledSks = (nim) => {
    return kelas
      .filter(k => k.mahasiswaNims?.includes(nim))
      .reduce((acc, k) => {
        const mk = mataKuliah.find(m => m.kode === k.matakuliahKode);
        return acc + (mk ? Number(mk.sks) : 0);
      }, 0);
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2563eb", color: "#fff" }}>
            <th style={{ padding: "15px", textAlign: "left", borderTopLeftRadius: "8px" }}>NIM</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Nama</th>
            <th style={{ padding: "15px", textAlign: "center" }}>SKS Diambil</th>
            <th style={{ padding: "15px", textAlign: "center" }}>Status</th>
            <th style={{ padding: "15px", textAlign: "center", borderTopRightRadius: "8px" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((m) => {
            const currentSks = getEnrolledSks(m.nim);
            const maxSks = m.maxSks || 24;
            const isExceeded = currentSks > maxSks;

            return (
              <tr key={m.nim} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "15px" }}>
                  <Link to={`/admin/${m.nim}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                    {m.nim}
                  </Link>
                </td>
                <td style={{ padding: "15px" }}>{m.nama}</td>
                <td style={{ padding: "15px", textAlign: "center", fontWeight: "600", color: isExceeded ? "#ef4444" : "#475569" }}>
                  {currentSks} / {maxSks} SKS
                </td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <span style={{
                    backgroundColor: m.status ? "#e6f4ea" : "#fce8e6",
                    color: m.status ? "#137333" : "#c5221f",
                    padding: "6px 12px",
                    borderRadius: "50px",
                    fontSize: "13px",
                    fontWeight: "600"
                  }}>
                    {m.status ? "Aktif" : "Tidak Aktif"}
                  </span>
                </td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <button 
                    onClick={() => openEditModal(m)} 
                    style={{ backgroundColor: "#fbbf24", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", marginRight: "8px" }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(m.nim)} 
                    style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}