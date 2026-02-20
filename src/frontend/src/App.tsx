import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, useNavigate } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import CustomerLogin from './pages/CustomerLogin';
import CustomerOrderForm from './pages/CustomerOrderForm';
import SellerLogin from './pages/SellerLogin';
import SellerSignup from './pages/SellerSignup';
import SellerDashboard from './pages/SellerDashboard';
import SellerStockManagement from './pages/SellerStockManagement';
import LandingPage from './pages/LandingPage';
import CustomerLayout from './components/CustomerLayout';
import SellerLayout from './components/SellerLayout';
import { SellerAuthProvider } from './contexts/SellerAuthContext';

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SellerAuthProvider>
        <Outlet />
        <Toaster />
      </SellerAuthProvider>
    </ThemeProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const customerLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/login',
  component: CustomerLogin,
});

const customerOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer/order',
  component: () => (
    <CustomerLayout>
      <CustomerOrderForm />
    </CustomerLayout>
  ),
});

const sellerLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/seller/login',
  component: SellerLogin,
});

const sellerSignupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/seller/signup',
  component: SellerSignup,
});

const sellerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/seller/dashboard',
  component: () => (
    <SellerLayout>
      <SellerDashboard />
    </SellerLayout>
  ),
});

const sellerStockRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/seller/stock',
  component: () => (
    <SellerLayout>
      <SellerStockManagement />
    </SellerLayout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  customerLoginRoute,
  customerOrderRoute,
  sellerLoginRoute,
  sellerSignupRoute,
  sellerDashboardRoute,
  sellerStockRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
