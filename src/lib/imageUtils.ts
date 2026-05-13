
export const formatImageUrl = (path: string | null | undefined): string | undefined => {
    if (!path) return undefined;
    if (path.startsWith('http') || path.startsWith('data:')) return path;

    const url = import.meta.env.VITE_API_URL || '';
    const base = url.replace('/api', '');

    // Ensure we don't have double slashes from base or path
    const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${normalizedBase}${normalizedPath}`;
};
