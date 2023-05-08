import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  rate?: string | number;
  title?: string;
  start?: string;
  mid?: string;
  end?: string;
}

const RatingBar: FC<Props> = ({ rate, title, start, mid, end }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtRateTitle}>{title}</Text>
      <View style={styles.childContainer}>
        <View style={styles.viewBgBar} />
        <View style={[styles.viewMainBar, { width: rate }]} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.txtRange}>{start}</Text>
        {mid ? <Text style={styles.txtRange}>{mid}</Text> : <></>}
        <Text style={styles.txtRange}>{end}</Text>
      </View>
    </View>
  );
};

export default RatingBar;

const styles = StyleSheet.create({
  container: { width: '86%', alignSelf: 'center', marginTop: 24 },
  childContainer: {
    width: '100%',
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  viewBgBar: {
    width: '100%',
    height: 1,
    backgroundColor: '#666666',
  },
  viewMainBar: {
    height: 6,
    backgroundColor: 'black',
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  txtRateTitle: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#000000',
    marginBottom: 6,
  },
  txtRange: {
    fontFamily: 'NotoSans-Medium',
    fontSize: 12,
    color: '#000000',
    marginTop: 2,
  },
});
