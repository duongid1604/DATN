import AxiosClient from '../AxiosClient';

const HomeAPI = {
  async requestGetAllNew() {
    return await AxiosClient(`news`, {
      method: 'GET',
    });
  },
};

export default HomeAPI
