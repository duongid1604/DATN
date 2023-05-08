import { createAsyncThunk } from '@reduxjs/toolkit';

import CommentAPI from '@src/api/CommentAPI';
import { userInfo } from '@src/types';
import { CommentType } from '@src/types/comment-type';

export const getProductCommentThunk = createAsyncThunk(
  'productComment/getProductComment',
  async (
    { user, productId }: { user: userInfo | null; productId: string },
    thunkApi,
  ) => {
    try {
      const response = await CommentAPI.requestGetProductComment({
        user,
        productId,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const postCommentThunk = createAsyncThunk(
  'comment/postComment',
  async (
    { user, comment }: { user: userInfo | null; comment: CommentType },
    thunkApi,
  ) => {
    try {
      const response = await CommentAPI.requestPostComment({
        user,
        comment,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
