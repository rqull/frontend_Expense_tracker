import apiClient from "./apiClient";

interface Budget {
  id: number;
  category_id: number;
  year: number;
  month: number;
  amount: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
    description: string;
  };
}

interface BudgetResponse {
  status: string;
  data: Budget;
  message: string;
}

interface BudgetListResponse {
  status: string;
  data: {
    items: Budget[];
    total: number;
    page: number;
    size: number;
    pages: number;
  };
  message: string;
}

interface BudgetStatus {
  summary: {
    total_budget: string;
    total_spent: string;
    percent: number;
  };
  categories: Array<{
    category_id: number;
    category_name: string;
    budget_amount: string;
    total_spent: string;
    percent: number;
    status: "on_track" | "warning" | "exceeded";
  }>;
}

interface BudgetOverview {
  summary: {
    total_budget: string;
    total_spent: string;
    remaining: string;
    percent_used: number;
  };
  categories: Array<{
    category_id: number;
    category_name: string;
    budget_amount: string;
    spent_amount: string;
    remaining: string;
    percent_used: number;
    status: "on_track" | "warning" | "exceeded";
  }>;
  period: {
    year: number;
    month: number;
  };
}

export const budgetServices = {
  async getAllBudgets(params?: {
    page?: number;
    size?: number;
  }): Promise<BudgetListResponse> {
    const response = await apiClient.get("/budgets", { params });
    return response.data;
  },

  async getBudgetById(id: number): Promise<BudgetResponse> {
    const response = await apiClient.get(`/budgets/${id}`);
    return response.data;
  },

  async createBudget(data: {
    category_id: number;
    year: number;
    month: number;
    amount: number;
  }): Promise<BudgetResponse> {
    const response = await apiClient.post("/budgets", data);
    return response.data;
  },

  async updateBudget(
    id: number,
    data: {
      amount: number;
    }
  ): Promise<BudgetResponse> {
    const response = await apiClient.put(`/budgets/${id}`, data);
    return response.data;
  },

  async deleteBudget(
    id: number
  ): Promise<{ status: string; data: null; message: string }> {
    const response = await apiClient.delete(`/budgets/${id}`);
    return response.data;
  },

  async getBudgetStatus(
    year: number,
    month: number
  ): Promise<{ status: string; data: BudgetStatus; message: string }> {
    const response = await apiClient.get("/budgets/status", {
      params: { year, month },
    });
    return response.data;
  },

  async getBudgetOverview(
    year: number,
    month: number
  ): Promise<{ status: string; data: BudgetOverview; message: string }> {
    const response = await apiClient.get("/budgets/overview", {
      params: { year, month },
    });
    return response.data;
  },
};
