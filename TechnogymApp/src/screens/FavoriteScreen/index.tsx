import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CompositeScreenProps,
  NavigationContainer,
  RouteProp,
  useIsFocused,
  useNavigation,
  useScrollToTop,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Metrics } from '../../assets';
import BackgroundItemView from '../components/BackgroundItemView';

import { ItemCart, ProductList as ProductListType } from '@src/types';
import { ProductItem as ProductItemType } from '@src/types';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { getAllFavoriteProductThunk } from '@src/redux/favorite/favoriteThunk';
import { Container, ProductCount, ProductList } from '../components';
import ProductItem from './components/ProductItem';
import { getUserIdFavorite } from '@src/redux/favorite/favoriteSlice';
import ListFooter from './components/ListFooter';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { FavoriteStackParamList } from '@src/navigation/Stacks/favorite-stack';
import CartButton from './components/CartButton';
import { favoriteProductThunk } from '@src/redux/product/productThunk';
import { RootStackParamList } from '@src/navigation';

const ITEM_HEIGHT = Metrics.screen.height / 5.6;

export type FavoriteScreenProp = CompositeScreenProps<
  StackScreenProps<FavoriteStackParamList, 'FAVORITE'>,
  StackScreenProps<RootStackParamList, 'DETAIL_STACK'>
>;

export type FaviroteNavigationProp = FavoriteScreenProp['navigation'];

type FavoriteScreenRouteProp = RouteProp<FavoriteStackParamList, 'FAVORITE'>;

const FavoriteScreen: FC = () => {
  const [products, setProducts] = useState<ProductListType>();

  const navigation = useNavigation<FaviroteNavigationProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const cart = useAppSelector(state => state.cart);
  const favorite = useAppSelector(state => state.favorite.product);
  const recent = useAppSelector(state => state.recent);
  const dispatch = useAppDispatch();

  const ref = useRef(null);
  const isFocused = useIsFocused();
  useScrollToTop(ref);

  useEffect(() => {
    const onFetch = async () => {
      await dispatch(getAllFavoriteProductThunk(user));
      dispatch(getUserIdFavorite(user?.myInfo?._id));
    };
    onFetch();
  }, [isFocused, cart]);

  const onNavModal = useCallback((item: ProductItemType) => {
    navigation.navigate('MODAL', {
      item: item,
    });
  }, []);

  const onNavDetail = useCallback((item: any) => {
    navigation.navigate('DETAIL_STACK', {
      screen: 'DETAIL',
      params: { item: item },
    });
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemChildContainer}>
          <TouchableOpacity onPress={() => onNavDetail(item)}>
            <Image source={{ uri: item.img }} style={styles.img} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavDetail(item)}
            style={styles.viewMain}>
            <Text style={styles.txtExistTitle}>{item.title}</Text>
            <BackgroundItemView backgroundColor={Colors.black}>
              <Text style={{ color: Colors.white }}>${item.price}</Text>
            </BackgroundItemView>
            <CartButton textButton="Add to bag" item={item} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavModal(item)}
            style={{ alignSelf: 'center' }}>
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
    <Container bodyColor={Colors.white}>
      {favorite?.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.txtTitle}>Nothing saved yet</Text>
          <Text style={styles.txtTips}>
            Tap the heart icon to save items here for later.
          </Text>
          <BackgroundItemView
            width={'48%'}
            height={'4%'}
            backgroundColor={Colors.white}>
            <View style={styles.viewBtn}>
              <Text style={styles.txtBtn}>Recently viewed</Text>
              <Ionicons name={'arrow-forward'} size={20} color={Colors.black} />
            </View>
          </BackgroundItemView>
          <View style={{ marginTop: 24 }}>
            <FlatList
              data={recent}
              renderItem={(props: any) => ProductItem({ ...props, recent })}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      ) : (
        <View style={styles.existProductContainer}>
          <ProductCount productCount={favorite?.length} />
          <FlatList
            data={favorite}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
            ref={ref}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <ListFooter />}
          />
        </View>
      )}
    </Container>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  existProductContainer: {
    flex: 1,
  },
  txtTitle: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 18,
    color: Colors.black,
    textTransform: 'uppercase',
    marginLeft: 42,
  },
  txtTips: {
    fontSize: 13,
    fontFamily: 'NotoSans-Regular',
    color: Colors.black,
    paddingBottom: 12,
    marginLeft: 42,
  },
  viewBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // right: 4,
    left: 38,
  },
  txtBtn: {
    fontSize: 13,
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    textTransform: 'uppercase',
    bottom: 1,
  },
  renderItemContainer: {
    width: Metrics.screen.width,
    height: ITEM_HEIGHT,
    backgroundColor: Colors.greyZircon,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.white,
    justifyContent: 'center',
    padding: 6,
  },
  viewMain: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  renderItemChildContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  img: {
    height: '100%',
    width: ITEM_HEIGHT - 12,
  },
});
