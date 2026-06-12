// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Kita cek apakah ada 'userToken' di localStorage
  const isAuthenticated = localStorage.getItem('userToken');

  // Jika ada token (sudah login), tampilkan halaman anak (Outlet)
  // Jika tidak ada, alihkan ke halaman /login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;