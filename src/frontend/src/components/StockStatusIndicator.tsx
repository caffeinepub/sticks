import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface StockStatusIndicatorProps {
  isLoading: boolean;
  inStock: boolean;
}

export default function StockStatusIndicator({ isLoading, inStock }: StockStatusIndicatorProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
        <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        <span className="font-medium text-gray-700">Checking stock availability...</span>
      </div>
    );
  }

  if (!inStock) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
        <AlertCircle className="h-6 w-6 text-red-600" />
        <div>
          <p className="font-bold text-red-900">Out of Stock</p>
          <p className="text-sm text-red-700">Orders are currently unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
      <CheckCircle className="h-6 w-6 text-green-600" />
      <div>
        <p className="font-bold text-green-900">In Stock</p>
        <p className="text-sm text-green-700">Ready to accept orders</p>
      </div>
    </div>
  );
}
