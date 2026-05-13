import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookService } from '../Services/bookService';
import { useFeedback } from '../Components/UI/Feedback';


export const useBooks = (params?: any) => {
    return useQuery({
        queryKey: ['books', params],
        queryFn: async () => {
            return await bookService.getAllBooks(params);
        },
    });
};

export const useGetAllBooks = useBooks;

export const useBookById = (id: number) => {
    return useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            return await bookService.getBookById(id);
        },
        enabled: !!id,
    });
};

export const useGetBookById = useBookById;

export const useCreateBook = () => {
    const queryClient = useQueryClient();
    const { showToast } = useFeedback();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            return await bookService.createBook(formData);
        },
        onSuccess: () => {
            showToast('Book created successfully', 'success');
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.Message || 'Failed to create book';
            showToast(message, 'error');
        },
    });
};

export const useUpdateBook = () => {
    const queryClient = useQueryClient();
    const { showToast } = useFeedback();

    return useMutation({
        mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
            return await bookService.updateBook(id, formData);
        },
        onSuccess: () => {
            showToast('Book updated successfully', 'success');
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.Message || 'Failed to update book';
            showToast(message, 'error');
        },
    });
};

export const useDeleteBook = () => {
    const queryClient = useQueryClient();
    const { showToast } = useFeedback();

    return useMutation({
        mutationFn: async (id: number) => {
            return await bookService.deleteBook(id);
        },
        onSuccess: () => {
            showToast('Book deleted permanently', 'success');
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
        onError: () => {
            showToast('Deletion failed', 'error');
        },
    });
};
