import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../Services/userService';
import { useFeedback } from '../Components/UI/Feedback';

export const useAllUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return await userService.getAllUsers();
        },
    });
};

export const useAdminManageUser = () => {
    const queryClient = useQueryClient();
    const { showToast } = useFeedback();

    return useMutation({
        mutationFn: async ({ userId, role, isBlocked }: { userId: string; role: string; isBlocked: boolean }) => {
            return await userService.adminManageUser(userId, { UserRole: role, IsBlocked: isBlocked });
        },
        onSuccess: () => {
            showToast('User state updated successfully');
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: () => {
            showToast('Update failed', 'error');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const { showToast } = useFeedback();

    return useMutation({
        mutationFn: async (userId: string) => {
            return await userService.deleteUser(userId);
        },
        onSuccess: () => {
            showToast('User deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: () => {
            showToast('Deletion failed', 'error');
        },
    });
};
