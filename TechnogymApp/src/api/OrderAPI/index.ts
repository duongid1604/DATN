import AxiosClient from '../AxiosClient';
import { Order, userInfo } from '@src/types';

const OrderAPI = {
  async requestPostOrder({
    user,
    payload,
  }: {
    user: userInfo | null;
    payload: Order | null;
  }) {
    return await AxiosClient(`order`, {
      method: 'POST',
      data: payload,
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestPutOrder({
    user,
    payload,
  }: {
    user: userInfo | null;
    payload: Order;
  }) {
    return await AxiosClient(`order/find/${payload._id}`, {
      method: 'PUT',
      data: payload,
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestGetUserOrder({ user }: { user: userInfo  | null}) {
    return await AxiosClient(`order/find/${user?.myInfo?._id}`, {
      method: 'GET',
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },
};

export default OrderAPI;
