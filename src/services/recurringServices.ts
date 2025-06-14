import apiClient from "./apiClient";

interface RecurringExpense {
  id: number;
  name: string;
  amount: string;
  category_id: number;
  interval: "daily" | "weekly" | "monthly" | "yearly";
  next_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
    description: string;
  };
}

interface RecurringResponse {
  status: string;
  data: RecurringExpense;
  message: string;
}

interface RecurringListResponse {
  status: string;
  data: {
    items: RecurringExpense[];
    total: number;
    page: number;
    size: number;
    pages: number;
  };
  message: string;
}

interface UpcomingRecurring {
  items: Array<{
    id: number;
    name: string;
    amount: string;
    next_date: string;
    category: {
      id: number;
      name: string;
    };
    days_until: number;
  }>;
  total_upcoming: string;
  count: number;
}

interface GeneratedExpenses {
  generated: Array<{
    id: number;
    amount: string;
    date: string;
    description: string;
    category: {
      id: number;
      name: string;
      description: string;
    };
    account: null;
    tags: any[];
    receipt_path: null;
    created_at: string;
    updated_at: string;
  }>;
  total_generated: number;
  next_generation_date: string;
}

export const recurringServices = {
  async getAllRecurring(params?: {
    page?: number;
    size?: number;
  }): Promise<RecurringListResponse> {
    const response = await apiClient.get("/recurring", { params });
    return response.data;
  },

  async getRecurringById(id: number): Promise<RecurringResponse> {
    const response = await apiClient.get(`/recurring/${id}`);
    return response.data;
  },

  async createRecurring(data: {
    name: string;
    amount: number;
    category_id: number;
    interval: "daily" | "weekly" | "monthly" | "yearly";
    next_date: string;
    end_date?: string;
  }): Promise<RecurringResponse> {
    const response = await apiClient.post("/recurring", data);
    return response.data;
  },

  async updateRecurring(
    id: number,
    data: {
      name?: string;
      amount?: number;
      category_id?: number;
      interval?: "daily" | "weekly" | "monthly" | "yearly";
      next_date?: string;
      end_date?: string;
    }
  ): Promise<RecurringResponse> {
    const response = await apiClient.put(`/recurring/${id}`, data);
    return response.data;
  },

  async deleteRecurring(
    id: number
  ): Promise<{ status: string; data: null; message: string }> {
    const response = await apiClient.delete(`/recurring/${id}`);
    return response.data;
  },

  async getUpcomingRecurring(
    days?: number
  ): Promise<{ status: string; data: UpcomingRecurring; message: string }> {
    const response = await apiClient.get("/recurring/upcoming", {
      params: { days },
    });
    return response.data;
  },

  async generateRecurringExpenses(): Promise<{
    status: string;
    data: GeneratedExpenses;
    message: string;
  }> {
    const response = await apiClient.post("/recurring/generate");
    return response.data;
  },
};
