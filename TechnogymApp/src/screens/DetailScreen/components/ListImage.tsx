import React, { FC, memo, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

import { Colors, Metrics } from '@src/assets';

const ITEM_HEIGHT = Metrics.screen.height * 0.55;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

interface Props {
  image: string;
}

const ListImage: FC<Props> = ({ image }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={[1, 2, 3, 4]}
        renderItem={() => <Image style={styles.img} source={{ uri: image }} />}
        keyExtractor={(item, index) => index.toString()}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        bounces={false}
      />
      <View style={styles.pagination}>
        {[1, 2, 3, 4].map((_, index) => {
          return <View key={index} style={[styles.dot]} />;
        })}
        <Animated.View
          style={[
            styles.dotIndicator,
            {
              transform: [
                {
                  translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate(
                    {
                      inputRange: [0, 1],
                      outputRange: [0, DOT_INDICATOR_SIZE],
                    },
                  ),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default memo(ListImage);

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    overflow: 'hidden',
  },
  pagination: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2,
    left: Metrics.screen.width - 24,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: Colors.black,
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 2,
    borderColor: Colors.black,
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
  img: {
    width: '100%',
    height: ITEM_HEIGHT,
  },
});
