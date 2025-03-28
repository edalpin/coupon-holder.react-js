import { useSessionValidator } from '../../hooks/use-auth';
import { signInWithGoogle } from '../../services/auth';
import googleIcon from '../../assets/google.svg';
import { Button } from '../../components/ui/button';

export const SignIn = () => {
  useSessionValidator();

  const signIn = () => {
    signInWithGoogle();
  };

  return (
    <section className="flex w-full min-h-screen justify-center items-center">
      <section className="flex flex-col justify-center items-center gap-3 w-full lg:w-1/2 aspect-video bg-white shadow-lg rounded-lg">
        <header className="text-5xl">Welcome</header>
        <Button onClick={signIn}>
          <img className="w-4" src={googleIcon} alt="Google Icon" />
          <span>Continue with Google</span>
        </Button>
      </section>
    </section>
  );
};
