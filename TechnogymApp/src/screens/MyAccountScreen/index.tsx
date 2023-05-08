import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Container, Header, InputForm, LoginButton } from '../components';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { Colors, Metrics } from '@src/assets';
import { useForm } from 'react-hook-form';
import { gender_data } from './gender_data';
import { getUserThunk, updateUserThunk } from '@src/redux/user/userThunk';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '@src/navigation/Stacks/profile-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import Loading from '../components/Loading';
import Toast from 'react-native-toast-message';

type MyAccountScreenProp = StackNavigationProp<
  ProfileStackParamList,
  'MY_ACCOUNT'
>;

const MyAccountScreen: FC = () => {
  const [gender, setGender] = useState('');
  const [checked, setChecked] = useState(0);
  const [load, setLoad] = useState(false);
  const user = useAppSelector(state => state.auth.userInfo);
  const { userProfile, loading } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MyAccountScreenProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.myInfo?.username,
      email: user?.myInfo?.email,
      address: user?.myInfo?.address,
    },
  });

  useEffect(() => {
    if (user?.myInfo?.gender === 'Male') {
      setChecked(1);
    } else if (user?.myInfo?.gender === 'Female') {
      setChecked(2);
    } else if (user?.myInfo?.gender === 'Prefer not to say') {
      setChecked(3);
    }
  }, []);

  const onSubmit = useCallback(
    async (data: any) => {
      if (!!user) {
        setLoad(true);
        await dispatch(
          updateUserThunk({ user: user, info: { ...data, gender: 'Male' } }),
        );
        await dispatch(getUserThunk(user));
        setLoad(false);
      }
    },
    [user, gender, setGender],
  );

  return (
    <Container
      header={
        <Header
          icon="chevron-back"
          textIcon={'Edit profile info'}
          iconSize={24}
          icColor={Colors.black}
        />
      }>
      {loading ? (
        <View style={styles.loading}>
          <Loading />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View>
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
              placeholder={'NAME'}
              autofocus={false}
            />
            <InputForm
              control={control}
              secureTextEntry={false}
              rules={{
                maxLength: {
                  value: 50,
                  message: 'Exceeded allowed characters',
                },
                required: { value: true, message: 'Required Information' },
              }}
              name={'email'}
              error={errors?.email?.message}
              placeholder={'EMAIL'}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('EDIT_PASSWORD')}>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textPassword}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  placeholder={'*************'}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </TouchableOpacity>
            <InputForm
              control={control}
              secureTextEntry={false}
              rules={{
                maxLength: {
                  value: 50,
                  message: 'Exceeded allowed characters',
                },
                required: { value: true, message: 'Required Information' },
              }}
              name={'address'}
              error={errors?.address?.message}
              placeholder={'ADDRESS'}
            />
            {/* <Text style={styles.text}>GENDER</Text> */}
            {/* <View style={styles.viewGender}>
              {gender_data.map((e, i) => (
                <TouchableOpacity
                  key={e.id}
                  onPress={() => {
                    setChecked(e.id), setGender(e.desc);
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {checked === i + 1 ? (
                    <View style={styles.radioBtnChecked} />
                  ) : (
                    <View style={styles.radioBtn} />
                  )}
                  <Text
                    style={{
                      fontFamily:
                        checked === i + 1
                          ? 'NotoSans-ExtraBold'
                          : 'NotoSans-Medium',
                      fontSize: 13,
                      color: Colors.black,
                    }}>
                    {e.desc}
                  </Text>
                </TouchableOpacity>
              ))}
            </View> */}
          </View>
          <LoginButton
            textContent={'SAVE'}
            backgroundColor={Colors.black}
            textColor={Colors.white}
            // navigation={() => navigation.goBack()}
            disabled={loading}
            icon={true}
            loading={loading}
            submit={handleSubmit(onSubmit)}
            form={true}
          />
        </View>
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: Metrics.screen.height / 36,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 12.5,
    color: Colors.black,
    marginLeft: Metrics.screen.width / 40,
  },
  input: {
    fontFamily: 'NonoSans-Black',
    fontSize: 13,
    width: '100%',
    height: Metrics.screen.height / 20,
    backgroundColor: Colors.white,
    padding: 10,
    borderBottomWidth: 1,
  },
  textPassword: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 12.5,
    color: Colors.black,
    marginLeft: Metrics.screen.width / 40,
  },
  gender: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtGender: {
    color: Colors.black,
  },
  viewGender: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  radioBtn: {
    width: 20,
    height: 20,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: Colors.nobelGrey,
    marginRight: 8,
  },
  radioBtnChecked: {
    width: 20,
    height: 20,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: Colors.black,
    marginRight: 8,
  },
  loading: {
    top: Metrics.screen.height / 4,
    alignSelf: 'center',
  },
});

export default MyAccountScreen;
