import {
  forgotPasswordType,
  loginType,
  registerType,
} from '@src/types/auth-type';
import { userInfo } from '@src/types';
import AxiosClient from '../AxiosClient';

const AuthAPI = {
  async requestLogin(payload: loginType) {
    return await AxiosClient(`auth/login`, {
      method: 'POST',
      data: payload,
    });
  },

  async requestRegister(payload: registerType) {
    return await AxiosClient(`auth/register`, {
      method: 'POST',
      data: payload,
    });
  },

  async requestForgotPassword(payload: forgotPasswordType) {
    return await AxiosClient(`auth/forgot_password`, {
      method: 'POST',
      data: payload,
    });
  },

  async requestLogout(payload: userInfo | null) {
    return await AxiosClient(`auth/logout`, {
      method: 'POST',
      headers: {
        token: `Bearer ${payload?.accessToken}`,
      },
    });
  },

  async requestRefreshToken() {
    return await AxiosClient(`auth/refresh`, {
      method: 'POST',
      withCredentials: true,
    });
  },
};

export default AuthAPI;
