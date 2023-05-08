import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import {
  ListProductScreen,
  ProductCategoryScreen,
  ShopScreen,
} from '@src/screens';

export type ShopStackParamList = {
  SHOP: undefined;
  PRODUCT_CATEGORY: {
    item: any;
  };
  LIST_PRODUCT: {
    name: string;
    itemName: string;
  };
  DETAIL: {
    item: any;
  };
};

export type ShopStackNavigationProp = StackScreenProps<ShopStackParamList>;

const Stack = createStackNavigator<ShopStackParamList>();

const ShopStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      component={ShopScreen}
      name={'SHOP'}
      options={{
        headerShown: true,
        title: 'SHOP',
        headerTitleStyle: {
          fontFamily: 'NotoSans-Bold',
          fontSize: 18.5,
          letterSpacing: 0.75,
        },
      }}
    />
    <Stack.Screen
      component={ProductCategoryScreen}
      name={'PRODUCT_CATEGORY'}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={ListProductScreen}
      name={'LIST_PRODUCT'}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default ShopStack;
