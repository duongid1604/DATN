import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

import { LoginStackNavigationProp } from '@src/navigation/Stacks/login-stack';
import { Container, LoginButton } from '../components';
import { Colors, Metrics, Clips } from '@src/assets';

const ITEM_HEIGHT = Metrics.screen.height * 0.8;

const WelcomeScreen: FC<LoginStackNavigationProp> = ({ navigation }) => {
  return (
    <Container header>
      <Video
        source={Clips.sport}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
      <LinearGradient
        colors={[Colors.black, Colors.transparentBlack]}
        style={styles.gradientHeader}>
        <TouchableOpacity>
          <IoniconsIcons
            name="settings-outline"
            size={24}
            style={{ color: Colors.white }}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>APP SETTINGS</Text>
      </LinearGradient>
      <BottomSheet
        index={0}
        backgroundStyle={{ backgroundColor: Colors.white }}
        snapPoints={[
          Metrics.screen.height - ITEM_HEIGHT,
          Metrics.screen.height,
        ]}>
        <View style={styles.bottomSheet}>
          <View style={styles.textWrap}>
            <Text style={styles.textHeaderSheet}>MEMBERS GET REWARDED</Text>
            <Text style={styles.textBodySheet}>
              Join our BakeHouse membership programme to earn points, level up
              and unlock special rewards
            </Text>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.textHeaderSheet}>JOIN BAKEHOUSE</Text>
            <Text style={styles.textBodySheet}>
              Inside BakeHouseMember, there's something for everyone - from
              acecess to limited edition bake drops to special event invitations
              and more. Join for free and get immediate access to limited
              edition bake drops to special event invitations and more. Join for
              free and get immediate access to all Level 1 rewards. To unlock
              new levels and rewards, earn points by making purchases, leaving
              reviews, sharing photos, eating and more. {'\n'}
              {'\n'}
              Already a member? Log in to check your status and get points when
              using the app.
            </Text>
          </View>
        </View>
      </BottomSheet>
      <View style={[styles.footer, styles.viewTrick]}>
        <LoginButton
          textContent={'LOG IN'}
          backgroundColor={Colors.white}
          textColor={Colors.black}
          navigation={() => navigation.navigate('LOGIN_INPUT')}
          disabled={false}
          icon={false}
          loading={false}
        />
        <LoginButton
          textContent={'JOIN BAKEHOUSE'}
          backgroundColor={Colors.black}
          textColor={Colors.white}
          navigation={() => navigation.navigate('REGISTER_INPUT')}
          disabled={false}
          icon={false}
          loading={false}
        />
      </View>
    </Container>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientHeader: {
    height: Metrics.screen.height / 11,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.screen.width / 20,
  },
  textHeader: {
    fontFamily: 'NotoSans-Bold',
    color: Colors.white,
    fontSize: 13,
    letterSpacing: 1,
    marginLeft: Metrics.screen.width / 15,
  },
  backgroundVideo: {
    height: '90%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  viewTrick: { top: Metrics.screen.height - Metrics.screen.height / 3.675 },
  footer: {
    paddingHorizontal: Metrics.screen.width / 25,
    justifyContent: 'center',
    width: '100%',
    height: Metrics.screen.height / 5.6,
    backgroundColor: Colors.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bottomSheet: {
    paddingHorizontal: Metrics.screen.width / 20,
  },
  textWrap: {
    marginTop: Metrics.screen.height / 50,
    marginBottom: Metrics.screen.height / 30,
  },
  textHeaderSheet: {
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    fontSize: 28,
  },
  textBodySheet: {
    fontFamily: 'NotoSans-Medium',
    color: Colors.black,
    fontSize: 13,
    marginTop: Metrics.screen.height / 90,
  },
});
