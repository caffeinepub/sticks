import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Order } from '../backend';

export function useSellerOrders() {
  const { actor, isFetching } = useActor();

  const query = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!actor) return [];
      const orders = await actor.getAllCurrentOrders();
      return orders.sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });

  return {
    orders: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
