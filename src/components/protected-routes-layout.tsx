import { Header } from '@/components/header';
import { Outlet } from 'react-router-dom';

export const ProtectedRoutesLayout = () => {
  return (
    <>
      <Header />
      <article className="flex-1 p-20">
        <Outlet />
      </article>
    </>
  );
};
