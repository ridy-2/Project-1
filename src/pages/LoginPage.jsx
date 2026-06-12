import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "../components/molecules/Form";
import AuthApi from "../api/AuthApi";
import { toastSuccess, toastError } from "../helpers/toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!email || !password) {
      toastError("Email dan password wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const data = await AuthApi.login(email, password);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      toastSuccess("Login berhasil! Selamat datang.");
      const role = data.user?.role;
      const destination = role === 'Admin' ? '/dashboard' : '/user-dashboard';
      setTimeout(() => navigate(destination), 1500); // beri waktu toast tampil
    } catch (err) {
      const errMsg = err.message || "Login gagal! Kredensial tidak valid.";
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
      <h2 style={{ textAlign: "center", color: "#1d4ed8", marginBottom: "28px" }}>Login</h2>
      <Form onSubmit={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#6b7280" }}>
        Belum punya akun? <Link to="/register" style={{ color: "#1d4ed8", textDecoration: "none", fontWeight: "600" }}>Daftar</Link>
      </p>
    </div>
  );
}