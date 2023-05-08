import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BackgroundItemView from './BackgroundItemView';
import CartButton from '../FavoriteScreen/components/CartButton';
import { Colors, Metrics } from '@src/assets';

const ITEM_HEIGHT = Metrics.screen.height / 5.6;

const ProductList = ({ item }: { item: any }) => {
  return (
    <View style={styles.renderItemContainer}>
      <View style={styles.renderItemChildContainer}>
        <Image source={{ uri: item.img }} style={styles.img} />
        <View style={styles.viewMain}>
          <Text style={styles.txtExistTitle}>{item.title}</Text>
          <BackgroundItemView backgroundColor={Colors.black}>
            <Text style={{ color: Colors.white }}>${item.price}</Text>
          </BackgroundItemView>
          <CartButton textButton="Add to bag" item={item} />
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
