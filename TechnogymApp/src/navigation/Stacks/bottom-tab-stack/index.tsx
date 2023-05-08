import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import { ShoppingBagScreen } from '@src/screens';
import HomeStack from '../home-stack';
import ShopStack from '../shop-stack';
import ProfileStack from '../profile-stack';
import FavoriteStack from '../favorite-stack';

import { Colors } from '@src/assets';
import { useAppSelector } from '@src/hooks/useRedux';
import CartStack from '../cart-stack';
import { StyleSheet, View } from 'react-native';

export type BottomTabStackParamList = {
  HOME_STACK: undefined;
  SHOP_STACK: undefined;
  FAVORITE_STACK: undefined;
  CART_STACK: undefined;
  PROFILE_STACK: undefined;
};

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabStack = () => {
  const cart = useAppSelector(state => state.cart);
  const favorite = useAppSelector(state => state.favorite.product);

  return (
    <Tab.Navigator>
      <Tab.Screen
        component={HomeStack}
        name="HOME_STACK"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => (
            <>
              {focused ? (
                <View style={styles.viewTabBarBtn}>
                  <Feather name="home" size={size} color={Colors.black} />
                </View>
              ) : (
                <Feather name="home" size={size} color={Colors.black} />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        component={ShopStack}
        name="SHOP_STACK"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => (
            <>
              {focused ? (
                <View style={styles.viewTabBarBtn}>
                  <Feather name="search" size={size} color={Colors.black} />
                </View>
              ) : (
                <Feather name="search" size={size} color={Colors.black} />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        component={FavoriteStack}
        name="FAVORITE_STACK"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBadgeStyle: styles.tabBarBadge,
          tabBarBadge:
            !!favorite && favorite?.length > 0 ? favorite.length : undefined,
          tabBarIcon: ({ focused, size }) => (
            <>
              {focused ? (
                <View style={styles.viewTabBarBtn}>
                  <Feather name="heart" size={size} color={Colors.black} />
                </View>
              ) : (
                <Feather name="heart" size={size} color={Colors.black} />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        component={CartStack}
        name="CART_STACK"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBadgeStyle: styles.tabBarBadge,
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
          tabBarIcon: ({ focused, size }) => (
            <>
              {focused ? (
                <View style={styles.viewTabBarBtn}>
                  <Feather
                    name="shopping-bag"
                    size={size}
                    color={Colors.black}
                  />
                </View>
              ) : (
                <Feather name="shopping-bag" size={size} color={Colors.black} />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        component={ProfileStack}
        name="PROFILE_STACK"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => (
            <>
              {focused ? (
                <View style={styles.viewTabBarBtn}>
                  <Feather name="user" size={size} color={Colors.black} />
                </View>
              ) : (
                <Feather name="user" size={size} color={Colors.black} />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;

const styles = StyleSheet.create({
  viewTabBarBtn: {
    width: '90%',
    height: '100%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.greyBlack,
  },
  tabBarBadge: {
    height: 16,
    borderRadius: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    top: '60%',
    fontFamily: 'NotoSans-Bold',
    color: 'white',
  },
});
