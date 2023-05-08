import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CommentListType } from '@src/types/comment-type';
import { getProductCommentThunk, postCommentThunk } from './commentThunk';

type CommentState = {
  loading?: boolean;
  loadingPost?: boolean;
  commentData?: CommentListType | null;
  error?: string | null | unknown;
};

const initialState: CommentState = {
  loading: false,
  loadingPost: false,
  commentData: [],
  error: null,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentReload (state) {
      state.commentData = []
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getProductCommentThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getProductCommentThunk.fulfilled,
        (state, action: PayloadAction<CommentListType>) => {
          state.loading = false;
          state.commentData = [...action.payload].reverse();
        },
      )
      .addCase(getProductCommentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postCommentThunk.pending, (state, action) => {
        state.loadingPost = true;
      })
      .addCase(postCommentThunk.fulfilled, (state, action) => {
        state.loadingPost = false;
      })
      .addCase(postCommentThunk.rejected, (state, action) => {
        state.loadingPost = false;
        state.error = action.payload;
      });
  },
});

export const {setCommentReload} = commentSlice.actions;

export default commentSlice.reducer;
