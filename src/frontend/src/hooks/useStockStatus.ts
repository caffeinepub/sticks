import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ProductId } from '../backend';

export function useStockStatus(productId: ProductId) {
  const { actor, isFetching } = useActor();

  const query = useQuery({
    queryKey: ['stockStatus', productId.toString()],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.getStockStatus(productId);
      } catch (error) {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });

  return {
    stockStatus: query.data ?? false,
    isLoading: query.isLoading,
    error: query.error,
  };
}
