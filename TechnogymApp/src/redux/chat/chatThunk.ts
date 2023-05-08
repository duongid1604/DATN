import { createAsyncThunk } from '@reduxjs/toolkit';

import ChatAPI from '@src/api/ChatAPI';
import { PostMessage, userInfo } from '@src/types';

export const getAllChatThunk = createAsyncThunk(
  'allChat/getAllChat',
  async ({ user }: { user: userInfo | null }, thunkApi) => {
    try {
      const response = await ChatAPI.requestGetAllChat({ user });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const getChatThunk = createAsyncThunk(
  'chat/getChat',
  async (
    {
      user,
      conversationId,
    }: {
      user: userInfo | null;
      conversationId?: string;
    },
    thunkApi,
  ) => {
    try {
      const response = await ChatAPI.requestGetMessenger({
        user,
        conversationId,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const postConversationThunk = createAsyncThunk(
  'sendConversation/postSendConversation',
  async (
    {
      user,
      conversation,
    }: {
      user: userInfo;
      conversation?: {
        senderId: string;
        receiverId: string;
      };
    },
    thunkApi,
  ) => {
    try {
      const response = await ChatAPI.requestPostConversation({
        user,
        conversation,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const postChatThunk = createAsyncThunk(
  'sendChat/postSendChat',
  async (
    {
      user,
      payload,
    }: {
      user: userInfo;
      payload?: PostMessage;
    },
    thunkApi,
  ) => {
    try {
      const response = await ChatAPI.requestPostMessenger({
        user,
        payload,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
