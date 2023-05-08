import React, { FC, memo, useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { favoriteProductThunk } from '@src/redux/product/productThunk';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import BackgroundItemView from '../../components/BackgroundItemView';
import { Colors } from '@src/assets';
import { removeItemCart, setCart } from '@src/redux/cart/cartSlice';
import { getAllFavoriteProductThunk } from '@src/redux/favorite/favoriteThunk';
import { getUserIdFavorite } from '@src/redux/favorite/favoriteSlice';

interface Props {
  textButton?: string;
  onPress?: () => void;
  item?: any;
}

const CartButton: FC<Props> = ({ textButton, onPress, item }) => {
  const cart = useAppSelector(state => state.cart);
  const user = useAppSelector(state => state.auth.userInfo);
  const dispatch = useAppDispatch();

  const onAddToBag = useCallback(async () => {
    const bagState = {
      productID: item?._id,
      categories: item?.categories,
      title: item?.title,
      img: item?.img,
      size: item?.size,
      price: item?.price,
      quantity: 1,
    };
    const payload = {
      productID: item._id,
      user: user,
    };
    // await dispatch(favoriteProductThunk(payload));
    dispatch(setCart(bagState));
    await dispatch(getAllFavoriteProductThunk(user));
    dispatch(getUserIdFavorite(user?.myInfo?._id));
  }, [cart]);

  const onRemoveItemBag = useCallback(async () => {
    const bagState = {
      productID: item?._id,
      categories: item?.categories,
      title: item?.title,
      img: item?.img,
      size: item?.size,
      price: item?.price,
      quantity: 1,
    };
    const payload = {
      productID: item._id,
      user: user,
    };
    await dispatch(favoriteProductThunk(payload));
    dispatch(removeItemCart(bagState));
    await dispatch(getAllFavoriteProductThunk(user));
    dispatch(getUserIdFavorite(user?.myInfo?._id));
  }, [cart]);

  return (
    <TouchableWithoutFeedback onPress={item ? onAddToBag : onRemoveItemBag}>
      <View style={styles.viewMainBtn}>
        <BackgroundItemView
          backgroundColor={Colors.white}
          height={'100%'}
          border={1}>
          <View style={styles.viewBtn}>
            <Text style={styles.txtBg}>{textButton}</Text>
            <Ionicons name={'cart-outline'} size={20} color={Colors.black} />
          </View>
        </BackgroundItemView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(CartButton);

const styles = StyleSheet.create({
  viewMainBtn: { width: '68%', height: '28%' },
  viewBtn: {
    width: 108,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtBg: {
    fontSize: 13,
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    textTransform: 'uppercase',
    marginBottom: 2,
    // textDecorationLine: 'underline',
  },
});
