import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { authService } from '@/services/auth';

export const Header = () => {
  return (
    <header className="w-full h-16 bg-white shadow-md flex items-center justify-end px-20">
      <Button variant="outline" onClick={authService.signOut}>
        <LogOut />
      </Button>
    </header>
  );
};
