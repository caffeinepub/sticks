import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useAdminCheck';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, LogIn, Loader2 } from 'lucide-react';
import AccessDeniedScreen from '../components/AccessDeniedScreen';

export default function SellerLogin() {
  const { login, identity, isLoggingIn, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: isCheckingAdmin, isFetched } = useIsCallerAdmin();

  const isAuthenticated = !!identity && loginStatus === 'success';

  useEffect(() => {
    if (isAuthenticated && isFetched && isAdmin) {
      navigate({ to: '/seller/dashboard' });
    }
  }, [isAuthenticated, isAdmin, isFetched, navigate]);

  if (isAuthenticated && isFetched && isAdmin === false) {
    return <AccessDeniedScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-orange-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <BarChart3 className="h-12 w-12 text-orange-600" />
            </div>
          </div>
          <CardTitle className="text-3xl text-orange-900">Seller Login</CardTitle>
          <CardDescription className="text-base">
            Sign in to manage orders and inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={login}
            disabled={isLoggingIn || isAuthenticated}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            size="lg"
          >
            {isLoggingIn || (isAuthenticated && isCheckingAdmin) ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {isLoggingIn ? 'Connecting...' : 'Verifying Access...'}
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" />
                Sign In with Internet Identity
              </>
            )}
          </Button>

          <div className="text-center pt-4">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/' })}
              className="text-orange-700 hover:text-orange-900"
            >
              Back to Home
            </Button>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-orange-800 text-center">
              <strong>Note:</strong> Admin access is required to use the seller portal.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
