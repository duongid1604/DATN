import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Lottie from 'lottie-react-native';

import { Animations, Colors, Metrics } from '@src/assets';

const Loading: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Loading...</Text>
      <Lottie
        source={Animations.loading}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default memo(Loading);

const styles = StyleSheet.create({
  container: {
    width: Metrics.screen.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: 'Notosans-Medium',
    fontSize: 12.5,
    letterSpacing: 0.25,
    color: Colors.black,
    position: 'absolute',
    top: Metrics.screen.height / 9.65967366,
  },
  animation: { width: '100%' },
});
