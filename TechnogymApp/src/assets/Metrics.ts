import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  screen: {
    width,
    height,
  },
  borderButton: 10,
  isSmallPhone: width < 325,
};
