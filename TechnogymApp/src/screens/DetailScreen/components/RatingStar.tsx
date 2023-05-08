import React, { FC } from 'react';
import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  star: number;
}

const RatingStar: FC<Props> = ({ star }) => {
  const DATA: number[] = [];
  for (let i = 0; i < star; i++) {
    DATA.push(1);
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {DATA.map((value, index) => (
        <Ionicons name={'star'} size={20} color="#000000" key={index} />
      ))}
    </View>
  );
};

export default RatingStar;
