import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { io } from 'socket.io-client';

import UserAPI from '@src/api/UserAPI';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { Container, Header } from '../components';
import SlackMessage from './components/MessageCard';
import { IMessage } from '@src/types';
import { Colors } from '@src/assets';
import ChatAPI from '@src/api/ChatAPI';
import { RootStackParamList } from '@src/navigation';

type ListProductScreenRouteProp = RouteProp<RootStackParamList, 'CHAT'>;

const ChatScreen: FC = () => {
  const [messages, setMessages] = useState<Array<IMessage>>();
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);

  const route = useRoute<ListProductScreenRouteProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const messageData = useAppSelector(state => state.message.messageData);

  const dispatch = useAppDispatch();
  const socket = useRef<any>();

  useEffect(() => {
    const fetchMessage = async () => {
      const messageResponse = await ChatAPI.requestGetMessenger({
        user,
        conversationId: route?.params?.user?.conversationId,
      });
      let myMessage = await Promise.all(
        messageResponse?.data?.map(async (e: IMessage) => {
          let userMessage;
          if (!!user) {
            const getUser = await UserAPI.requestGetUser({
              user,
              id: e?.sender,
            });

            const deepUser = await JSON.parse(JSON.stringify(getUser.data));
            const clientUser = {
              name: deepUser?.username,
              _id: e?.sender,
            };
            userMessage = { ...e, user: clientUser };
          }
          return userMessage;
        }),
      );
      setMessages(myMessage.reverse());
    };
    fetchMessage();
  }, [setMessages, route]);

  useEffect(() => {
    socket.current = io('http://192.168.1.46:8900');
    socket.current.on('getMessage', (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', user?.myInfo?._id);
    socket.current.on(
      'getUsers',
      (users: { sockerId: string; userId: string }) => {
        // console.log('users', users);
      },
    );
  }, [user]);

  const onSend = useCallback(
    async (messages: Array<IMessage | undefined> = []) => {
      const payload = {
        conversationId: route?.params?.user?.conversationId,
        sender: `${messages?.[0]?.user?._id}`,
        text: messages?.[0]?.text,
      };
      socket.current.emit('sendMessage', {
        senderId: user?.myInfo?._id,
        receiverId: route.params.user?._id,
        text: messages?.[0]?.text,
      });
      try {
        if (!!user) {
          await ChatAPI.requestPostMessenger({ user, payload });
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const renderMessage = useCallback((props: any) => {
    return <SlackMessage {...props} />;
  }, []);

  const renderSend = useCallback((props: any) => {
    return (
      <Send {...props}>
        <MaterialCommunityIcons
          name="send"
          size={24}
          style={{ marginRight: 12, marginBottom: 10 }}
        />
      </Send>
    );
  }, []);

  return (
    <Container
      bodyColor={Colors.white}
      header={
        <Header
          icon="arrow-back-outline"
          textIcon={'MESSAGE'}
          iconSize={24}
          icColor={Colors.black}
        />
      }>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user?.myInfo?._id,
          name: user?.myInfo?.username,
        }}
        renderMessage={renderMessage}
        renderSend={renderSend}
        alwaysShowSend
        renderAvatarOnTop={true}
        scrollToBottom
        placeholder={`Message to ${route.params?.user?.username}...`}
      />
    </Container>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
