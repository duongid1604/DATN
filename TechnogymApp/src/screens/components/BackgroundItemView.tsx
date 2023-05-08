import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  border?: number;
}

const BackgroundItemView: FC<Props> = ({
  children,
  width,
  height,
  border,
  backgroundColor,
}) => {
  return (
    <View
      style={[
        styles.viewBgItem,
        {
          width: width,
          height: height,
          backgroundColor: backgroundColor,
          borderWidth: border,
          borderColor: '#000000',
        },
      ]}>
      {children}
    </View>
  );
};

export default memo(BackgroundItemView);

const styles = StyleSheet.create({
  viewBgItem: {
    backgroundColor: '#FFFFFF',
    width: '10%',
    // minWidth: '20%',
    maxWidth: '92%',
    height: '30%',
    // maxHeight: '28%',
    marginBottom: 3,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
