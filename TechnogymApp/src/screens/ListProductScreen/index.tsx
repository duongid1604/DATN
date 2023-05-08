import React, { FC, useCallback, useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  CompositeScreenProps,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  favoriteProductThunk,
  getProductThunk,
} from '@src/redux/product/productThunk';
import { Container, Header } from '../components';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { ShopStackParamList } from '@src/navigation/Stacks/shop-stack';
import { Colors, Metrics } from '@src/assets';
import { ProductItem } from '@src/types';
import { RootStackParamList } from '@src/navigation';
import { getAllFavoriteProductThunk } from '@src/redux/favorite/favoriteThunk';
import { getUserIdFavorite } from '@src/redux/favorite/favoriteSlice';

export type ListProductScreenProp = CompositeScreenProps<
  StackScreenProps<ShopStackParamList, 'LIST_PRODUCT'>,
  StackScreenProps<RootStackParamList, 'DETAIL_STACK'>
>;

export type ListProductNavigationProp = ListProductScreenProp['navigation'];

type ListProductScreenRouteProp = RouteProp<ShopStackParamList, 'LIST_PRODUCT'>;

const ListProductScreen: FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ListProductScreenRouteProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const product = useAppSelector(state => state.category_product.product);
  const dispatch = useAppDispatch();
  const categoryName = route.params.name;
  const focus = useIsFocused();

  useEffect(() => {
    dispatch(getProductThunk({ user: user, category: categoryName }));
  }, [focus]);

  const onFavorite = useCallback(
    async (item: ProductItem) => {
      const payload = {
        user: user,
        productID: item._id,
      };
      await dispatch(favoriteProductThunk(payload));
      await dispatch(getProductThunk({ user: user, category: categoryName }));
      await dispatch(getAllFavoriteProductThunk(user));
      dispatch(getUserIdFavorite(user?.myInfo?._id));
    },
    [product],
  );

  const onNavDetail = useCallback((item: any) => {
    navigation.navigate('DETAIL_STACK', {
      screen: 'DETAIL',
      params: { item: item },
    });
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductItem | any;
    index: number;
  }) => (
    <View>
      <TouchableWithoutFeedback onPress={() => onNavDetail(item)}>
        <View
          style={[
            index % 2 !== 0
              ? styles.viewItem
              : { ...styles.viewItem, borderRightWidth: 2 },
          ]}>
          <View style={styles.viewImage}>
            <Image
              style={styles.imgProduct}
              source={{
                uri: item?.img,
              }}
            />
          </View>
          <View style={styles.viewSmallItem}>
            <View style={styles.viewInfoProduct}>
              <View style={styles.viewCost}>
                <Text style={styles.txtCost}>{`$${item?.price}.00`}</Text>
              </View>
              <Text style={styles.txtTitle}>{item?.title}</Text>
              <Text style={styles.txtType}>{item?.categories}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.viewBtnIc}>
        <TouchableOpacity onPress={() => onFavorite(item)}>
          {item?.favorite?.includes(user?.myInfo?._id) ? (
            <Ionicons name="heart" size={25} color={Colors.black} />
          ) : (
            <Ionicons name="heart-outline" size={25} color={Colors.black} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Container
      bodyColor={Colors.white}
      header={
        <Header
          icon="arrow-back-outline"
          textIcon={route.params.itemName}
          iconSize={24}
          icColor={Colors.black}
        />
      }>
      <View style={styles.viewList}>
        <FlatList
          data={product}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
        />
      </View>
    </Container>
  );
};

export default ListProductScreen;

const styles = StyleSheet.create({
  viewItem: {
    height: Metrics.screen.height / 2.6,
    width: Metrics.screen.width / 2,
    backgroundColor: Colors.white,
    borderBottomWidth: 2,
    borderColor: Colors.greyZircon,
  },
  viewImage: {
    height: '64%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imgProduct: { width: '99%', height: '99%' },
  viewInfoProduct: {
    height: '100%',
    width: '84%',
    justifyContent: 'space-between',
    padding: 8,
  },
  viewSmallItem: { flexDirection: 'row', height: '36%' },
  viewCost: {
    backgroundColor: Colors.black,
    width: '42%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCost: {
    fontFamily: 'NotoSans-Medium',
    fontSize: 13,
    color: Colors.white,
    letterSpacing: 1,
  },
  txtTitle: {
    fontFamily: 'NotoSans-SemiBold',
    color: Colors.black,
    textTransform: 'uppercase',
    flexWrap: 'wrap',
  },
  txtType: {
    fontFamily: 'NotoSans-Regular',
    color: Colors.dimGray,
    fontSize: 13,
    flexWrap: 'wrap',
  },
  viewBtnIc: {
    width: '16%',
    top: '66%',
    left: '82%',
    position: 'absolute',
    alignItems: 'center',
  },
  viewList: { alignItems: 'center' },
});
