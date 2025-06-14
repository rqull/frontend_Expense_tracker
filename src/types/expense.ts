export interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string; // YYYY-MM-DD format
  categoryId: number;
  accountId: number;
  tagIds: number[];
  receiptPath?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseCreateDTO {
  amount: number;
  description: string;
  date: string;
  categoryId: number;
  accountId: number;
  tagIds?: number[];
  receiptPath?: string;
  notes?: string;
}

export interface ExpenseUpdateDTO extends Partial<ExpenseCreateDTO> {
  id: number;
}

export interface ExpenseFilters {
  categoryId?: number;
  accountId?: number;
  startDate?: string;
  endDate?: string;
  skip?: number;
  limit?: number;
}
