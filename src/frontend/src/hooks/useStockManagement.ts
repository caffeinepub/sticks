import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product } from '../backend';

export function useStockManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ product, inStock }: { product: Product; inStock: boolean }) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.addOrUpdateStockItem(product, inStock);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockStatus'] });
    },
  });

  return {
    updateStock: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
