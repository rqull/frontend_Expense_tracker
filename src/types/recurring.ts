export type RecurringInterval =
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly"
  | "yearly";

export interface RecurringExpense {
  id: number;
  description: string;
  amount: number;
  categoryId: number;
  accountId: number;
  interval: RecurringInterval;
  startDate: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format
  lastProcessed?: string;
  nextDue?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecurringExpenseCreateDTO {
  description: string;
  amount: number;
  categoryId: number;
  accountId: number;
  interval: RecurringInterval;
  startDate: string;
  endDate?: string;
  isActive?: boolean;
}

export interface RecurringExpenseUpdateDTO
  extends Partial<RecurringExpenseCreateDTO> {
  id: number;
}

export interface RecurringExpenseWithRelations extends RecurringExpense {
  category: {
    id: number;
    name: string;
  };
  account: {
    id: number;
    name: string;
  };
}
