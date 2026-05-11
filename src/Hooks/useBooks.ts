import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookService } from "../Services/bookService";

interface BookQueryParams {
    search?: string,
    genre?: string,
    author?: string,
    isbn?: string,
    isavailable?: boolean,
    sortBy: string,
    asc?: boolean,
    pagecount?: number,
    pagesize?: number
}

export const useGetAllBooks = (params: BookQueryParams) => {
    return useQuery({
        queryKey: ['books', params],
        queryFn: () => bookService.getAllBooks(params)
    });
};

export const useGetBookById = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ['book', id],
        queryFn: () => bookService.getBookById(id as any),
        enabled: !!id
    });
};

export const useDeleteBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => bookService.deleteBook(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        }
    });
};
