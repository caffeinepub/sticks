import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { OrderId } from '../backend';

export function useCompleteOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (orderId: OrderId) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.completeOrder(orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    completeOrder: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
