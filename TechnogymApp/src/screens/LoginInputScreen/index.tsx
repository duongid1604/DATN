import React, { FC, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
import { loginThunk } from '@src/redux/auth/authThunk';
import { loginType } from '@src/types/auth-type';
import { setReload } from '@src/redux/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import { LoginStackNavigationProp } from '@src/navigation/Stacks/login-stack';

const LoginInputScreen: FC<any> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const nav = useNavigation<LoginStackNavigationProp>();
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
      username: 'testuser',
      password: '123456789',
    },
  });

  const onSubmit = useCallback(async (data: loginType) => {
    await dispatch(loginThunk(data));
  }, []);

  return (
    <Container header bodyColor={Colors.white}>
      <LoginHeader navigation={navigation} textContent={'SIGN IN'} />
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
            textContent={'SIGN IN'}
            backgroundColor={loading ? Colors.greyBlack : Colors.black}
            textColor={Colors.white}
            disabled={loading}
            icon={true}
            form={true}
            submit={handleSubmit(onSubmit)}
            loading={loading}
          />
          <LoginButton
            textContent={'FORGOT PASSWORD'}
            backgroundColor={Colors.white}
            textColor={Colors.black}
            disabled={loading}
            icon={true}
            navigation={() => navigation.navigate('FORGOT_PASSWORD')}
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

export default LoginInputScreen;

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
