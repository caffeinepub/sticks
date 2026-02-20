import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useAdminCheck';
import { useSellerOrders } from '../hooks/useSellerOrders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import OrderListItem from '../components/OrderListItem';
import AccessDeniedScreen from '../components/AccessDeniedScreen';
import { Loader2, Package, AlertCircle } from 'lucide-react';

export default function SellerDashboard() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: isCheckingAdmin, isFetched } = useIsCallerAdmin();
  const { orders, isLoading, error } = useSellerOrders();

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/seller/login' });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || isCheckingAdmin) {
    return null;
  }

  if (isFetched && !isAdmin) {
    return <AccessDeniedScreen />;
  }

  const pendingOrders = orders?.filter((order) => !order.isCompleted) || [];
  const completedOrders = orders?.filter((order) => order.isCompleted) || [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{orders?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-700">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900">{pendingOrders.length}</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{completedOrders.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-orange-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-orange-600" />
            <div>
              <CardTitle className="text-2xl text-orange-900">Order Management</CardTitle>
              <CardDescription>View and manage all customer orders</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-red-600">
              <AlertCircle className="h-12 w-12 mb-4" />
              <p className="text-lg font-medium">Failed to load orders</p>
              <p className="text-sm text-red-500 mt-2">
                {error instanceof Error ? error.message : 'Please try again later'}
              </p>
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="rounded-lg border border-orange-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-orange-50 hover:bg-orange-50">
                    <TableHead className="w-12">Done</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Customer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, index) => (
                    <OrderListItem key={index} order={order} orderIndex={index} />
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-orange-700">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No orders yet</p>
              <p className="text-sm mt-2">Orders will appear here once customers start placing them</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
