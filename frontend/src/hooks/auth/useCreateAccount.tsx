import { createAccount } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: (user) => {
      queryClient.setQueryData(['currentUser'], user);
    },
    onError: (error: Error) => {
      console.error('Create Account Error:', {
        message: error.message,
        time: new Date().toISOString(),
        stack: error.stack
      });
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ['currentUser'] });
      const previousUser = queryClient.getQueryData(['currentUser']);
      queryClient.setQueryData(['currentUser'], {
        ...newUser,
        id: 'temp-id',
        createdAt: new Date().toISOString()
      });
      return { previousUser };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};
