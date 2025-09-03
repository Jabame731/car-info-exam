export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Products {
  product_id: number;
  product_name: string;
  product_type: string;
  product_parent_id: number | null;
}
