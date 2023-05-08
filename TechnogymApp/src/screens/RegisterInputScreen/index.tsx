import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';

import { Colors, Metrics } from '@src/assets';
import {
  Container,
  CustomeModal,
  InputForm,
  LoginButton,
  LoginHeader,
} from '../components';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { registerType } from '@src/types';
import { registerThunk } from '@src/redux/auth/authThunk';
import { setReload } from '@src/redux/auth/authSlice';

const RegisterInputScreen: FC<any> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { error, loading, userInfo } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setReload());
    if (!!error) {
      setModalVisible(true);
    }
    if (!!userInfo) {
      navigation.pop();
    }
  }, [error, userInfo]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback((data: registerType) => {
    dispatch(registerThunk(data));
  }, []);

  return (
    <Container header bodyColor={Colors.white}>
      <LoginHeader navigation={navigation} textContent={'REGISTER'} />
      <View style={styles.body}>
        <View style={styles.email}>
          <InputForm
            control={control}
            secureTextEntry={false}
            rules={{
              maxLength: {
                value: 200,
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
            placeholder={'PASSWORD'}
          />
        </View>
        <View style={styles.btn}>
          <LoginButton
            textContent={'SIGN UP'}
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
        description={'This email or username already exists'}
      />
    </Container>
  );
};

export default RegisterInputScreen;

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
