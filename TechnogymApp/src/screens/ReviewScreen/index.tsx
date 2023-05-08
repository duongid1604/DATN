import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Metrics } from '@src/assets';
import { Container, LoginButton } from '../components';
import { DetailStackParamList } from '@src/navigation/Stacks/detail-stack';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { CommentType } from '@src/types/comment-type';
import { getProductCommentThunk } from '@src/redux/comment/commentThunk';
import Loading from '../components/Loading';

const star = [1, 2, 3, 4, 5];

type ReviewScreenProp = StackNavigationProp<DetailStackParamList, 'REVIEW'>;
type ReviewScreenRouteProp = RouteProp<DetailStackParamList, 'REVIEW'>;

const ReviewScreen: FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation<ReviewScreenProp>();
  const route = useRoute<ReviewScreenRouteProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const { commentData, loading } = useAppSelector(state => state.comment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getProductCommentThunk({
        user: user,
        productId: route.params.productId,
      }),
    );
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(
      getProductCommentThunk({
        user: user,
        productId: route.params.productId,
      }),
    );
    setRefreshing(false);
  }, []);

  const onNavBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onNavReviewInput = useCallback(() => {
    navigation.navigate('REVIEW_INPUT', {
      productId: route.params.productId,
      img: route.params.img,
    });
  }, []);

  const renderItem = ({ item }: { item: CommentType }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.starIcon}>
          {star.map((e, i) => (
            <Ionicons
              key={i}
              name="star-sharp"
              size={32}
              style={{ color: Colors.black, padding: 1 }}
            />
          ))}
        </View>
        <Text style={styles.textCardHeader}>
          {new Date(item?.createdAt).toISOString().split('T')[0]}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.text01}>SO WORTH IT</Text>
        <View style={styles.text02Wrap}>
          <Text style={styles.text02} numberOfLines={2}>
            {item.desc}
          </Text>
        </View>
        <View style={styles.recommend}>
          <IoniconsIcons
            name="ios-checkmark-circle-sharp"
            size={18}
            style={{
              color: Colors.mediumseagreen,
              marginRight: Metrics.screen.width / 80.5,
            }}
          />
          <Text style={styles.text03}>RECOMMENDS THIS PRODUCT</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.text03}>{item.username}</Text>
        <Text style={styles.text04}>VERIFIED PURCHASER</Text>
      </View>
    </View>
  );

  return (
    <Container header bodyColor={Colors.white}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>{commentData?.length} REVIEWS</Text>
        <View style={styles.starIcon}>
          {star.map((e, i) => (
            <Ionicons
              key={i}
              name="star-sharp"
              size={32}
              style={{ color: Colors.black, padding: 1 }}
            />
          ))}
        </View>
        <TouchableOpacity onPress={onNavBack} style={styles.closeIcon}>
          <IoniconsIcons
            name="close-outline"
            size={30}
            style={{
              color: Colors.black,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.reviewInput}>
        <Text style={styles.reviewInputText}>Tell other what you thought</Text>
        <LoginButton
          textContent={'WRITE A REVIEW'}
          backgroundColor={Colors.black}
          textColor={Colors.white}
          navigation={onNavReviewInput}
          disabled={false}
          icon={false}
          loading={false}
        />
      </View>

      {loading && (
        <View style={styles.loading}>
          <Loading />
        </View>
      )}

      {!loading && (
        <FlatList
          data={commentData}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => <View style={{ height: 20 }} />}
        />
      )}
    </Container>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: Metrics.screen.height / 7.75,
    borderBottomWidth: 1,
    borderColor: Colors.gainsboro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'NotoSans-ExtraBold',
    color: Colors.black,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  starIcon: {
    flexDirection: 'row',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: 10,
    marginRight: 10,
  },
  reviewInput: {
    paddingHorizontal: Metrics.screen.width / 16,
    height: Metrics.screen.height / 6,
    justifyContent: 'center',
  },
  reviewInputText: {
    textAlign: 'center',
    marginBottom: Metrics.screen.height / 90,
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    fontSize: 16,
  },
  card: {
    width: '95%',
    height: Metrics.screen.height / 3.1,
    borderColor: Colors.gainsboro,
    borderBottomWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  cardHeader: {
    width: '100%',
    height: Metrics.screen.height / 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.screen.width / 25,
    alignItems: 'center',
    marginTop: Metrics.screen.height / 28,
    marginBottom: Metrics.screen.height / 90,
  },
  textCardHeader: {
    fontFamily: 'NotoSans-Regular',
    color: Colors.black,
    fontSize: 13.5,
  },
  cardBody: {
    height: Metrics.screen.height / 6.3,
    width: '93%',
    borderColor: Colors.gainsboro,
    borderBottomWidth: 1,
  },
  recommend: {
    flexDirection: 'row',
    height: Metrics.screen.height / 30,
    alignItems: 'center',
  },
  text01: {
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    fontSize: 14,
    marginBottom: Metrics.screen.height / 70,
  },
  text02Wrap: {
    marginBottom: Metrics.screen.height / 70,
    height: Metrics.screen.height / 20,
  },
  text02: {
    fontFamily: 'NotoSans-Medium',
    color: Colors.grey,
    fontSize: 13,
  },
  text03: {
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    fontSize: 13,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  cardFooter: {
    width: '93%',
    height: Metrics.screen.height / 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text04: {
    fontFamily: 'NotoSans-Medium',
    color: Colors.dimGray,
    fontSize: 15,
    marginLeft: Metrics.screen.width / 20,
    lineHeight: 24,
  },
  loading: {
    top: Metrics.screen.height / 6,
    alignSelf: 'center',
  },
});
