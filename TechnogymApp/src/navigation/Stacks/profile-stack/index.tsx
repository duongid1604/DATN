import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import {
  EditPasswordScreen,
  MyAccountScreen,
  OrderHistoryScreen,
  ProfileScreen,
} from '@src/screens';

export type ProfileStackParamList = {
  PROFILE: undefined;
  MY_ACCOUNT: undefined;
  EDIT_PASSWORD: undefined;
  MY_ORDERS: undefined;
};

export type ProfileStackNavigationProp = StackScreenProps<
  ProfileStackParamList
>;

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      component={ProfileScreen}
      name={'PROFILE'}
      options={{
        headerShown: true,
        title: 'PROFILE',
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
      component={MyAccountScreen}
      name={'MY_ACCOUNT'}
      options={{
        headerShown: false,
        title: '',
        headerTitleStyle: {
          fontFamily: 'NotoSans-Bold',
        },
        headerRightContainerStyle: {
          right: 16,
        },
      }}
    />
    <Stack.Screen
      component={EditPasswordScreen}
      name={'EDIT_PASSWORD'}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      component={OrderHistoryScreen}
      name={'MY_ORDERS'}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default ProfileStack;
