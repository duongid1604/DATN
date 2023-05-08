import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Metrics } from '@src/assets';

const SearchList = ({ item, index }: { item: any; index: number }) => (
  <View>
    <TouchableWithoutFeedback>
      <View
        style={[
          index % 2 !== 0
            ? styles.viewItem
            : { ...styles.viewItem, borderRightWidth: 2 },
        ]}>
        <View style={styles.viewImage}>
          <Image
            style={styles.imgProduct}
            source={{
              uri: item.img,
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', height: '36%' }}>
          <View style={styles.viewInfoProduct}>
            <View style={styles.viewCost}>
              <Text style={styles.txtCost}>{`$${item.price}.00`}</Text>
            </View>
            <Text style={styles.txtTitle}>{item.title}</Text>
            <Text style={styles.txtType}>{item.categories}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    <View style={styles.viewBtnIc}>
      <TouchableOpacity>
        <Ionicons name="heart-outline" size={25} color={Colors.black} />
      </TouchableOpacity>
    </View>
  </View>
);

export default SearchList;

const styles = StyleSheet.create({
  viewItem: {
    height: Metrics.screen.height / 2.6,
    width: Metrics.screen.width / 2,
    backgroundColor: Colors.greyZircon,
    borderBottomWidth: 2,
    borderColor: Colors.white,
  },
  viewImage: {
    height: '64%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imgProduct: { width: '99%', height: '99%' },
  viewInfoProduct: {
    height: '100%',
    width: '84%',
    justifyContent: 'space-between',
    padding: 8,
  },
  viewCost: {
    backgroundColor: Colors.black,
    width: '42%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCost: {
    fontFamily: 'NotoSans-Medium',
    fontSize: 13,
    color: Colors.white,
    letterSpacing: 1,
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
    fontSize: 13,
    flexWrap: 'wrap',
  },
  viewBtnIc: {
    width: '16%',
    top: '66%',
    left: '82%',
    position: 'absolute',
    alignItems: 'center',
  },
});
