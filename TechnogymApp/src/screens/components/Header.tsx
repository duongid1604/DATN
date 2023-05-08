import React, { FC, memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import HeaderBar from './HeaderBar';

interface Props {
  textIcon?: string;
  icon?: string;
  iconSize?: number;
  icColor?: string;
  bgColor?: string;
}

const Header: FC<Props> = ({ textIcon, icon, iconSize, bgColor, icColor }) => {
  const navigation = useNavigation();

  const onNavGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <HeaderBar
      backgroundColor={bgColor}
      left={
        <View style={styles.left}>
          <TouchableOpacity onPress={onNavGoBack}>
            {icon ? (
              <Ionicons name={icon} size={iconSize} color={icColor} />
            ) : (
              <></>
            )}
          </TouchableOpacity>
          {textIcon ? <Text style={styles.text}>{textIcon}</Text> : <></>}
        </View>
      }
    />
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  left: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between', //Thay doi so vs ban dau
  },
  text: {
    width: '82%',
    fontFamily: 'NotoSans-Bold',
    fontSize: 17,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#000000',
    marginLeft: 5,
    marginBottom: 2,
  },
});
