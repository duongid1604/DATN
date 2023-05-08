import AxiosClient from '../AxiosClient';
import { userInfo } from '@src/types';

const PaymentAPI = {
  async requestPayment({
    user,
    payload,
  }: {
    user: userInfo | null;
    payload: any;
  }) {
    return await AxiosClient(`payment`, {
      method: 'POST',
      data: payload,
      headers: {
        token: `Bearer ${user?.accessToken}`,
      },
    });
  },
};

export default PaymentAPI;
