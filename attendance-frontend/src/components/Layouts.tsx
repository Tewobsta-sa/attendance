import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';
  const isRecorder = user?.role?.includes('attendance_recorder');
  const isStudent = user?.role === 'student';
  const isManager = user?.role === 'student_data_manager';
  const isSuper = user?.role === 'super_user';

  const links = [];

  if (isAdmin) {
    links.push(
      { to: '/scanner', label: 'QR Scanner' },
      { to: '/attendance', label: 'All Records' },
      { to: '/summary', label: 'Reports' },
      { to: '/import', label: 'Import Students' },
      { to: '/export', label: 'Export Attendance' }
    );
  }

  if (isRecorder) {
    links.push(
      { to: '/scanner', label: 'QR Scanner' },
      { to: '/attendance', label: 'My Students' }
    );
  }

  if (isManager || isSuper) {
    links.push(
      { to: '/attendance', label: 'All Records' },
      { to: '/summary', label: 'Reports' },
      { to: '/export', label: 'Export Attendance' },
      ...(isManager ? [{ to: '/import', label: 'Import Students' }] : [])
    );
  }

  if (isStudent) {
    links.push({ to: '/my-attendance', label: 'My Attendance' });
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white shadow px-4 py-3 flex items-center justify-between border-b">
        <div className="text-xl font-bold text-blue-700">Attendance System</div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
            ☰
          </button>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-sm text-gray-600">👤 {user?.username || user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`w-64 bg-gray-100 p-4 space-y-2 border-r hidden md:block`}>
          {links.map((link, i) => (
            <Link key={i} to={link.to} className="block hover:text-blue-600">
              {link.label}
            </Link>
          ))}
        </aside>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <aside className="md:hidden bg-gray-100 border-b px-4 py-2">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="block py-1 text-sm border-b last:border-b-0 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="text-red-600 text-sm mt-2"
            >
              Logout
            </button>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
