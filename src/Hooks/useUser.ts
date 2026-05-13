import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../Services/userService';
import { useAuth } from '../Context/AuthContext';
import type { UserDto } from '../types/auth';
import { useFeedback } from '../Components/UI/Feedback';

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            return await userService.getProfile();
        },
        // Keep data fresh but don't over-fetch
        staleTime: 1000 * 60 * 5,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { showToast } = useFeedback();
    const { setAuth, accessToken } = useAuth();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            return await userService.updateProfile(formData);
        },
        onSuccess: (updatedUser: UserDto) => {
            showToast('Profile updated successfully!', 'success');
            // Update local auth context
            if (accessToken) {
                setAuth(updatedUser, accessToken);
            }
            // Trigger re-fetch for any component using useUserProfile
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.Message || 'Failed to update profile';
            showToast(message, 'error');
        },
    });
};
