import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

export const ProtectedUserRoutes = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to={'/signin'} replace />;
  return <Outlet />;
};
