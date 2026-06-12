// src/components/RoleProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

/**
 * RoleProtectedRoute - hanya izinkan pengguna dengan role tertentu masuk.
 * Props:
 *   allowedRoles: string[] - contoh ['Admin']
 */
const RoleProtectedRoute = ({ allowedRoles = [] }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const role = currentUser?.role;

  if (!role) {
    // Belum login sama sekali
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Sudah login tapi role tidak diizinkan → arahkan ke halaman user
    return <Navigate to="/user-dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
