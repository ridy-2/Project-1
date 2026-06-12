import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthApi from "../api/AuthApi";
import { toastSuccess, toastError } from "../helpers/toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toastError("Semua field wajib diisi!");
      return;
    }

    if (password !== confirmPassword) {
      toastError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    setLoading(true);
    try {
      await AuthApi.register(name, email, password);
      toastSuccess("Registrasi berhasil! Silakan login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errMsg = err.message || "Registrasi gagal!";
      toastError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "#fff", borderRadius: "12px", padding: "40px",
      width: "380px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", color: "#1d4ed8", marginBottom: "28px" }}>Daftar Akun</h2>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#374151", fontWeight: "600" }}>Nama Lengkap</label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#374151", fontWeight: "600" }}>Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#374151", fontWeight: "600" }}>Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#374151", fontWeight: "600" }}>Konfirmasi Password</label>
          <input
            type="password"
            placeholder="Ulangi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px", width: "100%", padding: "12px",
            backgroundColor: loading ? "#93c5fd" : "#1d4ed8", color: "#fff",
            border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600", fontSize: "15px", transition: "background-color 0.2s"
          }}
        >
          {loading ? "Mendaftar..." : "Daftar"}
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#6b7280" }}>
        Sudah punya akun? <Link to="/login" style={{ color: "#1d4ed8", textDecoration: "none", fontWeight: "600" }}>Login</Link>
      </p>
    </div>
  );
}
