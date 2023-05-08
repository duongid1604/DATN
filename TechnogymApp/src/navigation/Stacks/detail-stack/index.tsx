import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { DetailScreen, ReviewInputScreen, ReviewScreen } from '@src/screens';

export type DetailStackParamList = {
  DETAIL: {
    item: any;
  };
  REVIEW: {
    productId: string;
    img: string;
  };
  REVIEW_INPUT: {
    productId: string;
    img: string;
  };
};

export type DetailStackNavigationProp = StackScreenProps<DetailStackParamList>;

const Stack = createStackNavigator<DetailStackParamList>();

const DetailStack = () => (
  <Stack.Navigator
    initialRouteName="DETAIL"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      component={DetailScreen}
      name={'DETAIL'}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={ReviewScreen}
      name={'REVIEW'}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={ReviewInputScreen}
      name={'REVIEW_INPUT'}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default DetailStack;
