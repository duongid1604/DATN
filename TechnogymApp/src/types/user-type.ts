export type myInfo = {
  _id: string;
  username: string;
  email: string;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
  address?: string;
  gender?: string;
  password?: string;
  conversationId?: string;
  __v?: number;
};

export type userInfo = {
  myInfo?: myInfo | null;
  accessToken?: string;
};
