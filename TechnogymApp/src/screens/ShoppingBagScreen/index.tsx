import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import ProductCount from '../components/ProductCount';
import ProductList from './components/ProductList';
import { Colors, Metrics } from '@src/assets';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { BackgroundItemView, Container, Footer } from '../components';
import { CartStackParamList } from '@src/navigation/Stacks/cart-stack';
import { FavoriteStackParamList } from '@src/navigation/Stacks/favorite-stack';
import { decreaseQuantity, increaseQuantity } from '@src/redux/cart/cartSlice';

const ITEM_HEIGHT = Metrics.screen.height / 5.6;

export type ShoppingBagScreenProp = CompositeScreenProps<
  StackScreenProps<CartStackParamList, 'SHOPPING_BAG'>,
  StackScreenProps<FavoriteStackParamList, 'FAVORITE'>
>;

export type ShoppingBagNavigationProp = ShoppingBagScreenProp['navigation'];

const ShoppingBagScreen: FC = () => {
  const navigation = useNavigation<ShoppingBagNavigationProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // try {
    //   requestGetUserCart({ user });
    // } catch (error) {
    //   console.log('get user cart error', error);
    // }
  }, []);

  const onNavWishList = useCallback(() => {
    navigation.navigate('FAVORITE');
  }, []);

  let totalPrice = useMemo(() => {
    return cart.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.quantity,
      0,
    );
  }, [cart]);

  const onCheckout = useCallback(() => {
    navigation.navigate('MODAL_PAYMENT', {
      totalPrice,
    });
  }, [totalPrice]);

  const ProductList = ({ item }: { item: any }) => {
    const [quantityChange, setQuantityChange] = useState<number>(
      item?.quantity,
    );

    const onIncrease = (productID: string) => {
      dispatch(increaseQuantity(productID));
    };

    const onDecrease = (productID: string) => {
      dispatch(decreaseQuantity(productID));
    };

    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemChildContainer}>
          <Image source={{ uri: item.img }} style={styles.img} />
          <View style={styles.viewMainList}>
            <Text style={styles.txtExistTitle}>{item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <BackgroundItemView backgroundColor={Colors.black}>
                <Text style={{ color: Colors.white }}>${item.price}</Text>
              </BackgroundItemView>
              <Text style={styles.txtQuantity}>Quantity: {quantityChange}</Text>
            </View>
            {/* <CartButton textButton="Save Item" /> */}
            <View style={styles.viewQuantityChange}>
              <TouchableOpacity
                onPress={() => onDecrease(item?.productID)}
                disabled={!!(item?.quantity === 1)}
                style={styles.btnQuantity}>
                <FeatherIcon name="minus" size={20} color={Colors.white} />
              </TouchableOpacity>
              <Text style={styles.txtQuantityChange}>{item?.quantity}</Text>
              <TouchableOpacity
                onPress={() => onIncrease(item?.productID)}
                style={[styles.btnQuantity, { backgroundColor: Colors.white }]}>
                <FeatherIcon name="plus" size={20} color={Colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{ alignSelf: 'center' }}>
            <Ionicons
              name={'ellipsis-vertical'}
              size={24}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Container
      bodyColor={Colors.white}
      footer={
        cart.length !== 0 ? (
          <Footer
            bgColor={Colors.white}
            height={114}
            total={totalPrice}
            onCheckout={onCheckout}
          />
        ) : (
          <></>
        )
      }>
      {cart.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.txtTitle}>Your cart is empty</Text>
          <Text style={styles.txtTips}>Add items from your Wishlist</Text>
          <TouchableOpacity
            style={styles.btnNavWishlist}
            onPress={onNavWishList}>
            <View style={styles.viewMain}>
              <Ionicons name={'heart-outline'} size={24} color={Colors.black} />
              <Text style={styles.txtBtn}>Wishlist</Text>
            </View>
            <Ionicons
              name={'arrow-forward-outline'}
              size={24}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.existProductContainer}>
          <ProductCount productCount={cart.length} />
          <FlatList
            data={cart}
            renderItem={(props: any) => <ProductList {...props} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </Container>
  );
};

export default ShoppingBagScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 42,
  },
  existProductContainer: {
    flex: 1,
  },
  viewMain: { flexDirection: 'row' },
  btnNavWishlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: Metrics.screen.height / 16.875,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  txtTitle: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 18,
    color: Colors.black,
    textTransform: 'uppercase',
  },
  txtTips: {
    fontSize: 13,
    fontFamily: 'NotoSans-Regular',
    color: Colors.black,
    paddingBottom: 12,
  },
  txtBtn: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 15,
    color: Colors.black,
    textTransform: 'uppercase',
    bottom: 2,
    marginLeft: 8,
  },
  viewBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    left: 38,
  },
  renderItemContainer: {
    width: Metrics.screen.width,
    height: ITEM_HEIGHT,
    backgroundColor: Colors.whiteSmoke,
    borderBottomWidth: 2.5,
    borderBottomColor: Colors.white,
    justifyContent: 'center',
    padding: 6,
  },
  viewMainList: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  viewQuantityChange: {
    width: '42%',
    height: '32%',
    top: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: Colors.greyBlack,
  },
  btnQuantity: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.nobelGrey,
  },
  renderItemChildContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingRight: 10,
  },
  txtExistTitle: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 14,
    color: Colors.black,
    textTransform: 'uppercase',
    flexWrap: 'wrap',
    width: '86%',
    bottom: 4,
  },
  txtQuantity: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 13,
    color: Colors.grey,
    flexWrap: 'wrap',
    bottom: 4,
    marginLeft: 14,
  },
  txtQuantityChange: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
    color: Colors.neroGrey,
    bottom: 2,
  },
  img: {
    height: '100%',
    width: ITEM_HEIGHT - 12,
  },
});
