import React, { FC, useCallback, useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';

import {
  Container,
  CustomeModal,
  InputForm,
  LoginButton,
  LoginHeader,
} from '../components';
import { Colors, Metrics } from '@src/assets';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { forgotPasswordThunk } from '@src/redux/auth/authThunk';
import { forgotPasswordType } from '@src/types/auth-type';
import { setReload } from '@src/redux/auth/authSlice';

const ForgotPasswordScreen: FC<any> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { loading, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(setReload());
    if (!!error) {
      setModalVisible(true);
    }
  }, [error]);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const onSubmit = useCallback(async (data: forgotPasswordType) => {
    Keyboard.dismiss();
    await dispatch(forgotPasswordThunk(data));
    navigation.goBack();
  }, []);

  return (
    <Container header bodyColor={Colors.white}>
      <LoginHeader navigation={navigation} textContent={'FORGOT PASSWORD'} />
      <View style={styles.body}>
        <View style={styles.email}>
          <InputForm
            control={control}
            secureTextEntry={false}
            rules={{
              maxLength: {
                value: 20,
                message: 'Exceeded allowed characters',
              },
              required: { value: true, message: 'Required Information' },
            }}
            name={'username'}
            error={errors?.username?.message}
            placeholder={'USERNAME'}
            autofocus={true}
          />
          <InputForm
            control={control}
            secureTextEntry={false}
            rules={{
              maxLength: {
                value: 200,
                message: 'Exceeded allowed characters',
              },
              required: { value: true, message: 'Required Information' },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Invalid mail format',
              },
            }}
            name={'email'}
            error={errors?.email?.message}
            placeholder={'EMAIL'}
          />
        </View>
        <View style={styles.btn}>
          <LoginButton
            textContent={'GET NEW PASSWORD'}
            backgroundColor={loading ? Colors.greyBlack : Colors.black}
            textColor={Colors.white}
            disabled={loading}
            icon={true}
            form={true}
            submit={handleSubmit(onSubmit)}
            loading={loading}
          />
        </View>
      </View>
      <CustomeModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title={'Error'}
        description={'Your username or password is incorrect'}
      />
    </Container>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Metrics.screen.width / 25,
    flex: 1,
    justifyContent: 'space-between',
  },
  email: {
    height: 'auto',
    marginTop: Metrics.screen.height / 20,
  },
  button: {
    height: 'auto',
    marginBottom: Metrics.screen.height / 50,
  },
  btn: {
    marginBottom: Metrics.screen.height / 40,
  },
});
