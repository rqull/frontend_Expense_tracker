export interface Budget {
  id: number;
  categoryId: number;
  amount: number;
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  createdAt: string;
  updatedAt: string;
}

export interface BudgetCreateDTO {
  categoryId: number;
  amount: number;
  startDate: string;
  endDate: string;
}

export interface BudgetUpdateDTO extends Partial<BudgetCreateDTO> {
  id: number;
}

export interface BudgetStatus {
  budgetId: number;
  categoryId: number;
  spent: number;
  remaining: number;
  percentage: number;
}

export interface BudgetWithCategory extends Budget {
  category: {
    id: number;
    name: string;
    color?: string;
  };
  status: BudgetStatus;
}
