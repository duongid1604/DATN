import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMessage, PostMessage } from '@src/types';
import { getChatThunk, postChatThunk } from './chatThunk';

type MessageState = {
  loading?: boolean;
  messageData?: Array<IMessage> | null;
  error?: string | null | unknown;
};

const initialState: MessageState = {
  loading: false,
  messageData: [],
  error: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getChatThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getChatThunk.fulfilled,
        (state, action: PayloadAction<Array<IMessage>>) => {
          state.loading = false;
          state.messageData = [...action.payload];
        },
      )
      .addCase(getChatThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postChatThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postChatThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postChatThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = messageSlice.actions;

export default messageSlice.reducer;
