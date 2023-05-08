import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import {
  CompositeScreenProps,
  useNavigation,
  useScrollToTop,
} from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ShopStackParamList } from '@src/navigation/Stacks/shop-stack';
import { Metrics, Colors } from '@src/assets';
import { BackgroundItemView, Container, SearchBar } from '../components';
import ProductItem from './components/ProductItem';

import { categoryData } from './CategoryData';
import { dummyData1 } from './dummy';
import { RootStackParamList } from '@src/navigation';
import ProductAPI from '@src/api/ProductAPI';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { getAllNewProductThunk } from '@src/redux/product/productThunk';

export interface Iitem {
  name: string;
  category: {
    name: string;
    apiName: string;
    image: string;
  }[];
}
[];

export type ShopScreenProp = CompositeScreenProps<
  StackScreenProps<ShopStackParamList, 'SHOP'>,
  StackScreenProps<RootStackParamList, 'SEARCH'>
>;

export type ShopNavigationProp = ShopScreenProp['navigation'];

const ShopScreen: FC = () => {
  const navigation = useNavigation<ShopNavigationProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const newProduct = useAppSelector(state => state.product_new.productNew);
  const dispatch = useAppDispatch();
  const ref = React.useRef(null);

  let AnimatedHeaderValue = new Animated.Value(0);

  const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, 60 - 0],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    dispatch(getAllNewProductThunk(user));
    return () => {};
  }, []);

  const onNavProductCategory = useCallback((item: Iitem): void => {
    navigation.navigate('PRODUCT_CATEGORY', {
      item: item,
    });
  }, []);

  const onNavSearch = useCallback(() => {
    navigation.navigate('SEARCH');
  }, []);

  useScrollToTop(ref);

  return (
    <Container bodyColor={Colors.white}>
      {/* Search bar */}
      <TouchableOpacity onPress={onNavSearch}>
        <SearchBar height={animatedHeaderHeight} />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={ref}
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
          { useNativeDriver: false },
        )}>
        {/* Top Background */}
        <View style={styles.viewBgImg}>
          <ImageBackground
            resizeMode="cover"
            style={{ flex: 1 }}
            source={{
              uri: 'https://www.tljus.com/wp-content/uploads/2019/11/home_topBanner.jpg"',
            }}
          />
          <View style={styles.viewBg}>
            <BackgroundItemView width={'10%'} backgroundColor={Colors.white}>
              <Ionicons name={'arrow-forward'} size={20} color={Colors.black} />
            </BackgroundItemView>
            <BackgroundItemView width={'52%'} backgroundColor={Colors.white}>
              <Text style={styles.txtBg}>Freshly Baked Everyday</Text>
            </BackgroundItemView>
            <BackgroundItemView width={'76%'} backgroundColor={Colors.white}>
              <Text style={styles.txtBg01}>
                Offering a variety of bakery goods passionately
              </Text>
            </BackgroundItemView>
          </View>
        </View>
        {categoryData.map((item, index) => (
          <TouchableOpacity
            onPress={() => onNavProductCategory(item)}
            style={styles.btnList}
            key={index}>
            <Text style={styles.txtBtn}>{item.name}</Text>
            <Ionicons
              name={'chevron-forward-outline'}
              size={22}
              color={Colors.black}
              style={styles.icChevron}
            />
          </TouchableOpacity>
        ))}
        <View style={styles.mt24}>
          <View style={styles.viewTitle}>
            <Text style={styles.txtProductTitle}>New arrivals</Text>
            <TouchableOpacity>
              <Text style={styles.txtSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={newProduct}
            renderItem={ProductItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* List 2 */}
        <View style={styles.mt24}>
          <View style={styles.viewTitle}>
            <Text style={styles.txtProductTitle}>Member Exclusives</Text>
            <TouchableOpacity>
              <Text style={styles.txtSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={dummyData1}
            renderItem={ProductItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* List 3 */}
        <View style={styles.mt24}>
          <View style={styles.viewTitle}>
            <Text style={styles.txtProductTitle}>Best seller</Text>
            <TouchableOpacity>
              <Text style={styles.txtSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={dummyData1}
            renderItem={ProductItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.viewFooter} />
      </ScrollView>
    </Container>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  btnList: {
    width: '100%',
    height: Metrics.screen.height / 16.675,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteSmoke,
  },
  txtBtn: {
    fontSize: 13.5,
    fontFamily: 'NotoSans-SemiBold',
    color: Colors.black,
    marginHorizontal: 32,
    textTransform: 'uppercase',
  },
  viewBgImg: {
    width: Metrics.screen.width,
    height: Metrics.screen.height / 3.6,
  },
  viewBg: {
    width: '100%',
    height: '40%',
    top: '58%',
    position: 'absolute',
    paddingLeft: 16,
  },
  txtBg: {
    fontSize: 14,
    fontFamily: 'NotoSans-Medium',
    color: Colors.black,
    textTransform: 'uppercase',
  },
  txtBg01: {
    fontSize: 12,
    fontFamily: 'NotoSans-Regular',
    color: Colors.black,
  },
  icChevron: { marginRight: 12 },
  btnProductList: {
    height: Metrics.screen.height / 3,
    width: Metrics.screen.width / 2.5,
    marginRight: 8,
    flexDirection: 'row',
    backgroundColor: Colors.veryLightGrey,
  },
  viewTitle: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtProductTitle: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 19,
    color: Colors.black,
    textTransform: 'uppercase',
    marginBottom: 20,
    marginLeft: 32,
  },
  txtSeeAll: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
    textTransform: 'uppercase',
    color: Colors.black,
    textDecorationLine: 'underline',
    top: 4,
  },
  viewProduct: { flex: 1 },
  viewImage: {
    backgroundColor: Colors.veryLightGrey,
    height: '55%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imgProduct: { width: '99%', height: '99%' },
  viewInfoProduct: {
    height: '45%',
    justifyContent: 'space-between',
    padding: 8,
  },
  viewCost: {
    backgroundColor: Colors.white,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCost: {
    fontFamily: 'NotoSans-Regular',
    color: Colors.black,
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
    fontSize: 12,
    flexWrap: 'wrap',
  },
  mt24: {
    marginTop: 24,
  },
  viewFooter: { height: 40 },
});
