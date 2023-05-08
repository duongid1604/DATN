import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {
  CompositeScreenProps,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { Colors, Images, Metrics } from '@src/assets';
import { Container, Header } from '../components';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { HomeStackParamList } from '@src/navigation/Stacks/home-stack';
import { Conversation, myInfo } from '@src/types';
import { getAllChatThunk } from '@src/redux/chat/chatThunk';
import UserAPI from '@src/api/UserAPI';
import { RootStackParamList } from '@src/navigation';

export type ChatListScreenProp = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, 'CHAT_LIST'>,
  StackScreenProps<RootStackParamList, 'CHAT'>
>;

export type ChatListNavigationProp = ChatListScreenProp['navigation'];

const ChatListScreen: FC = () => {
  const [groupChat, setGroupChat] = useState<Array<myInfo> | undefined>();

  const navigation = useNavigation<ChatListNavigationProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const conversation = useAppSelector(state => state.conversation.conversation);
  const dispatch = useAppDispatch();
  const focus = useIsFocused();

  useEffect(() => {
    try {
      const fetchData = async () => {
        await dispatch(getAllChatThunk({ user }));
        let friendId = conversation?.map((e: Conversation) =>
          e?.members?.find(item => item !== user?.myInfo?._id),
        );

        if (!!friendId && !!user) {
          let userList = await Promise.all(
            friendId.map(async (item: string | undefined, idx: number) => {
              let getUser = await UserAPI.requestGetUser({
                user: user,
                id: item,
              });

              const listChatFriend = {
                ...getUser.data,
                conversationId: conversation?.[idx]?._id,
              };

              return listChatFriend;
            }),
          );

          setGroupChat(userList.reverse());
        }
      };
      fetchData();
    } catch (err) {
      console.log('err', err);
    }
  }, [focus]);

  const onNavChat = useCallback((e: myInfo) => {
    navigation.navigate('CHAT', {
      user: e,
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: myInfo }) => (
      <TouchableOpacity onPress={() => onNavChat(item)} style={styles.card}>
        <Image source={Images.user.avatar} style={styles.userImages} />
        <View style={styles.mainCard}>
          <View style={styles.infoView}>
            <Text style={styles.usernameTxt}>{item?.username}</Text>
            <Text style={styles.msgtimeTxt}>1 day ago</Text>
          </View>
          <Text style={styles.msgTxt}>Hello</Text>
        </View>
      </TouchableOpacity>
    ),
    [conversation],
  );

  return (
    <Container
      bodyColor={Colors.white}
      header={
        <Header
          icon="arrow-back-outline"
          textIcon={'Chat list'}
          iconSize={24}
          icColor={Colors.black}
        />
      }>
      <View style={styles.container}>
        <TouchableOpacity style={styles.forwardmsgBtn}>
          <Text style={styles.forwardmsgTxt}>Jump to...</Text>
        </TouchableOpacity>
        <FlatList
          data={groupChat}
          renderItem={renderItem}
          keyExtractor={item => item?._id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return <View style={{ height: Metrics.screen.height / 24 }}></View>;
          }}
        />
      </View>
    </Container>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  card: {
    flexDirection: 'row',
    marginTop: Metrics.screen.height / 30,
    width: Metrics.screen.width - 32,
  },
  mainCard: { width: Metrics.screen.width - 32 - Metrics.screen.height / 15 },
  userImages: {
    width: Metrics.screen.height / 15,
    height: Metrics.screen.height / 15,
    borderRadius: 6,
  },
  infoView: {
    width: '100%',
    height: Metrics.screen.height / 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usernameTxt: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 15,
    color: Colors.black,
    marginLeft: 10,
    fontWeight: '500',
  },
  msgTxt: {
    fontSize: 13.5,
    color: 'gray',
    marginLeft: 10,
    fontFamily: 'NotoSans-Regular',
  },
  msgtimeTxt: {
    color: 'gray',
    fontSize: 13,
    textAlign: 'right',
    alignSelf: 'center',
  },
  forwardmsgBtn: {
    borderWidth: 1,
    width: Metrics.screen.width - 32,
    height: Metrics.screen.height / 15,
    borderRadius: 8,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  forwardmsgTxt: {
    fontSize: 15,
    marginLeft: 12,
    fontFamily: 'NotoSans-Medium',
  },
});
