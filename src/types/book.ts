
// Book Interface (Matches Boi.Net.Model.Book and Boi.Net.DTOs.BookDTOs.BookDto)
export interface Book {
    id: number;
    title: string;
    description: string;
    author: string;
    publisher?: string;
    isbn?: string;
    price: number;
    coverPhoto?: string;
    coverPublicId?: string;
    pageCount?: number;
    genre?: string;
    isAvailable: boolean;
    publishDate?: string; // DateOnly serialized as string
    createdAt: string;
    updatedAt?: string;
}

// Create Book Form Data Interface (Matches Boi.Net.DTOs.BookDTOs.CreateBookDto)
export interface CreateBookFormData {
    title: string;
    description: string;
    author: string;
    publisher?: string;
    isbn?: string;
    price: number;
    imageFile?: File | null;
    pageCount?: number;
    genre?: string;
    isAvailable: boolean;
    publishDate?: string;
}

// Update Book DTO (Matches Boi.Net.DTOs.BookDTOs.UpdateBookDto)
export interface UpdateBookFormData {
    title: string;
    description: string;
    author: string;
    publisher?: string;
    isbn?: string;
    price: number;
    imageFile?: File | null;
    pageCount?: number;
    genre?: string;
    isAvailable: boolean;
    publishDate?: string;
}

export interface BookResponse {
    data: Book[];
}
