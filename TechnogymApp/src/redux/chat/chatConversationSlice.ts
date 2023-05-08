import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Conversation, PostMessage } from '@src/types';
import { getAllChatThunk, postConversationThunk } from './chatThunk';

type ConversationState = {
  loading?: boolean;
  conversation?: Array<Conversation> | null;
  error?: string | null | unknown;
};

const initialState: ConversationState = {
  loading: false,
  conversation: [],
  error: null,
};

export const chatConversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllChatThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getAllChatThunk.fulfilled,
        (state, action: PayloadAction<Array<Conversation>>) => {
          state.loading = false;
          state.conversation = [...action.payload];
        },
      )
      .addCase(getAllChatThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postConversationThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        postConversationThunk.fulfilled,
        (state, action: PayloadAction<Array<Conversation>>) => {
          state.loading = false;
        },
      )
      .addCase(postConversationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = chatConversationSlice.actions;

export default chatConversationSlice.reducer;
