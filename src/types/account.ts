export interface Account {
  id: number;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AccountType = "cash" | "bank" | "credit" | "investment" | "other";

export interface AccountCreateDTO {
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  description?: string;
  isActive?: boolean;
}

export interface AccountUpdateDTO extends Partial<AccountCreateDTO> {
  id: number;
}

export interface AccountWithStats extends Account {
  totalExpenses: number;
  expenseCount: number;
  lastTransactionDate?: string;
}
