import React, { FC, memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import HeaderBar from './HeaderBar';

interface Props {
  bgColor?: string;
  height?: number;
  total?: number;
  onCheckout?: () => void;
}

const Footer: FC<Props> = ({ bgColor, height, total, onCheckout }) => {
  const navigation = useNavigation();

  const onNavGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <HeaderBar
      heightFooter={height}
      backgroundColor={bgColor}
      left={
        <View style={styles.left}>
          <View style={styles.viewMain}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.txtTotal}>Total</Text>
              <Text style={styles.txtTax}>(excl. tax)</Text>
            </View>
            <Text style={styles.txtCost}>${total}.00</Text>
          </View>
          <TouchableOpacity style={styles.btnCheckout} onPress={onCheckout}>
            <Text style={styles.txtCheckout}>Checkout</Text>
            <Ionicons name={'arrow-forward'} size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default memo(Footer);

const styles = StyleSheet.create({
  left: {
    width: '100%',
    height: '76%',
    display: 'flex',
    paddingHorizontal: 8,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  viewMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnCheckout: {
    padding: 10,
    backgroundColor: '#000000',
    height: '55%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtTotal: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 15,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  txtTax: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    color: '#000000',
    marginLeft: 4,
  },
  txtCost: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 14.5,
    color: '#000000',
  },
  txtCheckout: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    bottom: 2,
  },
});
