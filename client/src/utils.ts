import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function createPageUrl(page: string): string {
    if (page === 'Home') return '/';
    // Handle query params if present (e.g. BrowseTalent?category=...)
    const [path, query] = page.split('?');
    const kebabPath = path.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    return '/' + kebabPath + (query ? `?${query}` : '');
}
