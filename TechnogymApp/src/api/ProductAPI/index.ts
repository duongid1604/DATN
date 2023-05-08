import { loginType, registerType } from '@src/types/auth-type';
import { userInfo } from '@src/types';
import AxiosClient from '../AxiosClient';

const ProductAPI = {
  async requestGetAllProduct(payload: userInfo | null) {
    return await AxiosClient(`product`, {
      method: 'GET',
      headers: {
        token: `Bearer ${payload?.accessToken}`,
      },
    });
  },

  async requestGetAllNewProduct(payload: userInfo | null) {
    return await AxiosClient(`product?new=true`, {
      method: 'GET',
      headers: {
        token: `Bearer ${payload?.accessToken}`,
      },
    });
  },

  async requestGetProduct({
    user,
    category,
  }: {
    user: userInfo | null;
    category: string;
  }) {
    return await AxiosClient(`product/?category=${category}`, {
      method: 'GET',
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestDetailGetProduct({
    user,
    productId,
  }: {
    user: userInfo | null;
    productId: string;
  }) {
    return await AxiosClient(`product/find/${productId}`, {
      method: 'GET',
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },

  async requestFavoriteProduct({
    user,
    productID,
  }: {
    user: userInfo | null;
    productID: string;
  }) {
    return await AxiosClient(`product/${productID}`, {
      method: 'PATCH',
      data: { userId: user?.myInfo?._id },
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },
};

export default ProductAPI;
