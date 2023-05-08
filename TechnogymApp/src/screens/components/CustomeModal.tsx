import React, { FC, useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Colors, Metrics } from '@src/assets';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

interface customeModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
}

const CustomeModal: FC<customeModalProps> = ({
  modalVisible,
  setModalVisible,
  title,
  description,
}) => {
  const hanldeClick = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.text01}>{title}</Text>
            <Text style={styles.text02}>{description}</Text>
          </View>
          <TouchableOpacity style={styles.modalFooter} onPress={hanldeClick}>
            <Text style={styles.textBtn}>OK</Text>
            <FontAwesomeIcons
              name="angle-right"
              size={24}
              style={{ color: Colors.white }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomeModal;

const styles = StyleSheet.create({
  centeredView: {
    width: Metrics.screen.width,
    height: Metrics.screen.height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: Metrics.screen.width / 1.2,
    height: Metrics.screen.height / 6,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    height: '70%',
    backgroundColor: Colors.white,
    padding: Metrics.screen.width / 20,
  },
  modalFooter: {
    width: '100%',
    height: '30%',
    backgroundColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.screen.width / 18.5,
  },
  text01: {
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    marginBottom: Metrics.screen.height / 200,
    fontSize: 13,
  },
  text02: {
    fontFamily: 'NotoSans-Light',
    color: Colors.black,
    fontSize: 12.5,
  },
  textBtn: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
    color: Colors.white,
  },
});
