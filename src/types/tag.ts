export interface Tag {
  id: number;
  name: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TagCreateDTO {
  name: string;
  color?: string;
}

export interface TagUpdateDTO extends Partial<TagCreateDTO> {
  id: number;
}

export interface TagWithStats extends Tag {
  expenseCount: number;
  totalAmount: number;
}
