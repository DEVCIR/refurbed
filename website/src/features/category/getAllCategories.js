import { BASE_URL } from "../../service";

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/product-categories`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};