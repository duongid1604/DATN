import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { FC, memo, useRef, useState } from 'react';
import { Metrics } from '@src/assets';

interface Props {
  backgroundColor?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
  heightFooter?: number;
}

const HeaderBar: FC<Props> = ({
  backgroundColor,
  title,
  left,
  right,
  heightFooter,
}) => {
  let AnimatedHeaderValue = new Animated.Value(0);

  const HEADER_MAX_HEIGHT = 56;
  const HEADER_MIN_HEIGHT = 0;

  const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={
        heightFooter
          ? [
              styles.container,
              {
                height: heightFooter,
                backgroundColor: backgroundColor,
                borderTopWidth: 0.5,
                borderTopColor: '#a6a6a6',
              },
            ]
          : [
              styles.container,
              {
                backgroundColor: backgroundColor || '#FFFFFF',
                height: animatedHeaderHeight,
              },
            ]
      }>
      {left || <View />}
      {title}
      {right || <View />}
    </Animated.View>
  );
};

export default memo<Props>(HeaderBar);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: Metrics.isSmallPhone ? 16 : 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F1F1',
  },
});
