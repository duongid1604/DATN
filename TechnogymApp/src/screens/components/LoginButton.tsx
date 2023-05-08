import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { FC, useCallback } from 'react';
import { Colors, Metrics } from '@src/assets';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

interface ButtonLoginProps {
  textContent: string;
  backgroundColor: string;
  textColor: string;
  disabled?: boolean;
  icon: boolean;
  loading?: boolean;
  form?: boolean;
  submit?: any; // type?
  navigation?: any; // type?
}

const LoginButton: FC<ButtonLoginProps> = ({
  textContent,
  backgroundColor,
  textColor,
  navigation,
  disabled,
  icon,
  loading,
  form,
  submit,
}) => {
  const hanldeClick = useCallback(() => {
    form ? submit() : navigation();
  }, []);

  return (
    <>
      {loading ? (
        <TouchableOpacity
          disabled={disabled}
          onPress={hanldeClick}
          style={[
            styles.container,
            { backgroundColor: backgroundColor, borderColor: backgroundColor },
          ]}>
          <Text style={[styles.textBtn, { color: textColor }]}>Loading...</Text>
          <ActivityIndicator size="small" color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          onPress={hanldeClick}
          style={[styles.container, { backgroundColor: backgroundColor }]}>
          <Text style={[styles.textBtn, { color: textColor }]}>
            {textContent}
          </Text>
          {icon && (
            <FontAwesomeIcons
              name="angle-right"
              size={24}
              style={{ color: textColor }}
            />
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrics.screen.height / 17,
    marginBottom: Metrics.screen.height / 155,
    marginTop: Metrics.screen.height / 155,
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.screen.width / 18.5,
  },
  textBtn: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
  },
});
