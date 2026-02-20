import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Home } from 'lucide-react';

export default function AccessDeniedScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-red-300 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <ShieldAlert className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-3xl text-red-900">Access Denied</CardTitle>
          <CardDescription className="text-base text-red-700">
            You don't have permission to access this area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 text-center">
              This area is restricted to administrators only. If you believe you should have access, please contact the system administrator.
            </p>
          </div>

          <Button
            onClick={() => navigate({ to: '/' })}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            size="lg"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
