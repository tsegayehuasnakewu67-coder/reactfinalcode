import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner fullScreen />;
  if (!user) return <Navigate to="/login" replace />;

  const allowedRoles = Array.isArray(role) ? role : [role].filter(Boolean);
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    const home = user.role === 'admin' ? '/admin' : user.role === 'hr' ? '/hr' : '/me';
    return <Navigate to={home} replace />;
  }

  return <Outlet />;
}
