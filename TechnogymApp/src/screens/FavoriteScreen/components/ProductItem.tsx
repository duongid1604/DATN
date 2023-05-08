import { Colors } from '@src/assets';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Metrics from '../../../assets/Metrics';

interface Props {
  item: any;
  index: number;
  separators: any;
  recent: any;
}

const ProductItem: FC<Props> = ({ item, index, separators, recent }) => {
  return (
    <TouchableOpacity
      style={
        index === 0
          ? { ...styles.btnProductList, marginLeft: 42 }
          : index === recent.length - 1
          ? { ...styles.btnProductList, marginRight: 24 }
          : styles.btnProductList
      }>
      <View style={styles.viewProduct}>
        <View style={styles.viewImage}>
          <Image
            style={styles.imgProduct}
            source={{
              uri: item.img,
            }}
          />
        </View>
        <View style={styles.viewInfoProduct}>
          <View style={styles.viewCost}>
            <Text style={styles.txtCost}>{`$${item.price}`}</Text>
          </View>
          <Text style={styles.txtTitle}>{item.title}</Text>
          <Text style={styles.txtType}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  btnProductList: {
    height: Metrics.screen.height / 2.9,
    width: Metrics.screen.width / 2.3,
    marginRight: 6,
    flexDirection: 'row',
    backgroundColor: Colors.greyZircon,
  },
  viewProduct: { flex: 1 },
  viewImage: {
    backgroundColor: Colors.greyZircon,
    height: '60%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imgProduct: { width: '98%', height: '98%' },
  viewInfoProduct: {
    height: '40%',
    justifyContent: 'space-between',
    padding: 8,
  },
  viewCost: {
    backgroundColor: Colors.white,
    width: '28%',
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
});
