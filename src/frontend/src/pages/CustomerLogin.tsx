import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, LogIn, Loader2 } from 'lucide-react';
import ProfileSetupModal from '../components/ProfileSetupModal';

export default function CustomerLogin() {
  const { login, identity, isLoggingIn, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity && loginStatus === 'success';
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (isAuthenticated && userProfile !== null && isFetched) {
      navigate({ to: '/customer/order' });
    }
  }, [isAuthenticated, userProfile, isFetched, navigate]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-amber-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <Package className="h-12 w-12 text-amber-600" />
              </div>
            </div>
            <CardTitle className="text-3xl text-amber-900">Customer Login</CardTitle>
            <CardDescription className="text-base">
              Sign in securely to place your stick orders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={login}
              disabled={isLoggingIn || isAuthenticated}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              size="lg"
            >
              {isLoggingIn || (isAuthenticated && profileLoading) ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isLoggingIn ? 'Connecting...' : 'Loading...'}
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
                className="text-amber-700 hover:text-amber-900"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ProfileSetupModal open={showProfileSetup} />
    </>
  );
}
