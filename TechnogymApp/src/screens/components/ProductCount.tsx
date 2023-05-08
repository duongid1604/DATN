import { Colors } from '@src/assets';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  productCount?: number | string;
  isOrder?: boolean;
}

const ProductCount: FC<Props> = ({ productCount, isOrder }) => {
  return (
    <View style={styles.viewProduct}>
      <Text style={styles.txtProduct}>
        {productCount} {isOrder ? 'Orders' : 'product'}
      </Text>
    </View>
  );
};

export default ProductCount;

const styles = StyleSheet.create({
  viewProduct: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderColor: Colors.whiteSmoke,
  },
  txtProduct: {
    fontSize: 12.5,
    fontFamily: 'NotoSans-Regular',
    textTransform: 'uppercase',
    color: Colors.black,
    marginLeft: 20,
    letterSpacing: 0.75,
  },
});
