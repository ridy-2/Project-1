import { NavLink, useNavigate } from 'react-router-dom';
import { confirmLogout } from '../../helpers/swal';

const Sidebar = () => {
  const navigate = useNavigate();

  const currentLoggedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const canManageUsers = currentLoggedUser.role === 'Admin' || 
    (Array.isArray(currentLoggedUser.permissions) && currentLoggedUser.permissions.includes('Manage Users'));

  const handleLogout = async () => {
    const result = await confirmLogout();
    if (result.isConfirmed) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? '#000000' : '#ffffff',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 15px',
    borderRadius: '8px',
    backgroundColor: isActive ? '#ffffff' : 'transparent',
    marginBottom: '5px',
    cursor: 'pointer',
  });

  return (
    <aside style={{ 
      width: '260px', 
      backgroundColor: '#3b82f6', 
      color: '#fff', 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      flexShrink: 0,
      borderRadius: '24px',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '25px 20px', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #1e293b', textAlign: 'center' }}>
        Admin
      </div>
      <div style={{ padding: '15px' }}>
        <p style={{ color: '#ffffff', fontSize: '11px', fontWeight: 'bold', marginLeft: '10px', marginBottom: '15px' }}>MAIN MENU</p>
        <NavLink to="/dashboard" style={navLinkStyle}>🏠 Dashboard</NavLink>
        <NavLink to="/admin" style={navLinkStyle}>🎓 Mahasiswa</NavLink>
        <NavLink to="/dosen" style={navLinkStyle}>👨‍🏫 Dosen</NavLink>
        <NavLink to="/matakuliah" style={navLinkStyle}>📚 Mata Kuliah</NavLink>
        <NavLink to="/kelas" style={navLinkStyle}>🏛️ Kelas</NavLink>
        {canManageUsers && (
          <NavLink to="/users" style={navLinkStyle}>👥 Users</NavLink>
        )}
      </div>
      <div style={{ marginTop: 'auto', padding: '20px' }}>
        <button
          onClick={handleLogout}
          style={{ width: '100%', padding: '10px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          🚪 Logout
        </button>
        <p style={{ fontSize: '11px', color: '#ffffff', textAlign: 'center', marginTop: '12px' }}>© 2025 Admin Dashboard</p>
      </div>
    </aside>
  );
};

export default Sidebar;
