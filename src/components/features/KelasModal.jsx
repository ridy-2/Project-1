import React, { useState, useEffect } from "react";
import { confirmSave } from "../../helpers/swal";
import { toastError } from "../../helpers/toast";

export default function KelasModal({ 
  isModalOpen, 
  onClose, 
  onSubmit, 
  selectedKelas, 
  dosen = [], 
  mataKuliah = [], 
  mahasiswa = [], 
  allKelas = [] 
}) {
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    nidn: "",
    matakuliahKode: "",
    ruang: "",
    mahasiswaNims: []
  });

  useEffect(() => {
    if (selectedKelas) {
      setForm({
        ...selectedKelas,
        mahasiswaNims: selectedKelas.mahasiswaNims || []
      });
    } else {
      // Find first active dosen and matakuliah for defaults
      const defaultDosen = dosen.find(d => d.status === true)?.nidn || "";
      const defaultMk = mataKuliah[0]?.kode || "";
      setForm({ 
        kode: "", 
        nama: "", 
        nidn: defaultDosen, 
        matakuliahKode: defaultMk, 
        ruang: "", 
        mahasiswaNims: [] 
      });
    }
  }, [selectedKelas, isModalOpen, dosen, mataKuliah]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleStudentCheckboxChange = (nim, checked) => {
    let updatedNims = [...(form.mahasiswaNims || [])];
    if (checked) {
      if (!updatedNims.includes(nim)) {
        updatedNims.push(nim);
      }
    } else {
      updatedNims = updatedNims.filter(id => id !== nim);
    }
    setForm({ ...form, mahasiswaNims: updatedNims });
  };

  // Calculate enrolled SKS for a student (excluding current class)
  const getStudentSks = (nim) => {
    return allKelas
      .filter(k => k.mahasiswaNims?.includes(nim) && k.kode !== form.kode)
      .reduce((acc, k) => {
        const mk = mataKuliah.find(m => m.kode === k.matakuliahKode);
        return acc + (mk ? Number(mk.sks) : 0);
      }, 0);
  };

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    if (!form.kode || !form.nama || !form.nidn || !form.matakuliahKode || !form.ruang) {
      toastError("Semua field wajib diisi!");
      return;
    }

    const selectedMkItem = mataKuliah.find(m => m.kode === form.matakuliahKode);
    const currentClassSks = selectedMkItem ? Number(selectedMkItem.sks) : 0;

    // Constraint 1: 1 MK hanya boleh ada 1 Dosen across all classes
    const duplicateMkClass = allKelas.find(k => k.matakuliahKode === form.matakuliahKode && k.kode !== form.kode);
    if (duplicateMkClass && duplicateMkClass.nidn !== form.nidn) {
      const assignedDosen = dosen.find(d => d.nidn === duplicateMkClass.nidn);
      toastError(
        `Mata Kuliah "${selectedMkItem?.nama || form.matakuliahKode}" sudah diajar oleh Dosen "${
          assignedDosen ? assignedDosen.nama : duplicateMkClass.nidn
        }" di kelas lain (${duplicateMkClass.kode}).`
      );
      return;
    }

    // Constraint 2: Dosen Max SKS
    const dosenCurrentSks = allKelas
      .filter(k => k.nidn === form.nidn && k.kode !== form.kode)
      .reduce((acc, k) => {
        const mk = mataKuliah.find(m => m.kode === k.matakuliahKode);
        return acc + (mk ? Number(mk.sks) : 0);
      }, 0);

    const selDsnObj = dosen.find(d => d.nidn === form.nidn);
    const maxDsnSks = selDsnObj ? (selDsnObj.maxSks || 12) : 12;

    if (dosenCurrentSks + currentClassSks > maxDsnSks) {
      toastError(
        `Dosen "${selDsnObj?.nama || form.nidn}" melebihi batas maksimal SKS mengajar (${maxDsnSks} SKS). Total saat ini: ${dosenCurrentSks} SKS. Pengajaran baru ini: ${currentClassSks} SKS.`
      );
      return;
    }

    // Constraint 3: Mahasiswa Max SKS
    for (const nim of form.mahasiswaNims) {
      const mhsObj = mahasiswa.find(m => m.nim === nim);
      const maxMhsSks = mhsObj ? (mhsObj.maxSks || 24) : 24;
      const mhsCurrentSks = getStudentSks(nim);

      if (mhsCurrentSks + currentClassSks > maxMhsSks) {
        toastError(
          `Mahasiswa "${mhsObj?.nama || nim}" melebihi batas maksimal SKS belajar (${maxMhsSks} SKS). Total saat ini: ${mhsCurrentSks} SKS. Pengambilan baru ini: ${currentClassSks} SKS.`
        );
        return;
      }
    }

    const result = await confirmSave();
    if (result.isConfirmed) {
      onSubmit(form);
      onClose();
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    boxSizing: "border-box",
    backgroundColor: "#fff"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "480px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginTop: 0, color: "#1e293b", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px", marginBottom: "20px" }}>
          {selectedKelas ? "🖊️ Edit Data Kelas" : "➕ Tambah Data Kelas"}
        </h3>

        <form onSubmit={handleLocalSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={labelStyle}>Kode Kelas</label>
            <input
              name="kode"
              placeholder="Contoh: K01"
              value={form.kode}
              onChange={handleChange}
              style={inputStyle}
              disabled={!!selectedKelas}
            />
          </div>

          <div>
            <label style={labelStyle}>Nama Kelas</label>
            <input
              name="nama"
              placeholder="Masukkan nama kelas"
              value={form.nama}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Mata Kuliah</label>
            <select
              name="matakuliahKode"
              value={form.matakuliahKode}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">-- Pilih Mata Kuliah --</option>
              {mataKuliah.map((m) => (
                <option key={m.kode} value={m.kode}>
                  {m.nama} (Kode: {m.kode}, {m.sks} SKS)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Dosen Pengampu (Hanya Dosen Aktif)</label>
            <select
              name="nidn"
              value={form.nidn}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">-- Pilih Dosen --</option>
              {dosen
                .filter((d) => d.status === true)
                .map((d) => (
                  <option key={d.nidn} value={d.nidn}>
                    {d.nama} (NIDN: {d.nidn}, Max SKS: {d.maxSks || 12})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Ruang / Lokasi</label>
            <input
              name="ruang"
              placeholder="Contoh: Lab Komputer 1"
              value={form.ruang}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Pilih Mahasiswa Kelas (Hanya Mahasiswa Aktif)</label>
            <div style={{
              maxHeight: "150px",
              overflowY: "auto",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              backgroundColor: "#fff"
            }}>
              {mahasiswa.filter(m => m.status === true).length === 0 ? (
                <span style={{ fontSize: "13px", color: "#94a3b8", fontStyle: "italic" }}>Tidak ada mahasiswa aktif</span>
              ) : (
                mahasiswa
                  .filter(m => m.status === true)
                  .map((m) => {
                    const studentSks = getStudentSks(m.nim);
                    const maxSks = m.maxSks || 24;
                    const isEnrolled = form.mahasiswaNims?.includes(m.nim);
                    return (
                      <label key={m.nim} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer", color: "#1e293b" }}>
                        <input
                          type="checkbox"
                          checked={isEnrolled}
                          onChange={(e) => handleStudentCheckboxChange(m.nim, e.target.checked)}
                        />
                        <span>{m.nama} (NIM: {m.nim}) - <strong style={{ color: "#2563eb" }}>{studentSks} / {maxSks} SKS</strong></span>
                      </label>
                    );
                  })
              )}
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
