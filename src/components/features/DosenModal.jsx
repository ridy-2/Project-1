import React, { useState, useEffect } from "react";
import { confirmSave } from "../../helpers/swal";
import { toastError } from "../../helpers/toast";

export default function DosenModal({ isModalOpen, onClose, onSubmit, selectedDosen }) {
  const [form, setForm] = useState({ nidn: "", nama: "", email: "", status: true, maxSks: 12 });

  useEffect(() => {
    if (selectedDosen) {
      setForm({
        ...selectedDosen,
        maxSks: selectedDosen.maxSks !== undefined ? selectedDosen.maxSks : 12
      });
    } else {
      setForm({ nidn: "", nama: "", email: "", status: true, maxSks: 12 });
    }
  }, [selectedDosen, isModalOpen]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "maxSks") {
      const parsed = parseInt(value, 10);
      setForm({ ...form, [name]: isNaN(parsed) ? "" : parsed });
    } else {
      setForm({ ...form, [name]: name === "status" ? value === "true" : value });
    }
  };

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    if (!form.nidn || !form.nama || !form.email || form.maxSks === "") {
      toastError("Semua field wajib diisi!");
      return;
    }

    // Quick regex email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      toastError("Format email tidak valid!");
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
          {selectedDosen ? "🖊️ Edit Data Dosen" : "➕ Tambah Data Dosen"}
        </h3>
        
        <form onSubmit={handleLocalSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>NIDN</label>
            <input
              name="nidn"
              placeholder="Masukkan NIDN"
              value={form.nidn}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              disabled={!!selectedDosen}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Nama Dosen</label>
            <input
              name="nama"
              placeholder="Masukkan nama lengkap beserta gelar"
              value={form.nama}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@univ.ac.id"
              value={form.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Max SKS Mengajar</label>
            <input
              type="number"
              name="maxSks"
              placeholder="Contoh: 12"
              value={form.maxSks}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Status Keaktifan</label>
            <select
              name="status"
              value={form.status ? "true" : "false"}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", backgroundColor: "#fff" }}
            >
              <option value="true">Aktif</option>
              <option value="false">Tidak Aktif</option>
            </select>
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
