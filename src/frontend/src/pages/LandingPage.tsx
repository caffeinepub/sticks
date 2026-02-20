import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <header className="border-b border-amber-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-amber-600" />
              <h1 className="text-3xl font-bold text-amber-900">StickSmart</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-900 mb-4">
            Smart Stick Ordering System
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Streamline your stick orders with our easy-to-use platform. Order as a customer or manage inventory as a seller.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-amber-200 hover:border-amber-400 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart className="h-8 w-8 text-amber-600" />
                <CardTitle className="text-2xl text-amber-900">Customer Portal</CardTitle>
              </div>
              <CardDescription className="text-base">
                Place orders quickly and easily. Select quantity, enter your room number, and submit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-amber-700">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Secure authentication
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Real-time stock availability
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Instant order confirmation
                </li>
              </ul>
              <Button
                onClick={() => navigate({ to: '/customer/login' })}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                size="lg"
              >
                Customer Login
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <CardTitle className="text-2xl text-orange-900">Seller Portal</CardTitle>
              </div>
              <CardDescription className="text-base">
                Manage orders, track inventory, and control stock availability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-orange-700">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
                  View all orders in real-time
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
                  Mark orders as completed
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
                  Control stock availability
                </li>
              </ul>
              <Button
                onClick={() => navigate({ to: '/seller/login' })}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                size="lg"
              >
                Seller Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-amber-200 bg-white/80 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-amber-700">
            © {new Date().getFullYear()} StickSmart. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'sticksmart'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-900 hover:text-amber-600 font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
