import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { OrderData } from '../data';
import { CartStackParamList } from '@src/navigation/Stacks/cart-stack';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { Colors, Metrics } from '@src/assets';
import { deleteCart } from '@src/redux/cart/cartSlice';
import { MyCart, ProductOrder } from '@src/types';
import PaymentAPI from '@src/api/PaymentAPI';
import { postCartThunk } from '@src/redux/cart/cartThunk';
import { postOrderThunk } from '@src/redux/order/orderThunk';
import Toast from 'react-native-toast-message';

type ModalScreenProp = StackNavigationProp<CartStackParamList, 'MODAL_PAYMENT'>;

type ListProductScreenRouteProp = RouteProp<
  CartStackParamList,
  'MODAL_PAYMENT'
>;

const ModalPayment: FC = () => {
  const [orderCart, setOrderCart] = useState<MyCart>({
    userId: '',
    products: [],
  });
  const [listProduct, setListProduct] = useState<Array<ProductOrder>>();
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  const stripe = useStripe();
  const route = useRoute<ListProductScreenRouteProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ModalScreenProp>();

  const transY = useRef(new Animated.Value(Metrics.screen.height / 2)).current;

  useEffect(() => {
    Animated.timing(transY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const myBag = cart;
    let products: Array<any> = [];
    for (const i of myBag) {
      let { categories, img, price, title, size, ...others } = i;
      products.push(others);
    }
    const myCart: MyCart = {
      userId: user?.myInfo?._id,
      products,
    };

    setListProduct(products);
    setOrderCart(myCart);
  }, []);

  const onPostCart = useCallback(() => {
    try {
      const fetchData = async () => {
        const request = {
          user: user,
          payload: orderCart,
        };
        await dispatch(postCartThunk(request));
      };
      return fetchData();
    } catch (error) {
      console.log('onPostCart error');
    }
  }, [orderCart]);

  const Payment = async () => {
    try {
      const request = {
        user: user,
        payload: {
          userId: user?.myInfo?._id,
          products: listProduct,
          amount: route.params.totalPrice,
          address: user?.myInfo?.address,
          status: 'Succeeded',
        },
      };

      const requestPending = {
        user: user,
        payload: {
          userId: user?.myInfo?._id,
          products: listProduct,
          amount: route.params.totalPrice,
          address: user?.myInfo?.address,
        },
      };

      const payload = {
        shipping: 'Delivery',
        address: user?.myInfo?.address,
        phoneNumber: '0768298951',
        promoCode: 'none',
        totalPrice: route.params.totalPrice,
      };
      const response = await PaymentAPI.requestPayment({ user, payload });
      const clientSecret = response.data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Merchant Name',
      });
      if (initSheet.error)
        return Toast.show({
          type: 'error',
          text1: 'Notification',
          text2: initSheet.error.message,
        });
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });

      if (presentSheet.error) {
        await dispatch(postOrderThunk(requestPending));
        setModalVisible(true);
        return Toast.show({
          type: 'error',
          text1: 'Notification',
          text2: presentSheet.error.message,
        });
      } else {
        await dispatch(postOrderThunk(request));
        Toast.show({
          type: 'success',
          text1: 'Payment complete',
          text2: 'Please check your order',
        });
      }
      await onPostCart();
      navigation.goBack();
      dispatch(deleteCart());
    } catch (err) {
      Alert.alert('Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        ]}
        onPress={navigation.goBack}
      />
      <StripeProvider publishableKey="pk_test_51M7gPYACPyXHkSWyZjWuG7v9KKgkNdE1YJ6XwFGmQT0R8aUKgf22ZHBthklv4WE4jfNlc6dU3jPWIJE8KktHDNVh008r0Ye9oB">
        <Animated.View
          style={[
            styles.container,
            { translateY: transY, backgroundColor: colors.card },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.txtCheckout}>Checkout</Text>
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons name="close" size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>
          <View style={{ top: 20 }}>
            {OrderData.map((val, idx) => (
              <TouchableOpacity
                style={[
                  styles.viewOrder,
                  {
                    borderBottomWidth: idx === OrderData.length - 1 ? 0.5 : 0,
                  },
                ]}
                key={val.id}>
                <Text style={styles.txtTitle}>{val.title}</Text>
                <Text style={styles.txtContent}>
                  {idx === 2 ? `${route.params.totalPrice}.00 $` : val.content}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={Payment} style={styles.btnOrder}>
            <Text style={styles.txtOrder}>Place order</Text>
            <Ionicons name={'arrow-forward'} size={22} color={Colors.white} />
          </TouchableOpacity>
        </Animated.View>
      </StripeProvider>
    </SafeAreaView>
  );
};

export default ModalPayment;

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    paddingVertical: 32,
    paddingHorizontal: 32,
    width: '100%',
    height: Metrics.screen.height / 2.2,
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
    fontSize: 18,
    color: Colors.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
    bottom: 2,
  },
  txtOrder: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 15,
    color: Colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
    bottom: 2,
  },
  viewOrder: {
    height: '24%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: Colors.nobelGrey,
  },
  txtTitle: {
    fontFamily: 'NotoSans-Medium',
    fontSize: 14.5,
    color: Colors.nobelGrey,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  txtContent: {
    fontFamily: 'NotoSans-Medium',
    fontSize: 13.5,
    color: Colors.black,
  },
});
