import { ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSellerAuth } from '../hooks/useSellerAuth';
import { Button } from '@/components/ui/button';
import { BarChart3, LogOut, Package, LayoutDashboard } from 'lucide-react';

interface SellerLayoutProps {
  children: ReactNode;
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  const { logout, email } = useSellerAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
      <header className="border-b border-orange-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-7 w-7 text-orange-600" />
              <h1 className="text-2xl font-bold text-orange-900">StickSmart Seller</h1>
            </div>
            <div className="flex items-center gap-4">
              {email && (
                <span className="text-sm text-orange-700 hidden sm:inline">{email}</span>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <nav className="flex gap-2 mb-6">
          <Button
            onClick={() => navigate({ to: '/seller/dashboard' })}
            variant="outline"
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            onClick={() => navigate({ to: '/seller/stock' })}
            variant="outline"
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <Package className="mr-2 h-4 w-4" />
            Stock Management
          </Button>
        </nav>

        <main>{children}</main>
      </div>

      <footer className="border-t border-orange-200 bg-white/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-orange-700">
            © {new Date().getFullYear()} StickSmart. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'sticksmart'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-900 hover:text-orange-600 font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
