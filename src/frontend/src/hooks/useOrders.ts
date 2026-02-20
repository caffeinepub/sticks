import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Quantity, RoomNumber } from '../backend';

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      products,
      quantity,
      roomNumber,
    }: {
      products: Product[];
      quantity: Quantity;
      roomNumber: RoomNumber;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.placeOrder(products, quantity, roomNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    placeOrder: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
