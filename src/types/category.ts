export interface Category {
  id: number;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryCreateDTO {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface CategoryUpdateDTO extends Partial<CategoryCreateDTO> {
  id: number;
}

export interface CategoryWithStats extends Category {
  totalExpenses: number;
  expenseCount: number;
  budgetAmount?: number;
  budgetUsagePercentage?: number;
}
