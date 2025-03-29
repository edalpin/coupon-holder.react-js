import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundContent = () => (
  <section
    className="flex flex-col justify-center items-center gap-8 w-full max-w-2xl aspect-[4/3] bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-12"
    role="main"
  >
    <header className="text-center">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900">
        404
      </h1>
      <p className="text-gray-600 mt-4 text-xl sm:text-2xl md:text-3xl font-medium">
        Page Not Found
      </p>
      <p className="text-gray-500 mt-3 text-base sm:text-lg md:text-xl max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </header>
  </section>
);

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main
      className="flex w-full h-full justify-center items-center min-h-[calc(100vh-10rem)]"
      role="region"
      aria-label="Not found page"
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full px-4 sm:px-6">
        <NotFoundContent />
        <Button
          onClick={() => navigate('/')}
          aria-label="Go back to home page"
          className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
        >
          Back to Home
        </Button>
      </div>
    </main>
  );
};
