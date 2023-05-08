import React, { FC, useRef } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';

import { StyleSheet, Text, View } from 'react-native';
import { Colors, Metrics } from '@src/assets';

interface DescribeFormProps {
  control?: any; // type ?
  rules?: any;
  name: string;
  error?: string;
  placeholder: string;
  secureTextEntry: boolean;
  autofocus?: boolean;
}

const DescribeForm: FC<DescribeFormProps> = ({
  control,
  rules,
  name,
  error,
  placeholder,
  secureTextEntry,
  autofocus,
}) => {
  return (
    <View
      style={[
        error ? { ...styles.container, marginBottom: 13 } : styles.container,
      ]}
    >
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={`${value}`}
              secureTextEntry={secureTextEntry}
              selectionColor={Colors.dimGray}
              autoFocus={autofocus}
              multiline={true}
            />
          </View>
        )}
        name={name}
      />
      {error && <Text style={styles.validationText}>{error}</Text>}
    </View>
  );
};

export default DescribeForm;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  card: {
    height: Metrics.screen.height / 7,
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
  },
  input: {
    fontFamily: 'NonoSans-Black',
    fontSize: 13,
    width: '100%',
    backgroundColor: Colors.white,
    padding: 10,
  },
  validationText: {
    fontFamily: 'NonoSans-Black',
    fontSize: 13,
    color: Colors.redTourch,
    marginTop: 3,
    marginLeft: Metrics.screen.width / 40,
  },
  text: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 12.5,
    color: Colors.black,
    marginLeft: Metrics.screen.width / 40,
  },
});
