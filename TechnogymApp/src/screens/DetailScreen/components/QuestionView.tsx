import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '@src/assets';

const QuestionView: FC = () => {
  return (
    <View style={[styles.viewQuestion, { marginVertical: 36 }]}>
      <Text style={styles.txtQuestion}>Question ?</Text>
      <View style={styles.viewMain}>
        <View style={{ flex: 1 }}>
          <Ionicons
            name={'chatbubbles-outline'}
            size={32}
            color={Colors.black}
            style={styles.ic}
          />
          <Text style={styles.txtMini}>Chat with agent</Text>
          <TouchableOpacity>
            <Text style={styles.txtReview}>Start chat</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Ionicons
            name={'help-outline'}
            size={32}
            color={Colors.black}
            style={styles.ic}
          />
          <Text style={styles.txtMini}>Visit our help section</Text>
          <TouchableOpacity>
            <Text style={styles.txtReview}>FAQ & Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuestionView;

const styles = StyleSheet.create({
  viewQuestion: { paddingHorizontal: 28 },
  viewMain: { flexDirection: 'row', marginTop: 24 },
  txtQuestion: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 23,
    textTransform: 'uppercase',
    bottom: 2,
    letterSpacing: 2,
    color: Colors.black,
  },
  txtMini: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 13,
    color: Colors.black,
  },
  txtReview: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    textTransform: 'uppercase',
    color: Colors.black,
    letterSpacing: 2,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    marginTop: 10,
  },
  ic: { marginBottom: 16 },
});
