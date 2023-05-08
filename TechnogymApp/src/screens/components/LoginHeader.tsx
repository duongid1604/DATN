import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import { Colors, Metrics } from '@src/assets';

interface LoginHeaderProps {
  navigation: any; // type??
  textContent: string;
}

const LoginHeader: FC<LoginHeaderProps> = ({ navigation, textContent }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <IoniconsIcons
          name="arrow-back-sharp"
          size={24}
          style={{ color: 'black' }}
        />
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <Text style={styles.headerText}>{textContent}</Text>
        <Text style={styles.text}>Let's write down your infomation...</Text>
      </View>
    </View>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
  header: {
    height: Metrics.screen.height / 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.screen.width / 25,
  },
  textWrapper: {
    marginLeft: Metrics.screen.width / 15,
  },
  headerText: {
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    fontSize: 18,
  },
  text: {
    fontFamily: 'NotoSans-Regular',
    color: Colors.black,
    fontSize: 12,
  },
});
