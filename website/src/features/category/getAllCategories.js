import { API_BASE_URL } from "@/service";

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/product-categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
