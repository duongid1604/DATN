import React, { FC, useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { OptionData, OptionDataType } from '../data';
import { FavoriteStackParamList } from '@src/navigation/Stacks/favorite-stack';
import { Metrics, Colors } from '@src/assets';
import { setCart } from '@src/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { favoriteProductThunk } from '@src/redux/product/productThunk';
import { getAllFavoriteProductThunk } from '@src/redux/favorite/favoriteThunk';
import { getUserIdFavorite } from '@src/redux/favorite/favoriteSlice';

type ModalScreenProp = StackNavigationProp<FavoriteStackParamList, 'MODAL'>;

type ModalScreenRouteProp = RouteProp<FavoriteStackParamList, 'MODAL'>;

const ModalScreen: FC = () => {
  const navigation = useNavigation<ModalScreenProp>();
  const { colors } = useTheme();
  const route = useRoute<ModalScreenRouteProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const favorite = useAppSelector(state => state.favorite.product);
  const dispatch = useAppDispatch();
  const transY = useRef(new Animated.Value(Metrics.screen.height / 2)).current;

  useEffect(() => {
    Animated.timing(transY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const onAction = useCallback(async (val: OptionDataType) => {
    const payload = {
      user: user,
      productID: route.params.item._id,
    };
    if (val.id === '1') {
      const cartPayload = {
        productID: route.params.item._id,
        categories: route.params.item.categories,
        title: route.params.item.title,
        img: route.params.item.img,
        size: route.params.item.size,
        price: route.params.item.price,
        quantity: 1,
      };
      dispatch(setCart(cartPayload));
      await dispatch(favoriteProductThunk(payload));
      navigation.goBack();
    } else if (val.id === '2') {
      await dispatch(favoriteProductThunk(payload));
      navigation.goBack();
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={[
          styles.container,
          { translateY: transY, backgroundColor: colors.card },
        ]}>
        <View style={styles.viewCheckout}>
          <Text style={styles.txtCheckout}>Options</Text>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="close" size={30} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <View style={{ top: 20 }}>
          {OptionData.map((val, idx) => (
            <TouchableOpacity
              onPress={() => onAction(val)}
              style={styles.viewOrder}
              key={val.id}>
              <Ionicons name={val.icon} size={24} color={Colors.black} />
              <Text style={styles.txtTitle}>{val.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.btnOrder}>
          <Text style={styles.txtOrder}>Buy it now</Text>
          <Ionicons name={'arrow-forward'} size={22} color={Colors.white} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    paddingTop: 18,
    paddingBottom: 32,
    paddingHorizontal: 32,
    width: '100%',
    height: Metrics.screen.height / 2.4,
    justifyContent: 'space-between',
  },
  viewCheckout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnOrder: {
    padding: 10,
    backgroundColor: Colors.black,
    height: '17%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtCheckout: {
    fontFamily: 'NotoSans-ExtraBold',
    fontSize: 20,
    color: Colors.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
    bottom: 2,
  },
  txtOrder: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    bottom: 2,
  },
  viewOrder: {
    height: '32%',
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.veryLightGrey,
  },
  txtTitle: {
    fontFamily: 'NotoSans-Medium',
    fontSize: 13.5,
    color: Colors.black,
    letterSpacing: 1,
    marginLeft: 8,
  },
  txtContent: {
    fontFamily: 'NotoSans-Medium',
    fontSize: 13.5,
    color: Colors.black,
  },
});
