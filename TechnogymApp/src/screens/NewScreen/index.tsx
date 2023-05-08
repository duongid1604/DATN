import React, { FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import { useRoute, RouteProp } from '@react-navigation/native';

import { Container } from '../components';
import { HomeStackParamList } from '@src/navigation/Stacks/home-stack';
import { Colors, Metrics } from '@src/assets';

interface NewScreenProps {
  navigation: any;
}

type NewScreenRouteProp = RouteProp<HomeStackParamList, 'NEW'>;

const NewScreen: FC<NewScreenProps> = ({ navigation }) => {
  const { params } = useRoute<NewScreenRouteProp>();

  const data = params.item;

  return (
    <Container header bodyColor={Colors.white}>
      <ScrollView>
        <Image
          style={styles.headerImage}
          source={{
            uri: data?.headerImage,
          }}
        />
        <View style={styles.wrap}>
          <Text style={styles.textHeader}>{data?.textHeader}</Text>
          <Text style={styles.textBody}>{data?.textBody01}</Text>
          <Text style={styles.textBody}>{data?.textBody02}</Text>
          <Image
            style={styles.bodyImage}
            source={{
              uri: data?.bodyImage,
            }}
          />
          <Text style={styles.imageNote}>{data?.noteImage}</Text>
          <Text style={styles.textQuote}>{`"${data?.textQuote}"`}</Text>
          <Text style={styles.textBody}>{data?.textBody03}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.pop()}>
        <IoniconsIcons
          name="arrow-back-sharp"
          size={28}
          style={{ color: 'black' }}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default NewScreen;

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Metrics.screen.width / 15,
  },
  headerImage: {
    width: '100%',
    height: Metrics.screen.height / 5,
    marginBottom: Metrics.screen.height / 15,
  },
  textHeader: {
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    fontSize: 20,
    marginBottom: Metrics.screen.height / 40,
  },
  textBody: {
    fontFamily: 'NotoSans-Medium',
    color: Colors.black,
    fontSize: 15,
    marginBottom: Metrics.screen.height / 50,
  },
  bodyImage: {
    width: '100%',
    height: Metrics.screen.height / 3,
    marginBottom: Metrics.screen.height / 90,
  },
  imageNote: {
    width: '100%',
    alignSelf: 'center',
    fontFamily: 'NotoSans-Medium',
    color: Colors.black,
    marginBottom: Metrics.screen.height / 50,
  },
  textQuote: {
    fontFamily: 'NotoSans-Bold',
    color: Colors.black,
    fontSize: 22,
    marginBottom: Metrics.screen.height / 40,
    letterSpacing: 1,
    textAlign: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: Metrics.screen.width / 30,
    marginTop: Metrics.screen.height / 60,
  },
});
