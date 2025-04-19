import { Outlet } from 'react-router-dom';

export const ProtectedRoutesLayout = () => {
  return (
    <>
      <article className="flex-1 p-5">
        <Outlet />
      </article>
    </>
  );
};
