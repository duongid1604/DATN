export type Product = {
  productID: String;
  quantity: number;
};

export type MyCart = {
  userId: String | undefined;
  products: Array<Product>;
};
