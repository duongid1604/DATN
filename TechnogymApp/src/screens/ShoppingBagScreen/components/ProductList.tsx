import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Colors, Metrics } from '@src/assets';
import { BackgroundItemView } from '@src/screens/components';
import CartButton from '@src/screens/FavoriteScreen/components/CartButton';

const ITEM_HEIGHT = Metrics.screen.height / 5.6;

const ProductList = ({ item }: { item: any }) => {
  return (
    <View style={styles.renderItemContainer}>
      <View style={styles.renderItemChildContainer}>
        <Image source={{ uri: item.img }} style={styles.img} />
        <View style={styles.viewMain}>
          <Text style={styles.txtExistTitle}>{item.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <BackgroundItemView backgroundColor={Colors.black}>
              <Text style={{ color: Colors.white }}>${item.price}</Text>
            </BackgroundItemView>
            <Text style={styles.txtQuantity}>Quantity: {item.quantity}</Text>
          </View>
          {/* <CartButton textButton="Save Item" /> */}
          <View style={styles.viewQuantityChange}>
            <TouchableOpacity style={styles.btnQuantity}>
              <FeatherIcon name="minus" size={20} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.txtQuantityChange}>{item.quantity}</Text>
            <TouchableOpacity
              style={[styles.btnQuantity, { backgroundColor: Colors.white }]}>
              <FeatherIcon name="plus" size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={{ alignSelf: 'center' }}>
          <Ionicons name={'ellipsis-vertical'} size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  renderItemContainer: {
    width: Metrics.screen.width,
    height: ITEM_HEIGHT,
    backgroundColor: Colors.whiteSmoke,
    borderBottomWidth: 2.5,
    borderBottomColor: Colors.white,
    justifyContent: 'center',
    padding: 6,
  },
  viewMain: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  viewQuantityChange: {
    width: '42%',
    height: '32%',
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
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 14,
    color: Colors.neroGrey,
  },
  img: {
    height: '100%',
    width: ITEM_HEIGHT - 12,
  },
});
