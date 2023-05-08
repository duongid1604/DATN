import { StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Container,
  CustomeModal,
  Header,
  InputForm,
  LoginButton,
} from '../components';
import { Colors, Metrics } from '@src/assets';
import { updatePasswordThunk } from '@src/redux/user/userThunk';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';

const EditPassWordScreen: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useAppSelector(state => state.auth.userInfo);
  const { loading, changePassResponse } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      passwordUpdate: '',
    },
  });
  const onSubmit = async (data: any) => {
    await dispatch(updatePasswordThunk({ user: user, payload: data }));
    setModalVisible(true);
  };

  return (
    <Container
      bodyColor={Colors.white}
      header={
        <Header
          icon="chevron-back"
          textIcon={'CHANGE YOUR PASSWORD'}
          iconSize={24}
          icColor={Colors.black}
        />
      }>
      <View style={styles.wrapper}>
        <InputForm
          control={control}
          secureTextEntry={true}
          rules={{
            maxLength: {
              value: 20,
              message: 'Exceeded allowed characters',
            },
            required: { value: true, message: 'Required Information' },
          }}
          name={'password'}
          error={errors?.password?.message}
          placeholder={'CURRENT PASSWORD'}
        />
        <InputForm
          control={control}
          secureTextEntry={true}
          rules={{
            maxLength: {
              value: 20,
              message: 'Exceeded allowed characters',
            },
            required: { value: true, message: 'Required Information' },
          }}
          name={'passwordUpdate'}
          error={errors?.password?.message}
          placeholder={'NEW PASSWORD'}
        />
        <LoginButton
          textContent={'SAVE'}
          backgroundColor={Colors.black}
          textColor={Colors.white}
          // navigation={() => navigation.navigate('REGISTER_INPUT')}
          // disabled={loading}
          icon={true}
          // loading={loading}
          submit={handleSubmit(onSubmit)}
          form={true}
        />
      </View>
      <CustomeModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title={'Success'}
        description={changePassResponse}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: Metrics.screen.height / 36,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
});
export default EditPassWordScreen;
