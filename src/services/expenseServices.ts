import apiClient from "./apiClient";

interface Expense {
  id: number;
  amount: string;
  date: string;
  description: string;
  category: {
    id: number;
    name: string;
    description: string;
  };
  account: {
    id: number;
    name: string;
    initial_balance: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
  receipt_path: string | null;
  created_at: string;
  updated_at: string;
}

interface ExpenseResponse {
  status: string;
  data: Expense;
  message: string;
}

interface ExpenseListResponse {
  status: string;
  data: {
    items: Expense[];
    total: number;
    page: number;
    size: number;
    pages: number;
  };
  message: string;
}

interface ExpenseSummary {
  total_amount: string;
  average_amount: string;
  count: number;
  by_category: Array<{
    category_id: number;
    category_name: string;
    total_amount: string;
    count: number;
  }>;
  by_tag: Array<{
    tag_id: number;
    tag_name: string;
    total_amount: string;
    count: number;
  }>;
  period: {
    start_date: string;
    end_date: string;
  };
}

export const expenseServices = {
  async getAllExpenses(params?: {
    page?: number;
    size?: number;
    sort?: string;
    order?: "asc" | "desc";
    category_id?: number;
    account_id?: number;
    start_date?: string;
    end_date?: string;
    tag_ids?: number[];
  }): Promise<ExpenseListResponse> {
    const response = await apiClient.get("/expenses", { params });
    return response.data;
  },

  async getExpenseById(id: number): Promise<ExpenseResponse> {
    const response = await apiClient.get(`/expenses/${id}`);
    return response.data;
  },

  async createExpense(data: {
    amount: number;
    date: string;
    description: string;
    category_id: number;
    account_id: number;
    tag_ids?: number[];
    receipt_path?: string;
  }): Promise<ExpenseResponse> {
    const response = await apiClient.post("/expenses", data);
    return response.data;
  },

  async updateExpense(
    id: number,
    data: {
      amount?: number;
      date?: string;
      description?: string;
      category_id?: number;
      account_id?: number;
      tag_ids?: number[];
      receipt_path?: string;
    }
  ): Promise<ExpenseResponse> {
    const response = await apiClient.put(`/expenses/${id}`, data);
    return response.data;
  },

  async deleteExpense(
    id: number
  ): Promise<{ status: string; data: null; message: string }> {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response.data;
  },

  async getExpenseSummary(params?: {
    start_date?: string;
    end_date?: string;
    category_id?: number;
  }): Promise<{ status: string; data: ExpenseSummary; message: string }> {
    const response = await apiClient.get("/expenses/summary", { params });
    return response.data;
  },
};
