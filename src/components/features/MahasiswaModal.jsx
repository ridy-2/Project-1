import React, { useState, useEffect } from "react";
import { confirmSave } from "../../helpers/swal";
import { toastError } from "../../helpers/toast";

export default function MahasiswaModal({ isModalOpen, onClose, onSubmit, selectedMahasiswa }) {
  const [form, setForm] = useState({ nim: "", nama: "", status: true, maxSks: 24 });

  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        ...selectedMahasiswa,
        maxSks: selectedMahasiswa.maxSks !== undefined ? selectedMahasiswa.maxSks : 24
      });
    } else {
      setForm({ nim: "", nama: "", status: true, maxSks: 24 });
    }
  }, [selectedMahasiswa, isModalOpen]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "maxSks") {
      const parsed = parseInt(value, 10);
      setForm({ ...form, [name]: isNaN(parsed) ? "" : parsed });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleLocalSubmit = async () => {
    if (!form.nim || !form.nama || form.maxSks === "") {
      toastError("Data kurang terisi!");
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
      <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "400px" }}>
        <h3 style={{ marginTop: 0 }}>{selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}</h3>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>NIM</label>
          <input
            name="nim"
            value={form.nim}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
            disabled={!!selectedMahasiswa}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Nama</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Max SKS</label>
          <input
            type="number"
            name="maxSks"
            value={form.maxSks}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Status</label>
          <select
            name="status"
            value={form.status === undefined ? "true" : form.status.toString()}
            onChange={(e) => setForm({ ...form, status: e.target.value === "true" })}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd", backgroundColor: "#fff" }}
          >
            <option value="true">Aktif</option>
            <option value="false">Tidak Aktif</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer" }}>Batal</button>
          <button onClick={handleLocalSubmit} style={{ padding: "10px 20px", borderRadius: "6px", backgroundColor: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}