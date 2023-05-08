import React, { FC, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Metrics } from '@src/assets';

const ListFooter: FC = () => {
  return (
    <TouchableOpacity style={styles.btn}>
      <View>
        <Text style={styles.txtTitle}>Items you recently viewed</Text>
        <Text style={styles.txtDesc}>
          Forgot to save something? find{'\n'}items you left behind
        </Text>
      </View>
      <Ionicons name={'chevron-forward'} size={20} color={Colors.black} />
    </TouchableOpacity>
  );
};

export default memo(ListFooter);

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: Metrics.screen.height / 8.4,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyZircon,
    flexDirection: 'row',
  },
  txtTitle: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 12.5,
    color: Colors.black,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  txtDesc: {
    fontFamily: 'NotoSans-Light',
    fontSize: 12,
    color: Colors.nobelGrey,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
