import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  CompositeScreenProps,
  useIsFocused,
  useNavigation,
  useScrollToTop,
} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { HomeStackParamList } from '@src/navigation/Stacks/home-stack';
import { Colors, Metrics } from '@src/assets';
import NextButton from './components/NextButton';
import { BackgroundItemView, Container, SearchBar } from '../components';
import { StackScreenProps } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { getAllChatThunk } from '@src/redux/chat/chatThunk';
import ChatAPI from '@src/api/ChatAPI';
import { homeThunk } from '@src/redux/home/homeThunk';
import { setNewDataReload } from '@src/redux/home/homeSlice';
import { RootStackParamList } from '@src/navigation';
import Loading from '../components/Loading';

const ITEM_WIDTH = Metrics.screen.width;
const ITEM_HEIGHT = Metrics.screen.height * 0.8;
const HEADER_MAX_HEIGHT = 60;
const HEADER_MIN_HEIGHT = 0;

interface DataProps {
  mainImage: string;
  mainTitle: string;
  headerImage: string;
  bodyImage: string;
  noteImage: string;
  textHeader: string;
  textBody01: string;
  textBody02: string;
  textBody03: string;
  textQuote: string;
  _id: string;
}

export type HomeScreenProp = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, 'HOME'>,
  StackScreenProps<RootStackParamList, 'SEARCH'>
>;

export type HomeNavigationProp = HomeScreenProp['navigation'];

const HomeScreen: FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const user = useAppSelector(state => state.auth.userInfo);
  const conversation = useAppSelector(state => state.conversation.conversation);
  const { newData, loading } = useAppSelector(state => state.home);
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useAppDispatch();

  const focus = useIsFocused();

  let AnimatedHeaderValue = new Animated.Value(0);

  const ref = useRef(null);

  useScrollToTop(ref);

  useEffect(() => {
    dispatch(setNewDataReload());
    dispatch(homeThunk());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setNewDataReload());
    dispatch(homeThunk());
    setRefreshing(false);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <AntDesign name="inbox" size={25} color={Colors.black} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getAllChatThunk({ user }));
  }, [focus]);

  const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const onNavChat = useCallback(async () => {
    if (!!user?.myInfo?.admin) {
      navigation.navigate('CHAT_LIST');
    } else if (
      !!conversation &&
      conversation?.length === 0 &&
      !!user?.myInfo?._id &&
      user?.myInfo?.admin === false
    ) {
      const newConversation = {
        senderId: user?.myInfo?._id,
        receiverId: '631aeee995ef8367484c3f27',
      };
      const conversationResponse = await ChatAPI.requestPostConversation({
        user: user,
        conversation: newConversation,
      });

      const sender = {
        __v: 0,
        _id: user?.myInfo?._id,
        username: user?.myInfo?.username,
        admin: false,
        conversationId: conversationResponse.data._id,
        email: user?.myInfo?.email,
        createdAt: user?.myInfo?.createdAt,
        updatedAt: user?.myInfo?.updatedAt,
      };
      navigation.navigate('CHAT', {
        user: sender,
      });
    } else if (
      !!conversation &&
      conversation?.length > 0 &&
      !!user?.myInfo?._id &&
      user?.myInfo?.admin === false
    ) {
      const conversationResponse = await ChatAPI.requestGetUserConversation({
        user: user,
      });
      const sender = {
        __v: 0,
        _id: user?.myInfo?._id,
        username: user?.myInfo?.username,
        admin: false,
        conversationId: conversationResponse?.data?.[0]?._id,
        email: user?.myInfo?.email,
        createdAt: user?.myInfo?.createdAt,
        updatedAt: user?.myInfo?.updatedAt,
      };
      navigation.navigate('CHAT', {
        user: sender,
      });
    }
  }, [conversation, focus]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onNavChat}>
          <AntDesign name="inbox" size={25} color={Colors.black} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: DataProps; index: number }) => {
    return (
      <View style={styles.viewImg}>
        <ImageBackground
          source={{ uri: item?.mainImage }}
          style={styles.image}
        />
        <View style={styles.topViewBg}>
          <BackgroundItemView backgroundColor={Colors.black}>
            <Text numberOfLines={1} style={[styles.txtBg, styles.txtHeaderBg]}>
              {item?.mainTitle}
            </Text>
          </BackgroundItemView>
        </View>
        <View style={styles.viewBg}>
          <BackgroundItemView backgroundColor={Colors.white}>
            <Text
              style={[styles.txtBg, { fontFamily: 'NotoSans-MediumItalic' }]}>
              {item?.textHeader}
            </Text>
          </BackgroundItemView>
          <BackgroundItemView backgroundColor={Colors.white}>
            <Text style={styles.txtBg01}>{item?.textBody01}</Text>
          </BackgroundItemView>
          <NextButton
            textButton={'Learn more'}
            nav={() => {
              navigation.navigate('NEW', { item });
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <Container bodyColor={Colors.white}>
      <TouchableOpacity onPress={() => navigation.navigate('SEARCH')}>
        <SearchBar height={animatedHeaderHeight} />
      </TouchableOpacity>

      <StatusBar animated />

      {loading && (
        <View style={styles.loading}>
          <Loading />
        </View>
      )}

      <FlatList
        data={newData}
        keyExtractor={item => item._id}
        snapToInterval={ITEM_HEIGHT}
        // ref={ref}
        decelerationRate="normal"
        showsVerticalScrollIndicator={false}
        // bounces={false}
        renderItem={renderItem}
        // scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
          { useNativeDriver: false },
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  viewImg: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'stretch',
  },
  topViewBg: {
    width: '100%',
    height: '40%',
    top: '2%',
    position: 'absolute',
    paddingLeft: 16,
  },
  viewBg: {
    width: '100%',
    height: '40%',
    top: '74%',
    position: 'absolute',
    paddingLeft: 16,
  },
  txtHeaderBg: {
    color: Colors.white,
    fontFamily: 'NotoSans-Medium',
  },
  txtBg: {
    fontSize: 16,
    fontFamily: 'NotoSans-Medium',
    color: Colors.black,
    textTransform: 'uppercase',
  },
  txtBg01: {
    fontSize: 12,
    fontFamily: 'NotoSans-Regular',
    color: Colors.black,
  },
  loading: {
    top: Metrics.screen.height / 4,
    alignSelf: 'center',
  },
});
