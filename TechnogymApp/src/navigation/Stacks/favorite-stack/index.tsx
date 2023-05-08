import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { FavoriteScreen, ModalScreen } from '@src/screens';
import { ProductItem } from '@src/types';

export type FavoriteStackParamList = {
  FAVORITE: undefined;
  MODAL: {
    item: ProductItem;
  };
  DETAIL: {
    item: any;
  };
};

export type FavoriteStackNavigationProp =
  StackScreenProps<FavoriteStackParamList>;

const Stack = createStackNavigator<FavoriteStackParamList>();

const FavoriteStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      component={FavoriteScreen}
      name={'FAVORITE'}
      options={{
        headerShown: true,
        title: 'WISHLIST',
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
      component={ModalScreen}
      name="MODAL"
      options={{ presentation: 'transparentModal', headerShown: false }}
    />
  </Stack.Navigator>
);

export default FavoriteStack;
