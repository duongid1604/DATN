import React, { FC, useRef } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';

import { StyleSheet, Text, View } from 'react-native';
import { Colors, Metrics } from '@src/assets';

interface InputFromProps {
  control?: any; // type ?
  rules?: any;
  name: string;
  error?: string;
  placeholder: string;
  secureTextEntry: boolean;
  autofocus?: boolean;
}

const InputForm: FC<InputFromProps> = ({
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
      ]}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.text}>{placeholder}</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={`${value}`}
              secureTextEntry={secureTextEntry}
              selectionColor={Colors.dimGray}
              autoFocus={autofocus}
            />
          </>
        )}
        name={name}
      />
      {error && <Text style={styles.validationText}>{error}</Text>}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  input: {
    fontFamily: 'NonoSans-Black',
    fontSize: 13,
    width: '100%',
    height: Metrics.screen.height / 20,
    backgroundColor: Colors.white,
    padding: 10,
    borderBottomWidth: 1,
    // borderColor: '#DDDCDF',
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
