import apiClient from "./apiClient";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

interface AuthResponse {
  status: string;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
  message: string;
}

export const authServices = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/token", credentials);
    return response.data;
  },

  async register(
    userData: RegisterData
  ): Promise<{ status: string; data: User; message: string }> {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  async getCurrentUser(): Promise<{
    status: string;
    data: User;
    message: string;
  }> {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  setAuthToken(token: string) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  removeAuthToken() {
    delete apiClient.defaults.headers.common["Authorization"];
  },
};
