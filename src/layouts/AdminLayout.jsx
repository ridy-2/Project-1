// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/organisms/Sidebar';
import Header from '../components/organisms/Header';

const AdminLayout = () => {
  return (
    <div className="admin-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header title="Dashboard Admin" />
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet /> {/* Konten Dashboard/AdminPage akan muncul di sini */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;