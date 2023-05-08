import { Colors } from '@src/assets';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Metrics from '../../../assets/Metrics';
import { dummyData1 } from '../dummy';

const ProductItem = ({ item, index }: { item: any; index: number }) => (
  <TouchableOpacity
    style={
      index === 0
        ? { ...styles.btnProductList, marginLeft: 32 }
        : index === dummyData1.length - 1
        ? { ...styles.btnProductList, marginRight: 32 }
        : styles.btnProductList
    }>
    <View style={styles.viewProduct}>
      <View style={styles.viewImage}>
        <Image style={styles.imgProduct} source={{ uri: item?.img }} />
      </View>
      <View style={styles.viewInfoProduct}>
        <View style={styles.viewCost}>
          <Text style={styles.txtCost}>{`$${item?.price}`}</Text>
        </View>
        <Text style={styles.txtTitle}>{item?.title}</Text>
        <Text style={styles.txtType}>{item?.categories?.[0]}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default ProductItem;

const styles = StyleSheet.create({
  btnProductList: {
    height: Metrics.screen.height / 2.9,
    width: Metrics.screen.width / 2.5,
    marginRight: 8,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: Colors.greyZircon,
  },
  viewProduct: { flex: 1 },
  viewImage: {
    // backgroundColor: '#CCCCCC',
    height: '55%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imgProduct: { width: '98%', height: '98%' },
  viewInfoProduct: {
    height: '45%',
    justifyContent: 'space-between',
    padding: 8,
  },
  viewCost: {
    backgroundColor: Colors.white,
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCost: {
    fontFamily: 'NotoSans-Medium',
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
});
