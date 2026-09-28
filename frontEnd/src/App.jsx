import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import ProtectedRoute   from './components/ProtectedRoute';
import Layout           from './components/Layout';
import Spinner          from './components/Spinner';

import Login            from './pages/Login';
import Signup           from './pages/Signup';
import HomePage         from './pages/HomePage';
import AdminSetup       from './pages/AdminSetup';
import MarkAttendance   from './pages/MarkAttendance';

import AdminDashboard   from './pages/admin/AdminDashboard';
import ManageUsers      from './pages/admin/ManageUsers';
import AttendanceLog    from './pages/admin/AttendanceLog';
import AttendanceReports from './pages/admin/AttendanceReports';
import Register         from './pages/Register';
import ShiftSettings    from './pages/admin/ShiftSettings';

import UserDashboard    from './pages/user/UserDashboard';
import MyAttendance     from './pages/user/MyAttendance';
import Profile          from './pages/user/Profile';
import HRDashboard      from './pages/hr/HRDashboard';
import Employees        from './pages/admin/Employees';
import Notifications    from './pages/Notifications';
import LeaveManagement  from './pages/LeaveManagement';

export default function App() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner fullScreen />;

  const home = user ? (user.role === 'admin' ? '/admin' : user.role === 'hr' ? '/hr' : '/me') : '/';

  return (
    <Routes>
      {/* ── Public ──────────────────────────────────────────── */}
      <Route path="/"        element={user ? <Navigate to={home} replace /> : <HomePage page="home" />} />
      <Route path="/features" element={user ? <Navigate to={home} replace /> : <HomePage page="features" />} />
      <Route path="/project"  element={user ? <Navigate to={home} replace /> : <HomePage page="project" />} />
      <Route path="/contact"  element={user ? <Navigate to={home} replace /> : <HomePage page="contact" />} />
      <Route path="/login"   element={user ? <Navigate to={home} replace /> : <Login />} />
      <Route path="/signup"  element={user ? <Navigate to={home} replace /> : <Signup />} />
      <Route path="/register" element={user ? <Navigate to={home} replace /> : <Signup />} />
      <Route path="/setup"   element={user ? <Navigate to={home} replace /> : <AdminSetup />} />
      <Route path="/kiosk"   element={<MarkAttendance />} />

      {/* ── Admin ───────────────────────────────────────────── */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<Layout />}>
          <Route path="/admin"            element={<AdminDashboard />} />
          <Route path="/admin/users"      element={<ManageUsers />} />
          <Route path="/admin/logs"       element={<AttendanceLog />} />
          <Route path="/admin/reports"    element={<AttendanceReports />} />
          <Route path="/admin/register"   element={<Register />} />
          <Route path="/admin/settings"   element={<ShiftSettings />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/leaves" element={<LeaveManagement />} />
        </Route>
      </Route>

      {/* ── HR ─────────────────────────────────────────────── */}
      <Route element={<ProtectedRoute role="hr" />}>
        <Route element={<Layout />}>
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/hr/employees" element={<Employees />} />
          <Route path="/hr/attendance" element={<AttendanceLog />} />
          <Route path="/hr/leaves" element={<LeaveManagement />} />
          <Route path="/hr/reports" element={<AttendanceReports />} />
          <Route path="/hr/register" element={<Register />} />
        </Route>
      </Route>

      {/* ── Employee ────────────────────────────────────────── */}
      <Route element={<ProtectedRoute role="employee" />}>
        <Route element={<Layout />}>
          <Route path="/me" element={<UserDashboard />} />
          <Route path="/me/attendance" element={<MyAttendance />} />
          <Route path="/me/profile" element={<Profile />} />
          <Route path="/me/notifications" element={<Notifications />} />
          <Route path="/me/leaves" element={<LeaveManagement />} />
        </Route>
      </Route>

      {/* ── Fallback ────────────────────────────────────────── */}
      <Route path="*" element={<Navigate to={home} replace />} />
    </Routes>
  );
}
