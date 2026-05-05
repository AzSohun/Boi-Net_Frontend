import { mutationOptions, useQuery, useQueryClient } from "@tanstack/react-query"
import { bookService } from "../Services/bookService"



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
    })

}



export const useGetBookById = (id: number) => {
    return useQuery({
        queryKey: ['book', id],
        queryFn: () => bookService.getBookById(id),
        enabled: !!id // Id is missing. Then the API will not call.
    })
}



export const useDeleteByBook = (id: number) => {
    const queryClient = useQueryClient();

    return mutationOptions({
        mutationFn: (id: number) => bookService.deleteBook(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['book'] })
        }
    })
}
