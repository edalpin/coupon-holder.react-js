import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const SIGN_IN_PATH = '/signin';

export const ProtectedAdminRoutes = () => {
  const { user, isLoading, role } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    // Save the attempted location for redirect after sign in
    return <Navigate to={SIGN_IN_PATH} state={{ from: location }} replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
