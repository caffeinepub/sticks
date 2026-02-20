import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSellerAuth } from '../hooks/useSellerAuth';
import { useSellerOrders } from '../hooks/useSellerOrders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import OrderListItem from '../components/OrderListItem';
import { Loader2, Package, AlertCircle } from 'lucide-react';

export default function SellerDashboard() {
  const { isAuthenticated } = useSellerAuth();
  const navigate = useNavigate();
  const { orders, isLoading, error } = useSellerOrders();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/seller/login' });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
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
            <div className="flex items-center justify-center py-12 text-red-600">
              <AlertCircle className="h-6 w-6 mr-2" />
              <span>Failed to load orders</span>
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="rounded-md border border-orange-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-orange-50">
                    <TableHead className="font-semibold text-orange-900">Status</TableHead>
                    <TableHead className="font-semibold text-orange-900">Quantity</TableHead>
                    <TableHead className="font-semibold text-orange-900">Room Number</TableHead>
                    <TableHead className="font-semibold text-orange-900">Order Time</TableHead>
                    <TableHead className="font-semibold text-orange-900">Customer</TableHead>
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
              <Package className="h-12 w-12 mx-auto mb-4 text-orange-400" />
              <p className="text-lg font-medium">No orders yet</p>
              <p className="text-sm">Orders will appear here when customers place them</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
