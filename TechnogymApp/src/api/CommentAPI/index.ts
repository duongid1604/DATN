import AxiosClient from '../AxiosClient';
import { userInfo } from '@src/types';
import { CommentType } from '@src/types/comment-type';

const CommentAPI = {
  async requestPostComment({
    user,
    comment,
  }: {
    user: userInfo | null;
    comment: CommentType;
  }) {
    return await AxiosClient(`comment`, {
      method: 'POST',
      data: comment,
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestGetProductComment({
    user,
    productId,
  }: {
    user: userInfo | null;
    productId: string;
  }) {
    return await AxiosClient(`comment/find/${productId}`, {
      method: 'GET',
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },
};

export default CommentAPI;
