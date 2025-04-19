//import { useSessionValidator } from '@/hooks/use-auth';
import googleIcon from '@/assets/google.svg';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { authService } from '@/services/auth';
import { Navigate, useLocation } from 'react-router-dom';

const SignInButton = () => (
  <Button
    variant="primary"
    onClick={() => authService.signInWithGoogle()}
    aria-label="Sign in with Google"
  >
    <img className="w-4 h-4" src={googleIcon} alt="" aria-hidden="true" />
    <span>Continue with Google</span>
  </Button>
);

const SignInContent = () => (
  <section
    className="flex flex-col justify-center items-center gap-3 w-full lg:w-1/2 aspect-video bg-white shadow-lg rounded-lg"
    role="main"
  >
    <header>
      <h1 className="text-5xl font-bold">Welcome</h1>
      <p className="text-gray-600 mt-2">Sign in to access your campaigns</p>
    </header>
    <SignInButton />
  </section>
);

export const SignIn = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (user) {
    // Get the intended destination from location state, or default to campaigns
    const from = (location.state as { from?: string })?.from || '/campaigns';
    return <Navigate to={from} replace />;
  }

  return (
    <main
      className="flex w-full h-full justify-center items-center min-h-[calc(100vh-10rem)]"
      role="region"
      aria-label="Sign in page"
    >
      <SignInContent />
    </main>
  );
};
