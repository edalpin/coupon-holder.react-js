import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useSessionValidator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/campaigns', { replace: true });
  }, [user, navigate]);
};
