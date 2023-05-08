import React, { FC, useCallback } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ShopStackParamList } from '@src/navigation/Stacks/shop-stack';
import { Metrics, Colors } from '@src/assets';
import { Container, Header } from '../components';
import { CategoryItem } from '@src/types';

type ProductCategoryScreenProp = StackNavigationProp<
  ShopStackParamList,
  'PRODUCT_CATEGORY'
>;

type ProductCategoryScreenRouteProp = RouteProp<
  ShopStackParamList,
  'PRODUCT_CATEGORY'
>;

const ITEM_HEIGHT = Metrics.screen.height / 8.3;

const ProductCategoryScreen: FC = () => {
  const navigation = useNavigation<ProductCategoryScreenProp>();
  const route = useRoute<ProductCategoryScreenRouteProp>();
  const data = route?.params?.item?.category;

  const onNavProductDetail = useCallback(
    (item: CategoryItem, index: number) => {
      navigation.navigate('LIST_PRODUCT', {
        name: item.apiName,
        itemName: data[index].name,
      });
    },
    [],
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: CategoryItem;
    index: number;
  }) => (
    <TouchableWithoutFeedback onPress={() => onNavProductDetail(item, index)}>
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemChildContainer}>
          <Image source={{ uri: item.image }} style={styles.img} />
          <Text style={styles.txtTitle}>{item.name}</Text>
          <Ionicons
            name={'chevron-forward-outline'}
            size={22}
            color={Colors.black}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <Container
      bodyColor={Colors.white}
      header={
        <Header
          icon="arrow-back-outline"
          textIcon={route?.params?.item?.name}
          iconSize={24}
          icColor={Colors.black}
        />
      }>
      <FlatList data={data} renderItem={renderItem} />
    </Container>
  );
};

export default ProductCategoryScreen;

const styles = StyleSheet.create({
  renderItemContainer: {
    width: Metrics.screen.width,
    height: ITEM_HEIGHT,
    backgroundColor: Colors.white,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.whiteSmoke01,
    justifyContent: 'center',
    padding: 6,
  },
  renderItemChildContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  img: {
    height: '100%',
    width: ITEM_HEIGHT - 12,
  },
  txtTitle: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 14.5,
    color: Colors.black,
    textTransform: 'uppercase',
    flexWrap: 'wrap',
    width: '64%',
  },
});
