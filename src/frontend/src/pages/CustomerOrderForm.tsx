import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useStockStatus } from '../hooks/useStockStatus';
import { usePlaceOrder } from '../hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StockStatusIndicator from '../components/StockStatusIndicator';
import { toast } from 'sonner';
import { Loader2, ShoppingCart } from 'lucide-react';

const STICK_PRICE = 14;
const PRODUCT_ID = BigInt(1);

export default function CustomerOrderForm() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);
  const [roomNumber, setRoomNumber] = useState<string>('');

  const { stockStatus, isLoading: isLoadingStock } = useStockStatus(PRODUCT_ID);
  const { placeOrder, isPending } = usePlaceOrder();

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/customer/login' });
    }
  }, [identity, navigate]);

  const totalCost = quantity * STICK_PRICE;
  const isOutOfStock = !stockStatus;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomNumber.trim()) {
      toast.error('Please enter your room number');
      return;
    }

    if (isOutOfStock) {
      toast.error('Product is currently out of stock');
      return;
    }

    try {
      await placeOrder({
        products: [{ id: PRODUCT_ID, name: 'Stick' }],
        quantity: BigInt(quantity),
        roomNumber: roomNumber.trim(),
      });

      toast.success('Order placed successfully!', {
        description: `${quantity} stick(s) ordered for room ${roomNumber}`,
      });

      setQuantity(1);
      setRoomNumber('');
    } catch (error) {
      toast.error('Failed to place order', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  if (!identity) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-amber-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="h-8 w-8 text-amber-600" />
            <CardTitle className="text-3xl text-amber-900">Place Your Order</CardTitle>
          </div>
          <CardDescription className="text-base">
            Select quantity and enter your room number to order sticks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StockStatusIndicator isLoading={isLoadingStock} inStock={stockStatus} />

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-base font-medium text-amber-900">
                Quantity
              </Label>
              <Select
                value={quantity.toString()}
                onValueChange={(value) => setQuantity(parseInt(value))}
                disabled={isOutOfStock}
              >
                <SelectTrigger id="quantity" className="border-amber-300 focus:border-amber-500">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'stick' : 'sticks'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomNumber" className="text-base font-medium text-amber-900">
                Room Number
              </Label>
              <Input
                id="roomNumber"
                type="text"
                placeholder="Enter your room number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                disabled={isOutOfStock}
                className="border-amber-300 focus:border-amber-500"
              />
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-amber-700 font-medium">Price per stick:</span>
                <span className="text-amber-900 font-semibold">₹{STICK_PRICE}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-amber-700 font-medium">Quantity:</span>
                <span className="text-amber-900 font-semibold">{quantity}</span>
              </div>
              <div className="border-t-2 border-amber-300 my-3" />
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-amber-900">Total Cost:</span>
                <span className="text-2xl font-bold text-amber-600">₹{totalCost}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isOutOfStock || isPending || !roomNumber.trim()}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              size="lg"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </Button>

            {isOutOfStock && (
              <p className="text-center text-red-600 font-medium">
                Orders are currently disabled due to stock unavailability
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
