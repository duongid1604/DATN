import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { Container, Header, ProductCount } from '../components';
import { Colors, Metrics } from '@src/assets';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { getUserOrderThunk } from '@src/redux/order/orderThunk';
import { orderBy } from 'lodash';

const OrderHistoryScreen = () => {
  const user = useAppSelector(state => state.auth.userInfo);
  const order = useAppSelector(state => state.order.orderData);
  const dispatch = useAppDispatch();

  const orderReverse = [...order].reverse();

  useEffect(() => {
    dispatch(getUserOrderThunk({ user }));
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={{ flexDirection: 'row' }}>
          {item?.products.map((e: any) => (
            <Image
              key={e?._id}
              source={{ uri: e?.productID?.img }}
              style={{ width: 40, height: 40, marginRight: 6 }}
            />
          ))}
        </View>
        <View style={styles.item}>
          {/* <Text style={styles.text01} numberOfLines={1}>
            Tracking ID: ALN{item?._id}
          </Text> */}
          <View style={styles.wrap}>
            <View style={[styles.viewWrap, { marginRight: 6 }]}>
              <Text style={styles.text02}>
                {new Date(item?.createdAt).toISOString().split('T')[0]}
              </Text>
            </View>
            <View style={styles.viewWrap}>
              <Text style={styles.text02}>${item?.amount}</Text>
            </View>
          </View>
          <View style={[styles.viewWrap, styles.viewWrapSE]}>
            <Text
              style={[
                styles.text02,
                {
                  color: Colors.black,
                  textTransform: 'uppercase',
                  fontFamily: 'NotoSans-SemiBold',
                },
              ]}>
              PAYMENT {item?.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      header={
        <Header
          icon="arrow-back-outline"
          textIcon={`Order history`}
          iconSize={24}
          icColor={Colors.black}
        />
      }
      bodyColor={Colors.white}>
      <ProductCount isOrder productCount={order?.length} />
      <FlatList
        data={orderReverse}
        renderItem={renderItem}
        keyExtractor={item => String(item._id)}
        showsVerticalScrollIndicator={false}
      />

      {!order && (
        <View style={styles.textWrap}>
          <FeatherIcon
            name="shopping-bag"
            size={50}
            color={Colors.black}
            style={styles.icon}
          />
          <Text style={styles.headerText}>NO ORDER HISTORY</Text>
          <Text style={styles.bodyText}>You haven't placed any orders yet</Text>
          <Text style={styles.footerText}>
            Browse the shop to see what's in store. Once you've placed an order,
            a sumary with everything you need will be saved for you here
          </Text>
        </View>
      )}
    </Container>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  textWrap: {
    flex: 1,
    paddingHorizontal: Metrics.screen.width / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    fontSize: 18,
  },
  bodyText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Light',
    color: Colors.dimGray,
    fontSize: 14,
    marginBottom: Metrics.screen.height / 40,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Medium',
    color: Colors.black,
    fontSize: 14,
  },
  icon: {
    marginBottom: Metrics.screen.height / 90,
  },
  card: {
    width: '100%',
    height: Metrics.screen.height / 5.6,
    backgroundColor: Colors.greyZircon,
    justifyContent: 'space-around',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 1,
  },
  item: {
    width: '95%',
    justifyContent: 'space-between',
  },
  wrap: {
    flexDirection: 'row',
  },
  text01: {
    fontFamily: 'NotoSans-SemiBold',
    color: Colors.black,
    fontSize: 20,
    width: Metrics.screen.width / 1.8,
  },
  text02: {
    color: Colors.white,
    fontFamily: 'NotoSans-SemiBold',
  },
  text04: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    textTransform: 'uppercase',
  },
  btn: {
    width: '40%',
    height: Metrics.screen.height / 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.screen.width / 60,
    borderWidth: 1.5,
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
  },
  footer: {
    borderColor: Colors.darkGray,
    height: Metrics.screen.height / 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: Metrics.screen.height / 50,
  },
  viewWrap: {
    backgroundColor: Colors.black,
    paddingHorizontal: 6,
    paddingBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewWrapSE: {
    backgroundColor: Colors.white,
    marginTop: 6,
    width: '52%',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  oval: {
    width: Metrics.screen.height / 22,
    height: Metrics.screen.height / 22,
    backgroundColor: Colors.black,
    borderRadius: Metrics.screen.height / 22,
    alignItems: 'center',
  },
  text03: {
    color: Colors.white,
    fontFamily: 'NotoSans-Bold',
    fontSize: 20,
  },
  text05: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'NotoSans-Medium',
    width: Metrics.screen.width / 2,
    height: Metrics.screen.height / 11,
  },
});
