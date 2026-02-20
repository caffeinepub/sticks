import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSellerAuth } from '../hooks/useSellerAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SellerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, isLoading } = useSellerAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/seller/dashboard' });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please enter both email and password');
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast.success('Login successful!');
      navigate({ to: '/seller/dashboard' });
    } else {
      toast.error('Invalid credentials');
    }
  };

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
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-orange-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seller@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-orange-300 focus:border-orange-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-orange-900">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-orange-300 focus:border-orange-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-orange-700">
              Don't have an account?{' '}
              <Button
                variant="link"
                onClick={() => navigate({ to: '/seller/signup' })}
                className="text-orange-600 hover:text-orange-800 p-0 h-auto font-semibold"
              >
                Sign Up
              </Button>
            </p>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/' })}
              className="text-orange-700 hover:text-orange-900"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
