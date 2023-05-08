import React, { FC } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  textButton?: string;
  nav: any;
}

const NextButton: FC<Props> = ({ textButton, nav }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        nav();
      }}
    >
      <View style={styles.container}>
        <View style={styles.viewVirtual} />
        <View style={styles.viewBtnMain}>
          <View style={styles.viewBtn}>
            <Text style={styles.txtBg}>{textButton}</Text>
            <Ionicons name={'arrow-forward'} size={24} color="#000000" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    width: '36%',
    maxWidth: '48%',
    height: '20%',
    marginTop: 6,
  },
  viewVirtual: {
    marginLeft: 6,
    marginTop: '4%',
    paddingRight: '95%',
    paddingBottom: '29%',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
  },
  viewBtnMain: {
    width: '100%',
    height: '90%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtn: {
    width: 124,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtBg: {
    fontSize: 15,
    fontFamily: 'NotoSans-Medium',
    color: '#000000',
    textTransform: 'uppercase',
    marginBottom: 3,
    textDecorationLine: 'underline',
  },
});
