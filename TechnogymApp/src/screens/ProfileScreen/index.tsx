import React, { FC, useCallback, useRef } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

import { logoutThunk } from '@src/redux/auth/authThunk';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { Colors, Metrics, Images } from '@src/assets';
import { Container } from '../components';
import { userInfo } from '@src/types';
import { ProfileDummy } from './ProfileDummy';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '@src/navigation/Stacks/profile-stack';
import { deleteCart } from '@src/redux/cart/cartSlice';

type ProfileScreenProp = StackNavigationProp<
  ProfileStackParamList,
  'MY_ACCOUNT'
>;

const ProfileScreen: FC = () => {
  const { navigate } = useNavigation<ProfileScreenProp>();
  var user = useAppSelector(state => state.auth.userInfo);
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  useScrollToTop(ref);

  const onNavSignout = useCallback(async () => {
    try {
      dispatch(deleteCart());
      await dispatch(logoutThunk(user));
    } catch (error: any) {
      const data = String(error.config.headers['token'].slice(7));
      const newUser: userInfo = {
        ...user,
        accessToken: data,
      };
      user = newUser;
      dispatch(deleteCart());
      await dispatch(logoutThunk(user));
    }
  }, [dispatch]);

  const ListHeaderComponent = () => (
    <View style={styles.viewBgImg}>
      <Image style={styles.img} source={Images.background.profileBg} />
      <TouchableOpacity style={styles.btnMyMember}>
        <Text style={styles.txtMyMember}>My membership</Text>
        <Ionicons name={'arrow-forward'} size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );

  const ListFooterComponent = () => (
    <TouchableOpacity style={styles.btnLogout} onPress={onNavSignout}>
      <Text style={styles.txtMyMember}>Log out</Text>
      <Ionicons name={'log-out-outline'} size={24} color={Colors.black} />
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      onPress={() => navigate(item.navigation)}
      style={[
        index === 0
          ? [styles.btnItem, { borderTopWidth: 1 }]
          : index === 1
          ? [styles.btnItem, { borderTopWidth: 1, borderRightWidth: 1 }]
          : index % 2 !== 0 && index !== 1
          ? [styles.btnItem, { borderRightWidth: 1 }]
          : [styles.btnItem],
      ]}>
      <Ionicons
        name={item.icon}
        size={32}
        color={Colors.black}
        style={styles.icon}
      />
      <Text style={styles.txtItem}>{item.title}</Text>
      <Text style={styles.txtDescItem}>{item.desc}</Text>
    </TouchableOpacity>
  );

  return (
    <Container bodyColor={Colors.white}>
      <FlatList
        data={ProfileDummy}
        renderItem={renderItem}
        numColumns={2}
        ref={ref}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListHeaderComponentStyle={{ marginBottom: '36%' }}
        ListFooterComponent={ListFooterComponent}
        ListFooterComponentStyle={{ marginTop: '10%', marginBottom: '30%' }}
      />
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
    marginHorizontal: 32,
  },
  viewBgImg: {
    height: Metrics.screen.height / 4,
  },
  img: { width: '100%', height: '100%', resizeMode: 'stretch' },
  btnMyMember: {
    height: '36%',
    backgroundColor: Colors.whiteGainsboro,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  btnLogout: {
    height: '20%',
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  txtMyMember: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  btnItem: {
    width: '50%',
    height: Metrics.screen.height / 4,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.whiteGainsboro,
    paddingHorizontal: 14,
    paddingTop: 20,
  },
  txtItem: {
    fontSize: 14.5,
    fontFamily: 'NotoSans-ExtraBold',
    color: Colors.black,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  txtDescItem: {
    fontSize: 13,
    fontFamily: 'NotoSans-Regular',
    color: Colors.black,
  },
  icon: { marginLeft: 6, marginBottom: 10 },
});
