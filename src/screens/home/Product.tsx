import { View, Image, Pressable } from 'react-native';
import React from 'react';
import { makeStyles } from '../../hooks/makeStyle';
import { ProductType } from '../../utils/types';
import CustomText from '../../components/CustomText';
import { FavouriteSvg } from '../../constant/icons';
import { Fonts } from '../../constant/fonts';
import { HIT_SLOP } from '../../constant/variables';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../redux/store';
import { setFavouriteItem } from '../../redux/features/product/productSlice';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Screens';

interface Props {
  item: ProductType;
  isLastIndex: boolean;
}

const Product: React.FC<Props> = ({ item, isLastIndex }) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const favouriteItems = useAppSelector(state => state.products.favouriteItems);
  const isFavourite = favouriteItems.findIndex(i => i.id === item.id);

  const handleFavourite = () => {
    dispatch(setFavouriteItem(item));
  };
  const handleDescription = () => {
    navigation.navigate('ProductDetails', { itemDetails: item });
  };
  const styles = useStyle({ isLastIndex });
  return (
    <Pressable style={styles.cont} onPress={handleDescription}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.textCont}>
        <CustomText numberOfLines={1} tag="h1" weight={Fonts.Medium}>
          {item.title}
        </CustomText>
        <CustomText
          tag="h1"
          weight={Fonts.Regular}
        >{`$${item.price}`}</CustomText>
      </View>
      <Pressable onPress={handleFavourite} hitSlop={HIT_SLOP}>
        <FavouriteSvg
          height={20}
          width={20}
          fill={isFavourite === -1 ? '' : theme.error[20]}
        />
      </Pressable>
    </Pressable>
  );
};

export default Product;

interface PropsStyle {
  isLastIndex: boolean;
}

const useStyle = makeStyles((theme, props: PropsStyle) => ({
  cont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: props.isLastIndex ? 0 : 1,
    borderBottomColor: theme.border[10],
    paddingBottom: 8,
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: theme.background[30],
    borderRadius: 12,
  },
  textCont: {
    flex: 1,
    gap: 4,
    marginRight: 5,
  },
}));
