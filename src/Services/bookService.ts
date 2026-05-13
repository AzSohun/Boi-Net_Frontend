import { axiosClient } from "../Api/axiosClient";
import type { Book } from "../types/book";

export const bookService = {
    // Get All Books with optional filters
    getAllBooks: async (params?: any): Promise<Book[]> => {
        const response = await axiosClient.get<any>('/Book/all-books', { params });
        return response.data;
    },

    // Get Book by Id
    getBookById: async (id: number | string): Promise<Book> => {
        const response = await axiosClient.get<any>(`/Book/${id}`);
        const book = response.data;
        return Array.isArray(book) ? book[0] : book;
    },

    // Get Book by ISBN
    getBookByIsbn: async (isbn: string): Promise<Book> => {
        const response = await axiosClient.get<any>(`/Book/isbn/${isbn}`);
        const book = response.data;
        return Array.isArray(book) ? book[0] : book;
    },

    // Create Book
    createBook: async (formData: FormData): Promise<Book> => {
        const response = await axiosClient.post<any>('/Book/add-book', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    // Update Book
    updateBook: async (id: number, formData: FormData): Promise<Book> => {
        const response = await axiosClient.put<any>(`/Book/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    // Delete Book
    deleteBook: async (id: number): Promise<string> => {
        const response = await axiosClient.delete<string>(`/Book/delete/${id}`);
        return response.data;
    }
};
