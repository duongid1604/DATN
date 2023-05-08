export type ProductItem = {
  __v: number;
  _id: string;
  categories: Array<string>;
  createdAt: string;
  desc: string;
  favorite: Array<string>;
  img: string;
  ingredient: Array<string>;
  price: number;
  quantity: number;
  recommend: Array<string>;
  size: string;
  title: string;
  updatedAt: string;
};

export type ProductList = Array<ProductItem>;

export interface CategoryItem {
  name: string;
  apiName: string;
  image: string;
}

export type ItemCart = {
  productID: string;
  categories: Array<string>;
  title: string;
  img: string;
  size: string;
  price: number;
  quantity: number;
};

export type Cart = Array<ItemCart>;
