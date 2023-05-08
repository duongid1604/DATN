import AxiosClient from '../AxiosClient';
import { MyCart, userInfo } from '@src/types';

const CartAPI = {
  async requestPostCart({
    user,
    payload,
  }: {
    user: userInfo | null;
    payload: MyCart;
  }) {
    return await AxiosClient(`cart`, {
      method: 'POST',
      data: payload,
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestGetUserCart({ user }: { user: userInfo }) {
    return await AxiosClient(`cart/find/${user.myInfo?._id}`, {
      method: 'GET',
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },
};

export default CartAPI;
