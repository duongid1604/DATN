import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { ModalPaymentScreen, ShoppingBagScreen } from '@src/screens';

export type CartStackParamList = {
  SHOPPING_BAG: undefined;
  MODAL_PAYMENT: {
    totalPrice: number;
  };
};

export type CartStackNavigationProp = StackScreenProps<CartStackParamList>;

const Stack = createStackNavigator<CartStackParamList>();

const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      component={ShoppingBagScreen}
      name={'SHOPPING_BAG'}
      options={{
        headerShown: true,
        title: 'SHOPPING BAG',
        headerTitleStyle: {
          fontFamily: 'NotoSans-Bold',
          fontSize: 18.5,
          letterSpacing: 0.75,
        },
        headerRightContainerStyle: {
          right: 16,
        },
      }}
    />
    <Stack.Screen
      component={ModalPaymentScreen}
      name="MODAL_PAYMENT"
      options={{ presentation: 'transparentModal', headerShown: false }}
    />
  </Stack.Navigator>
);

export default CartStack;
