export type ProductOrder = {
  productID: string;
  quantity: number;
};

export type Order = {
  _id?: string;
  userId?: string | undefined;
  products?: Array<ProductOrder>;
  amount?: number;
  address?: string;
  status?: string;
};
