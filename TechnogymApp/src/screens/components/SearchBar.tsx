import { Colors } from '@src/assets';
import React, { FC, memo, useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  height?: string | number | any;
}

const SearchBar: FC<Props> = ({ height }) => {
  return (
    <Animated.View style={[styles.viewSearch, { height: height }]}>
      <Ionicons
        name={'search-outline'}
        size={20}
        color={Colors.dimGray}
        style={{ marginLeft: 20 }}
      />
      <Text style={styles.txtSearch}>Find products...</Text>
    </Animated.View>
  );
};

export default memo(SearchBar);

const styles = StyleSheet.create({
  viewSearch: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.whiteGainsboro,
  },
  txtSearch: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: Colors.dimGray,
    marginLeft: 18,
  },
});
