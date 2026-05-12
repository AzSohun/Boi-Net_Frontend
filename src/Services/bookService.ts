import { axiosClient } from "../Api/axiosClient";
import type { Book } from "../types/book";

export const bookService = {
    // Get All Books with optional filters
    getAllBooks: async (params?: any): Promise<Book[]> => {
        const response = await axiosClient.get<Book[]>('/book/all-books', { params });
        return response.data;
    },

    // Get Book by Id
    getBookById: async (id: number): Promise<Book> => {
        const response = await axiosClient.get<Book>(`/book/${id}`);
        return response.data;
    },

    // Get Book by ISBN
    getBookByIsbn: async (isbn: string): Promise<Book> => {
        const response = await axiosClient.get<Book>(`/book/isbn/${isbn}`);
        return response.data;
    },

    // Create Book
    createBook: async (formData: FormData): Promise<Book> => {
        const response = await axiosClient.post<Book>('/book/add-book', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    // Update Book
    updateBook: async (id: number, formData: FormData): Promise<Book> => {
        const response = await axiosClient.put<Book>(`/book/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    // Delete Book
    deleteBook: async (id: number): Promise<string> => {
        const response = await axiosClient.delete<string>(`/book/delete/${id}`);
        return response.data;
    }
};
