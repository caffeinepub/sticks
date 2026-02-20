import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useCompleteOrder } from '../hooks/useCompleteOrder';
import type { Order } from '../backend';
import { toast } from 'sonner';

interface OrderListItemProps {
  order: Order;
  orderIndex: number;
}

export default function OrderListItem({ order, orderIndex }: OrderListItemProps) {
  const { completeOrder, isPending } = useCompleteOrder();

  const handleToggleComplete = async (checked: boolean) => {
    if (checked && !order.isCompleted) {
      try {
        await completeOrder(BigInt(orderIndex));
        toast.success('Order marked as completed');
      } catch (error) {
        toast.error('Failed to complete order');
      }
    }
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const formatPrincipal = (principal: string) => {
    if (principal.length <= 12) return principal;
    return `${principal.slice(0, 6)}...${principal.slice(-6)}`;
  };

  return (
    <TableRow
      className={`${
        order.isCompleted ? 'bg-green-50 opacity-60' : 'bg-white hover:bg-orange-50'
      } transition-colors`}
    >
      <TableCell>
        <Checkbox
          checked={order.isCompleted}
          onCheckedChange={handleToggleComplete}
          disabled={order.isCompleted || isPending}
          className="border-orange-400"
        />
      </TableCell>
      <TableCell className={order.isCompleted ? 'line-through text-gray-500' : 'font-medium'}>
        {order.quantity.toString()} {Number(order.quantity) === 1 ? 'stick' : 'sticks'}
      </TableCell>
      <TableCell className={order.isCompleted ? 'line-through text-gray-500' : 'font-semibold text-orange-900'}>
        {order.roomNumber}
      </TableCell>
      <TableCell className={order.isCompleted ? 'line-through text-gray-500' : 'text-orange-700'}>
        {formatTimestamp(order.timestamp)}
      </TableCell>
      <TableCell className={order.isCompleted ? 'line-through text-gray-500' : 'text-orange-600 font-mono text-xs'}>
        {formatPrincipal(order.customer.toString())}
      </TableCell>
    </TableRow>
  );
}
