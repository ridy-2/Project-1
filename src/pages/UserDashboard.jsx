import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmLogout } from "../helpers/swal";
import api from "../helpers/api";

export default function UserDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const [matakuliah, setMatakuliah] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mkRes, kelasRes] = await Promise.all([
          api.get("/matakuliah"),
          api.get("/kelas"),
        ]);
        setMatakuliah(mkRes.data);
        setKelas(kelasRes.data);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    const result = await confirmLogout();
    if (result.isConfirmed) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("currentUser");
      navigate("/login");
    }
  };

  const roleColors = {
    Editor: { bg: "#ede9fe", text: "#7c3aed", border: "#8b5cf6" },
    Viewer: { bg: "#dbeafe", text: "#1d4ed8", border: "#3b82f6" },
    User: { bg: "#dcfce7", text: "#15803d", border: "#22c55e" },
  };
  const roleStyle = roleColors[currentUser.role] || roleColors["User"];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: "700", fontSize: "16px"
          }}>
            A
          </div>
          <span style={{ fontWeight: "700", fontSize: "18px", color: "#1e293b" }}>AkademikApp</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontWeight: "600", color: "#1e293b", fontSize: "14px" }}>{currentUser.name || "User"}</p>
            <span style={{
              display: "inline-block",
              fontSize: "11px", fontWeight: "600", padding: "2px 10px",
              borderRadius: "20px", background: roleStyle.bg, color: roleStyle.text,
              border: `1px solid ${roleStyle.border}`
            }}>{currentUser.role}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 18px", background: "#ef4444", color: "#fff",
              border: "none", borderRadius: "8px", cursor: "pointer",
              fontWeight: "600", fontSize: "13px"
            }}
          >
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Welcome banner */}
        <div style={{
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          borderRadius: "20px", padding: "36px 40px",
          color: "#fff", marginBottom: "36px",
          boxShadow: "0 8px 32px rgba(37,99,235,0.25)"
        }}>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "700" }}>
            👋 Selamat Datang, {currentUser.name || "User"}!
          </h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: "15px" }}>
            Anda masuk sebagai <strong>{currentUser.role}</strong>. Berikut informasi akademik yang tersedia untukmu.
          </p>
          <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {(currentUser.permissions || []).map(p => (
              <span key={p} style={{
                background: "rgba(255,255,255,0.2)", borderRadius: "20px",
                padding: "4px 14px", fontSize: "12px", fontWeight: "600",
                backdropFilter: "blur(4px)"
              }}>✓ {p}</span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "36px" }}>
          {[
            { label: "Total Mata Kuliah", value: matakuliah.length, icon: "📚", color: "#2563eb" },
            { label: "Total Kelas", value: kelas.length, icon: "🏛️", color: "#7c3aed" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} style={{
              background: "#fff", borderRadius: "14px", padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              borderLeft: `5px solid ${color}`,
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div>
                <p style={{ margin: 0, color: "#64748b", fontSize: "13px", fontWeight: "600" }}>{label}</p>
                <h2 style={{ margin: "6px 0 0 0", fontSize: "32px", fontWeight: "700", color: "#1e293b" }}>
                  {loading ? "..." : value}
                </h2>
              </div>
              <span style={{ fontSize: "36px" }}>{icon}</span>
            </div>
          ))}
        </div>

        {/* Mata Kuliah list */}
        <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "700", color: "#1e293b" }}>📚 Daftar Mata Kuliah</h2>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#64748b" }}>Informasi mata kuliah yang tersedia di sistem.</p>
          </div>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>Memuat data...</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Kode MK", "Nama Mata Kuliah", "SKS", "Semester"].map(h => (
                    <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matakuliah.slice(0, 10).map((mk, i) => (
                  <tr key={mk.id} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                    <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: "600", color: "#3b82f6" }}>{mk.kode || mk.id}</td>
                    <td style={{ padding: "14px 20px", fontSize: "14px", fontWeight: "500", color: "#1e293b" }}>{mk.nama}</td>
                    <td style={{ padding: "14px 20px", fontSize: "14px", color: "#475569" }}>{mk.sks} SKS</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        background: "#eff6ff", color: "#1d4ed8", padding: "3px 10px",
                        borderRadius: "20px", fontSize: "12px", fontWeight: "600"
                      }}>Sem {mk.semester}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
