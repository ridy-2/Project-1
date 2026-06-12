import React, { useState, useEffect } from "react";
import { confirmSave } from "../../helpers/swal";
import { toastError } from "../../helpers/toast";

export default function MataKuliahModal({ isModalOpen, onClose, onSubmit, selectedMK }) {
  const [form, setForm] = useState({ kode: "", nama: "", sks: 2, semester: 1 });

  useEffect(() => {
    if (selectedMK) {
      setForm(selectedMK);
    } else {
      setForm({ kode: "", nama: "", sks: 2, semester: 1 });
    }
  }, [selectedMK, isModalOpen]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "sks" || name === "semester") {
      const parsed = parseInt(value, 10);
      setForm({ ...form, [name]: isNaN(parsed) ? "" : parsed });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    if (!form.kode || !form.nama || !form.sks || !form.semester) {
      toastError("Semua field wajib diisi!");
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
          {selectedMK ? "🖊️ Edit Mata Kuliah" : "➕ Tambah Mata Kuliah"}
        </h3>

        <form onSubmit={handleLocalSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Kode Mata Kuliah</label>
            <input
              name="kode"
              placeholder="Contoh: MK01"
              value={form.kode}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              disabled={!!selectedMK}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Nama Mata Kuliah</label>
            <input
              name="nama"
              placeholder="Masukkan nama mata kuliah"
              value={form.nama}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>SKS</label>
              <input
                type="number"
                name="sks"
                min="1"
                max="6"
                value={form.sks}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Semester</label>
              <input
                type="number"
                name="semester"
                min="1"
                max="8"
                value={form.semester}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              />
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
