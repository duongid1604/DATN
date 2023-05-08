import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  desc: string;
  info: string;
}

const InfomationView: FC<Props> = ({ desc, info }) => {
  return (
    <View style={styles.viewRate}>
      <Text style={styles.txtRate}>Some infomation</Text>
      <Text style={styles.txtMini}>
        {desc}
      </Text>
      <Text style={styles.txtMini}>
        {info}
      </Text>
    </View>
  );
};

export default InfomationView;

const styles = StyleSheet.create({
  viewRate: { paddingHorizontal: 28 },
  txtRate: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 23,
    textTransform: 'uppercase',
    bottom: 2,
    letterSpacing: 2,
    color: '#000000',
  },
  txtMini: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 13,
    color: '#000000',
  },
});
