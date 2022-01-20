import { Category } from "./types"

export const validateCategory = (category: unknown): category is Category => {
    if(!category || !isString(category))
        throw new Error('Missing or invalid category!');
    return ['earphones', 'speakers', 'headphones'].includes(category);
}

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
}