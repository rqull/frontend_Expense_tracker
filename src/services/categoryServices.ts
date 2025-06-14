import apiClient from "./apiClient";

interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface CategoryResponse {
  status: string;
  data: Category;
  message: string;
}

interface CategoryListResponse {
  status: string;
  data: {
    items: Category[];
    total: number;
    page: number;
    size: number;
    pages: number;
  };
  message: string;
}

export const categoryServices = {
  async getAllCategories(params?: {
    page?: number;
    size?: number;
    sort?: string;
    order?: "asc" | "desc";
  }): Promise<CategoryListResponse> {
    const response = await apiClient.get("/categories", { params });
    return response.data;
  },

  async getCategoryById(id: number): Promise<CategoryResponse> {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },

  async createCategory(data: {
    name: string;
    description: string;
  }): Promise<CategoryResponse> {
    const response = await apiClient.post("/categories", data);
    return response.data;
  },

  async updateCategory(
    id: number,
    data: { name?: string; description?: string }
  ): Promise<CategoryResponse> {
    const response = await apiClient.put(`/categories/${id}`, data);
    return response.data;
  },

  async deleteCategory(
    id: number
  ): Promise<{ status: string; data: null; message: string }> {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },
};
