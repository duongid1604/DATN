import { PostMessage, userInfo } from '@src/types';
import AxiosClient from '../AxiosClient';

const ChatAPI = {
  async requestGetAllChat({ user }: { user: userInfo | null }) {
    return await AxiosClient(`conversation/${user?.myInfo?._id}`, {
      method: 'GET',
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestGetMessenger({
    user,
    conversationId,
  }: {
    user: userInfo | null;
    conversationId?: string;
  }) {
    return await AxiosClient(`message/${conversationId}`, {
      method: 'GET',
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestPostConversation({
    user,
    conversation,
  }: {
    user: userInfo;
    conversation?: {
      senderId: string;
      receiverId: string;
    };
  }) {
    return await AxiosClient(`conversation`, {
      method: 'POST',
      data: conversation,
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestGetUserConversation({ user }: { user: userInfo }) {
    return await AxiosClient(`conversation/${user.myInfo?._id}`, {
      method: 'GET',
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestPostMessenger({
    user,
    payload,
  }: {
    user: userInfo;
    payload?: PostMessage;
  }) {
    return await AxiosClient(`message`, {
      method: 'POST',
      data: payload,
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },
};

export default ChatAPI;
