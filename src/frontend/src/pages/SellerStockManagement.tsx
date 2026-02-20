import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSellerAuth } from '../hooks/useSellerAuth';
import { useStockStatus } from '../hooks/useStockStatus';
import { useStockManagement } from '../hooks/useStockManagement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Package, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PRODUCT_ID = BigInt(1);

export default function SellerStockManagement() {
  const { isAuthenticated } = useSellerAuth();
  const navigate = useNavigate();
  const { stockStatus, isLoading: isLoadingStock } = useStockStatus(PRODUCT_ID);
  const { updateStock, isPending } = useStockManagement();
  const [localStockStatus, setLocalStockStatus] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/seller/login' });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (stockStatus !== undefined) {
      setLocalStockStatus(stockStatus);
    }
  }, [stockStatus]);

  const handleStockToggle = async (checked: boolean) => {
    setLocalStockStatus(checked);

    try {
      await updateStock({
        product: { id: PRODUCT_ID, name: 'Stick' },
        inStock: checked,
      });

      toast.success(checked ? 'Stock marked as available' : 'Stock marked as unavailable', {
        description: checked
          ? 'Customers can now place orders'
          : 'Customer orders are now disabled',
      });
    } catch (error) {
      setLocalStockStatus(!checked);
      toast.error('Failed to update stock status', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-orange-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-8 w-8 text-orange-600" />
            <CardTitle className="text-3xl text-orange-900">Stock Management</CardTitle>
          </div>
          <CardDescription className="text-base">
            Control product availability for customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoadingStock ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          ) : (
            <>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="stock-toggle" className="text-lg font-semibold text-orange-900">
                      Stock Availability
                    </Label>
                    <p className="text-sm text-orange-700">
                      {localStockStatus
                        ? 'Customers can place orders'
                        : 'Customer orders are disabled'}
                    </p>
                  </div>
                  <Switch
                    id="stock-toggle"
                    checked={localStockStatus}
                    onCheckedChange={handleStockToggle}
                    disabled={isPending}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white border border-orange-200 rounded-lg">
                  <span className="font-medium text-orange-900">Current Status:</span>
                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      localStockStatus
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {localStockStatus ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> When stock is marked as unavailable, customers will see
                    a red indicator on the order page and won't be able to place orders.
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
