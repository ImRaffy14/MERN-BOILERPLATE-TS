import { createAccount } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import toast from "react-hot-toast"

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: (response) => {  // Now handling the full response object
      const { user } = response;  // Destructure the user from response
      
      // Update current user
      queryClient.setQueryData(['currentUser'], user);
      
      // Update users list
      queryClient.setQueryData(['users'], (oldUsers: User[] | undefined) => 
        oldUsers ? [user, ...oldUsers] : [user]
      );
      
      // Show success toast
      toast.success(response.message);
    },
    onError: (error: Error) => {
      console.error('Create Account Error:', {
        message: error.message,
        time: new Date().toISOString(),
        stack: error.stack
      });
      toast.error(error.message);
    },
    onSettled: () => {
      // Invalidate queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};
