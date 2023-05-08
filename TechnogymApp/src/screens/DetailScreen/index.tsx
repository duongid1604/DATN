import React, { FC, useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import {
  CompositeScreenProps,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabStackParamList } from '@src/navigation/Stacks/bottom-tab-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Metrics } from '../../assets';
import RatingBar from './components/RatingBar';
import RatingStar from './components/RatingStar';
import QuestionView from './components/QuestionView';
import InfomationView from './components/InfomationView';
import { ShopStackParamList } from '@src/navigation/Stacks/shop-stack';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { setCart } from '@src/redux/cart/cartSlice';
import { Container } from '../components';
import { favoriteProductThunk } from '@src/redux/product/productThunk';
import { setRecent } from '@src/redux/recent/recentSlice';
import { getDetailProductThunk } from '@src/redux/productDetail/productDetailThunk';
import { getAllFavoriteProductThunk } from '@src/redux/favorite/favoriteThunk';
import { DetailStackParamList } from '@src/navigation/Stacks/detail-stack';
import ListImage from './components/ListImage';
import Loading from '../components/Loading';
import { getProductCommentThunk } from '@src/redux/comment/commentThunk';
import { getUserIdFavorite } from '@src/redux/favorite/favoriteSlice';

export type DetailScreenProp = CompositeScreenProps<
  StackScreenProps<DetailStackParamList, 'DETAIL'>,
  BottomTabScreenProps<BottomTabStackParamList, 'CART_STACK'>
>;

export type DetailScreenNavigationProp = DetailScreenProp['navigation'];

type DetailScreenRouteProp = RouteProp<DetailStackParamList, 'DETAIL'>;

const ITEM_HEIGHT = Metrics.screen.height * 0.55;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const DetailScreen: FC = () => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const route = useRoute<DetailScreenRouteProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const detailProduct = useAppSelector(state => state.detailProduct.product);
  const favorite = useAppSelector(state => state.favorite.product);
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const scrollY = useRef(new Animated.Value(0)).current;

  const { commentData } = useAppSelector(state => state.comment);

  useEffect(() => {
    dispatch(
      getProductCommentThunk({
        user: user,
        productId: route?.params?.item?._id,
      }),
    );

    const recentView = {
      productID: route?.params?.item?._id,
      categories: route?.params?.item?.categories,
      title: route?.params?.item?.title,
      img: route?.params?.item?.img,
      size: route?.params?.item?.size,
      price: route?.params?.item?.price,
    };
    dispatch(setRecent(recentView));

    const onFetch = async () => {
      await dispatch(
        getDetailProductThunk({
          user: user,
          productId: route?.params?.item?._id,
        }),
      );
    };

    onFetch();
  }, [favorite]);

  const onNavGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onFavorite = useCallback(async () => {
    const payload = {
      productID: route?.params?.item?._id,
      user: user,
    };
    await dispatch(favoriteProductThunk(payload));
    await dispatch(getAllFavoriteProductThunk(user));
    dispatch(getUserIdFavorite(user?.myInfo?._id));
  }, []);

  const onAddToBag = useCallback(() => {
    const cartState = {
      productID: route?.params?.item?._id,
      categories: route?.params?.item?.categories,
      title: route?.params?.item?.title,
      img: route?.params?.item?.img,
      size: route?.params?.item?.size,
      price: route?.params?.item?.price,
      quantity: 1,
    };
    dispatch(setCart(cartState));
    navigation.navigate('CART_STACK');
  }, [cart]);

  const onNavComment = useCallback(() => {
    navigation.navigate('REVIEW', {
      productId: route?.params?.item?._id,
      img: route?.params?.item?.img,
    });
  }, []);

  return (
    <Container header bodyColor={Colors.white}>
      <ListImage image={route?.params?.item?.img} />
      <TouchableOpacity onPress={onNavGoBack} style={styles.btnClose}>
        <Ionicons name={'close'} size={32} color={Colors.black} />
      </TouchableOpacity>
      <BottomSheet
        index={0}
        backgroundStyle={{
          backgroundColor: Colors.greyZircon,
          borderRadius: 0,
        }}
        snapPoints={[
          Metrics.screen.height - ITEM_HEIGHT,
          Metrics.screen.height - 60,
        ]}>
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          style={styles.btmScrollView}>
          <View>
            <View style={styles.viewBtm}>
              <View style={styles.viewBtmChild}>
                <Text style={styles.txtProductTitle}>
                  {route?.params?.item?.title}
                </Text>
                <TouchableOpacity onPress={onFavorite}>
                  {!!user?.myInfo &&
                  detailProduct?.favorite?.includes(user?.myInfo?._id) ? (
                    <Ionicons name={'heart'} size={24} color={Colors.black} />
                  ) : (
                    <Ionicons
                      name={'heart-outline'}
                      size={24}
                      color={Colors.black}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.viewProductInfo}>
                <Text style={styles.txtCost}>
                  $ {route?.params?.item?.price}.00
                </Text>
                <Text style={styles.txtProductType}>
                  {route?.params?.item?.ingredient[0]}
                </Text>
              </View>
            </View>
            <View style={styles.viewBtn}>
              <TouchableOpacity style={styles.btnAdd} onPress={onAddToBag}>
                <Text style={styles.txtBtn}>Add to bag</Text>
                <Ionicons
                  name={'cart-outline'}
                  size={26}
                  color={Colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null} style={styles.btnBuy}>
                <Text style={[styles.txtBtn, { color: Colors.white }]}>
                  Buy it now
                </Text>
                <Ionicons
                  name={'arrow-forward-outline'}
                  size={26}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
            {/* INFOMATION */}
            <InfomationView
              desc={route?.params?.item?.desc}
              info="Height X Length X Width: 14 X 21.5 X 4.5 cm. /5.5 X 8.4 x 1.7"
            />
            {/* RATING */}
            <View style={[styles.viewRate, { marginTop: 36 }]}>
              <Text style={styles.txtRate}>Ratings & review</Text>
              <View style={styles.viewRating}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.txt47}>4.7</Text>
                  <RatingStar star={3} />
                  <TouchableOpacity onPress={onNavComment}>
                    <Text style={styles.txtReview}>
                      {commentData?.length} REVIEWS
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, left: 16 }}>
                  <Text
                    style={{
                      fontFamily: 'NotoSans-MediumItalic',
                      fontSize: 56,
                      color: Colors.black,
                    }}>
                    {route?.params?.item?.recommend[0]}
                  </Text>
                  <Text style={styles.txtMini}>
                    of customers recomend this product
                  </Text>
                </View>
              </View>
            </View>
            {/* RATING2 */}
            <RatingBar
              rate="60%"
              title="Size"
              start="Small"
              mid="Normal"
              end="Large"
            />
            <RatingBar
              rate={route?.params?.item?.recommend[1]}
              title="Quality"
              start="Poor"
              mid="good"
              end="Perfect"
            />
            <RatingBar
              rate={route?.params?.item?.recommend[2]}
              title="Sweetness"
              start="Tasteless"
              end="Very sweet"
            />
            {/* HELP */}
            <QuestionView />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </Container>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  btnClose: {
    position: 'absolute',
    width: 32,
    height: 32,
    top: Metrics.screen.height / 56,
    right: 12,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btmScrollView: {
    backgroundColor: Colors.greyZircon,
  },
  viewBtm: {
    width: Metrics.screen.width,
    height: Metrics.screen.height / 5.6,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.whiteGainsboro,
    justifyContent: 'space-around',
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  viewBtmChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtProductTitle: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 20,
    textTransform: 'uppercase',
    bottom: 2,
    color: Colors.black,
  },
  viewProductInfo: {
    flexDirection: 'row',
  },
  txtCost: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
    color: Colors.black,
  },
  txtProductType: {
    fontFamily: 'NotoSans-Medium',
    fontSize: 16,
    textTransform: 'uppercase',
    marginLeft: 24,
    color: Colors.black,
  },
  viewBtn: {
    paddingVertical: 36,
    paddingHorizontal: 16,
  },
  txtBtn: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.black,
    bottom: 2,
  },
  btnAdd: {
    width: '100%',
    height: Metrics.screen.height / 16.25,
    borderWidth: 1.5,
    borderColor: Colors.black,
    marginBottom: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnBuy: {
    width: '100%',
    height: Metrics.screen.height / 16.875,
    backgroundColor: Colors.black,
    marginBottom: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtRate: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 23,
    textTransform: 'uppercase',
    bottom: 2,
    letterSpacing: 2,
    color: Colors.black,
  },
  viewRate: { paddingHorizontal: 28 },
  txtMini: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 13,
    color: Colors.black,
  },
  txtReview: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    textTransform: 'uppercase',
    color: Colors.black,
    letterSpacing: 2,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    marginTop: 10,
  },
  viewRating: {
    flexDirection: 'row',
    width: '76%',
    marginTop: 24,
  },
  txt47: {
    fontFamily: 'NotoSans-MediumItalic',
    fontSize: 56,
    color: Colors.black,
  },
});
