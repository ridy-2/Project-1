import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Mahasiswa from './pages/Mahasiswa';
import DetailMahasiswa from './pages/DetailMahasiswa';
import Dosen from './pages/Dosen';
import MataKuliah from './pages/MataKuliah';
import Kelas from './pages/Kelas';
import UserManagement from './pages/UserManagement';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Auth pages (login, register) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Admin-only pages — hanya role Admin yang bisa masuk */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleProtectedRoute allowedRoles={['Admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/admin" element={<Mahasiswa />} />
              <Route path="/admin/:id" element={<DetailMahasiswa />} />
              <Route path="/dosen" element={<Dosen />} />
              <Route path="/matakuliah" element={<MataKuliah />} />
              <Route path="/kelas" element={<Kelas />} />
              <Route path="/users" element={<UserManagement />} />
            </Route>
          </Route>
        </Route>

        {/* User dashboard — semua role yang sudah login bisa masuk */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;