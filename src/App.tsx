import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/contexts/auth';
import { CouponHolderRoutes } from '@/routes/routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <section
    className="w-full min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 flex flex-col"
    role="main"
  >
    {children}
  </section>
);

const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </AuthProvider>
);

function App() {
  return (
    <AppProviders>
      <AppLayout>
        <CouponHolderRoutes />
      </AppLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProviders>
  );
}

export default App;
