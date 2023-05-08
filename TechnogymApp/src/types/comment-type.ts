export interface CommentType {
  __v: number;
  _id: string;
  desc: string;
  productId: string;
  userId: string;
  username: string;
  createdAt: string;
}

export type CommentListType = Array<CommentType>;
