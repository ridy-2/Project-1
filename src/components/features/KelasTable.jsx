import React from "react";

export default function KelasTable({ kelas, openEditModal, onDelete, dosen = [], mataKuliah = [] }) {
  return (
    <div style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2563eb", color: "#fff" }}>
            <th style={{ padding: "15px", textAlign: "left", borderTopLeftRadius: "8px" }}>Kode</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Nama Kelas</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Dosen Pengampu</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Mata Kuliah</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Ruang</th>
            <th style={{ padding: "15px", textAlign: "center" }}>Mahasiswa</th>
            <th style={{ padding: "15px", textAlign: "center", borderTopRightRadius: "8px" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelas.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ padding: "25px", textAlign: "center", color: "#64748b" }}>Tidak ada data kelas.</td>
            </tr>
          ) : (
            kelas.map((k) => {
              const dsn = dosen.find((d) => d.nidn === k.nidn);
              const mk = mataKuliah.find((m) => m.kode === k.matakuliahKode);

              return (
                <tr key={k.kode} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "15px", fontFamily: "monospace", color: "#2563eb", fontWeight: "600" }}>{k.kode}</td>
                  <td style={{ padding: "15px", fontWeight: "500", color: "#1e293b" }}>{k.nama}</td>
                  <td style={{ padding: "15px" }}>
                    <div style={{ fontWeight: "600", color: "#1e293b" }}>{dsn ? dsn.nama : "Tidak Diketahui"}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>NIDN: {k.nidn}</div>
                  </td>
                  <td style={{ padding: "15px" }}>
                    <div style={{ fontWeight: "600", color: "#1e293b" }}>{mk ? mk.nama : "Tidak Diketahui"}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>Kode: {k.matakuliahKode} ({mk ? mk.sks : 0} SKS)</div>
                  </td>
                  <td style={{ padding: "15px", color: "#475569" }}>{k.ruang}</td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <span style={{
                      backgroundColor: "#e0e7ff",
                      color: "#4338ca",
                      padding: "4px 12px",
                      borderRadius: "50px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      {k.mahasiswaNims?.length || 0} Orang
                    </span>
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button
                      onClick={() => openEditModal(k)}
                      style={{ backgroundColor: "#fbbf24", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", marginRight: "8px", fontWeight: "600" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(k.kode)}
                      style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
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

