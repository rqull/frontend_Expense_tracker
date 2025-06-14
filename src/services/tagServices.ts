import apiClient from "./apiClient";

interface Tag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface TagResponse {
  status: string;
  data: Tag;
  message: string;
}

interface TagListResponse {
  status: string;
  data: {
    items: Tag[];
    total: number;
    page: number;
    size: number;
    pages: number;
  };
  message: string;
}

export const tagServices = {
  async getAllTags(params?: {
    page?: number;
    size?: number;
  }): Promise<TagListResponse> {
    const response = await apiClient.get("/tags", { params });
    return response.data;
  },

  async getTagById(id: number): Promise<TagResponse> {
    const response = await apiClient.get(`/tags/${id}`);
    return response.data;
  },

  async createTag(data: { name: string }): Promise<TagResponse> {
    const response = await apiClient.post("/tags", data);
    return response.data;
  },

  async updateTag(
    id: number,
    data: {
      name: string;
    }
  ): Promise<TagResponse> {
    const response = await apiClient.put(`/tags/${id}`, data);
    return response.data;
  },

  async deleteTag(
    id: number
  ): Promise<{ status: string; data: null; message: string }> {
    const response = await apiClient.delete(`/tags/${id}`);
    return response.data;
  },
};
