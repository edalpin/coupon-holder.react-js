import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { authService } from '@/services/auth';
import { useAuth } from '@/hooks/use-auth';

const UserInfo = () => {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="text-2xl font-bold">Hi {user?.displayName}</h1>
      <p className="text-sm text-gray-500">
        <b>Last login:</b> {user?.metadata.lastSignInTime}
      </p>
    </section>
  );
};

const LogoutButton = () => {
  return (
    <Button variant="outline" onClick={authService.signOut}>
      <LogOut />
    </Button>
  );
};

export const Header = () => {
  return (
    <header className="w-full h-16 bg-white shadow-md flex items-center justify-between px-20">
      <UserInfo />
      <LogoutButton />
    </header>
  );
};
