import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CouponHolderRoutes } from './routes/routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/auth';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <section className="w-full min-h-screen p-20 bg-gradient-to-r from-rose-100 to-teal-100">
          <CouponHolderRoutes />
        </section>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
