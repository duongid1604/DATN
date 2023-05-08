import React, { FC, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { useForm } from 'react-hook-form';

import { Colors, Metrics } from '@src/assets';
import { Container, DescribeForm, Header, LoginButton } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';
import { DetailStackParamList } from '@src/navigation/Stacks/detail-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CommentType } from '@src/types/comment-type';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { getProductCommentThunk, postCommentThunk } from '@src/redux/comment/commentThunk';
import { setCommentReload } from '@src/redux/comment/commentSlice';

type ReviewInputScreenProp = StackNavigationProp<
  DetailStackParamList,
  'REVIEW_INPUT'
>;
type ReviewInputScreenRouteProp = RouteProp<
  DetailStackParamList,
  'REVIEW_INPUT'
>;

const ReviewInputScreen: FC = () => {
  const navgation = useNavigation<ReviewInputScreenProp>();
  const route = useRoute<ReviewInputScreenRouteProp>();
  const user = useAppSelector(state => state.auth.userInfo);
  const loadingPost = useAppSelector(state => state.comment.loadingPost);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productId: route.params.productId,
      userId: user?.myInfo?._id,
      username: user?.myInfo?.username,
      desc: '',
    },
  });

  const onSubmit = useCallback(async (data: CommentType | any) => {
    
    await dispatch(
      postCommentThunk({
        user: user,
        comment: data,
      }),
    );
    dispatch(setCommentReload())
    dispatch(getProductCommentThunk({
      user :user,
      productId: route.params.productId,
    }))

    navgation.goBack();
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-around' }}>
      <Container
        header={
          <Header
            bgColor={Colors.white}
            icon={'chevron-back'}
            iconSize={24}
            icColor={Colors.black}
            textIcon={'REVIEW'}
          />
        }
      >
        <View style={styles.header} />
        <View style={styles.body}>
          <View>
            <Text style={styles.textBody}>
              Sum up your opinion about this product in one sentence
            </Text>
            <DescribeForm
              control={control}
              secureTextEntry={false}
              rules={{
                required: { value: true, message: 'Required Information' },
              }}
              name={'desc'}
              error={errors?.desc?.message}
              placeholder={'DESCRIBE'}
              autofocus={true}
            />
          </View>

          <View style={styles.bodyFooter}>
            <LoginButton
              textContent={'NEXT'}
              backgroundColor={Colors.black}
              textColor={Colors.white}
              disabled={loadingPost}
              icon={false}
              form={true}
              submit={handleSubmit(onSubmit)}
              loading={loadingPost}
            />
          </View>
        </View>
        <Image style={styles.image} source={{ uri: route.params.img }} />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default ReviewInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Metrics.screen.height / 6,
    backgroundColor: 'black',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: Metrics.screen.width / 25,
  },
  textBody: {
    width: '100%',
    height: Metrics.screen.height / 10,
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    fontSize: 20,
    marginTop: Metrics.screen.height / 13,
    marginBottom: Metrics.screen.height / 90,
  },
  bodyFooter: {
    bottom: Metrics.screen.height / 36,
  },
  image: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignSelf: 'center',
    top: Metrics.screen.height / 10,
  },
});
