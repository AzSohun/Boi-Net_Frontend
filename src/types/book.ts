

// Book Interface
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
    publishedDate?: string;
    createdAt: string;
    updatedAt?: string;

}

// Create Book Form Data Interface
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
    publishedDate?: string;

}


// All the paginated and filtered Data will be stored Here.
export interface BookResponse {
    data: Book[];
}