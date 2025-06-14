import apiClient from "./apiClient";

interface Account {
  id: number;
  name: string;
  initial_balance: string;
  created_at: string;
  updated_at: string;
}

interface AccountResponse {
  status: string;
  data: Account;
  message: string;
}

interface AccountListResponse {
  status: string;
  data: {
    items: Account[];
    total: number;
    page: number;
    size: number;
    pages: number;
  };
  message: string;
}

interface QueryParams {
  page?: number;
  size?: number;
}

export const accountServices = {
  async getAllAccounts(params?: QueryParams): Promise<AccountListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.size) queryParams.append("size", params.size.toString());

    const response = await apiClient.get<AccountListResponse>(
      `/accounts?${queryParams.toString()}`
    );
    if (response.error) throw new Error(response.error);
    if (!response.data) throw new Error("No data received");
    return response.data;
  },

  async getAccountById(id: number): Promise<AccountResponse> {
    const response = await apiClient.get<AccountResponse>(`/accounts/${id}`);
    if (response.error) throw new Error(response.error);
    if (!response.data) throw new Error("No data received");
    return response.data;
  },

  async createAccount(data: {
    name: string;
    initial_balance: number;
  }): Promise<AccountResponse> {
    const response = await apiClient.post<AccountResponse>("/accounts", data);
    if (response.error) throw new Error(response.error);
    if (!response.data) throw new Error("No data received");
    return response.data;
  },

  async updateAccount(
    id: number,
    data: {
      name?: string;
      initial_balance?: number;
    }
  ): Promise<AccountResponse> {
    const response = await apiClient.put<AccountResponse>(
      `/accounts/${id}`,
      data
    );
    if (response.error) throw new Error(response.error);
    if (!response.data) throw new Error("No data received");
    return response.data;
  },

  async deleteAccount(
    id: number
  ): Promise<{ status: string; data: null; message: string }> {
    const response = await apiClient.delete<{
      status: string;
      data: null;
      message: string;
    }>(`/accounts/${id}`);
    if (response.error) throw new Error(response.error);
    if (!response.data) throw new Error("No data received");
    return response.data;
  },
};
