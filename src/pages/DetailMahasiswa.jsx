import { useParams, useNavigate } from 'react-router-dom';
import { useMahasiswaDetail } from '../utils/useMahasiswa';
import { useKelasList } from '../utils/useKelas';
import { useMataKuliahList } from '../utils/useMataKuliah';

const DetailMahasiswa = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const { data: mhs, isLoading: isMhsLoading } = useMahasiswaDetail(id);
  const { data: kelas = [], isLoading: isKelasLoading } = useKelasList();
  const { data: mk = [], isLoading: isMkLoading } = useMataKuliahList();

  const isLoading = isMhsLoading || isKelasLoading || isMkLoading;

  const getEnrolledSks = () => {
    if (!mhs) return 0;
    return kelas
      .filter(k => k.mahasiswaNims?.includes(mhs.nim))
      .reduce((acc, k) => {
        const item = mk.find(m => m.kode === k.matakuliahKode);
        return acc + (item ? Number(item.sks) : 0);
      }, 0);
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", maxWidth: "550px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", marginBottom: "20px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>
        Detail Informasi Mahasiswa
      </h2>
      
      {isLoading ? (
        <div style={{ color: "#64748b" }}>Memuat detail...</div>
      ) : mhs ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontSize: "16px", color: "#475569" }}>
            <strong style={{ color: "#1e293b" }}>NIM:</strong> 
            <span style={{ marginLeft: "10px", fontFamily: "monospace", color: "#2563eb", fontWeight: "600" }}>{mhs.nim}</span>
          </p>
          <p style={{ fontSize: "16px", color: "#475569" }}>
            <strong style={{ color: "#1e293b" }}>Nama:</strong> 
            <span style={{ marginLeft: "10px" }}>{mhs.nama}</span>
          </p>
          <p style={{ fontSize: "16px", color: "#475569" }}>
            <strong style={{ color: "#1e293b" }}>Total SKS Diambil:</strong> 
            <span style={{ marginLeft: "10px", fontWeight: "600", color: "#2563eb" }}>
              {getEnrolledSks()} / {mhs.maxSks || 24} SKS
            </span>
          </p>
          <p style={{ fontSize: "16px", color: "#475569", display: "flex", alignItems: "center" }}>
            <strong style={{ color: "#1e293b" }}>Status:</strong> 
            <span style={{
              marginLeft: "10px",
              backgroundColor: mhs.status ? "#e6f4ea" : "#fce8e6",
              color: mhs.status ? "#137333" : "#c5221f",
              padding: "4px 12px",
              borderRadius: "50px",
              fontSize: "13px",
              fontWeight: "600"
            }}>
              {mhs.status ? "Aktif" : "Tidak Aktif"}
            </span>
          </p>
        </div>
      ) : (
        <div style={{ color: "#ef4444" }}>Mahasiswa tidak ditemukan.</div>
      )}


      <button 
        onClick={() => navigate('/admin')}
        style={{ marginTop: "24px", backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
      >
        ← Kembali ke Daftar Mahasiswa
      </button>
    </div>
  );
};

export default DetailMahasiswa;