import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchList from './components/SearchList';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { ProductList } from '@src/types';
import { Container } from '../components';
import { Colors } from '@src/assets';
import { searchProductThunk } from '@src/redux/search/searchThunk';

const SearchScreen: FC = () => {
  const [data, setData] = useState<ProductList>();
  const user = useAppSelector(state => state.auth.userInfo);
  const search = useAppSelector(state => state.search.search);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(searchProductThunk(user));
  }, []);

  const onChangeText = useCallback(
    debounce((text: string) => {
      let searchResult = search?.filter(val => {
        let lowercaseText = val?.title?.toLowerCase();
        return lowercaseText.includes(text.toLowerCase());
      });
      if (text === '' || text === undefined) {
        setData(undefined);
      } else {
        setData(searchResult);
      }
    }, 300),
    [search],
  );

  const onNavGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <Container bodyColor={Colors.white}>
      <SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
        <View style={styles.viewSearch}>
          <TouchableOpacity
            onPress={onNavGoBack}
            style={{ marginHorizontal: 8 }}>
            <Ionicons
              name={'chevron-back-outline'}
              size={26}
              color={Colors.nightRiderGrey}
            />
          </TouchableOpacity>
          <TextInput
            onChangeText={onChangeText}
            autoFocus
            selectionColor={Colors.nightRiderGrey}
            placeholder="Find products..."
            style={styles.txtSearch}
          />
        </View>
        <View style={styles.viewProduct}>
          <Text style={styles.txtTitle}>Products</Text>
        </View>
        <FlatList
          data={data}
          renderItem={SearchList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
        />
      </SafeAreaView>
    </Container>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewSearch: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.veryLightGrey,
  },
  txtSearch: {
    fontSize: 13.5,
    fontFamily: 'NotoSans-Regular',
    color: Colors.dimGray,
    width: '76%',
  },
  viewProduct: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.whiteGainsboro,
  },
  txtTitle: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
    textTransform: 'uppercase',
    color: Colors.black,
    marginHorizontal: 16,
    marginVertical: 12,
  },
});
