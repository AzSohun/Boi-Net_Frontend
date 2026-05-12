import { axiosClient } from "../Api/axiosClient";
import type { Book } from "../types/book";
import { unwrap } from "../lib/api-utils";

export const bookService = {
    // Get All Books with optional filters
    getAllBooks: async (params?: any): Promise<Book[]> => {
        const response = await axiosClient.get<any>('/book/all-books', { params });
        return unwrap<Book[]>(response.data);
    },

    // Get Book by Id
    getBookById: async (id: number | string): Promise<Book> => {
        const response = await axiosClient.get<any>(`/book/${id}`);
        const book = unwrap<Book | Book[]>(response.data);
        return Array.isArray(book) ? book[0] : book;
    },

    // Get Book by ISBN
    getBookByIsbn: async (isbn: string): Promise<Book> => {
        const response = await axiosClient.get<any>(`/book/isbn/${isbn}`);
        const book = unwrap<Book | Book[]>(response.data);
        return Array.isArray(book) ? book[0] : book;
    },

    // Create Book
    createBook: async (formData: FormData): Promise<Book> => {
        const response = await axiosClient.post<any>('/book/add-book', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return unwrap<Book>(response.data);
    },

    // Update Book
    updateBook: async (id: number, formData: FormData): Promise<Book> => {
        const response = await axiosClient.put<any>(`/book/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return unwrap<Book>(response.data);
    },

    // Delete Book
    deleteBook: async (id: number): Promise<string> => {
        const response = await axiosClient.delete<string>(`/book/delete/${id}`);
        return response.data;
    }
};
