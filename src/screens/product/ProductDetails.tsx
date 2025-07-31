/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {ScrollView, Share, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {makeStyles} from '../../hooks/makeStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Screens';
import CustomText from '../../components/CustomText';
import {Fonts} from '../../constant/fonts';
import CustomButton from '../../components/CustomButton';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {FavouriteSvg, ShareSvg} from '../../constant/icons';
import {useDispatch} from 'react-redux';
import {AppDispatch, useAppSelector} from '../../redux/store';
import {setFavouriteItem} from '../../redux/features/product/productSlice';
import ProgressiveImage from '../../components/ProgressiveImage';
import {useGetProductDetailsQuery} from '../../redux/features/product/product';
import LoadingModal from '../../components/LoadingModal';
import EmptyContent from '../../components/EmptyContent';
import {appPrefixes, product} from '../../constant/linkRoute';

const ProductDetails: React.FC<
  NativeStackScreenProps<RootStackParamList, 'ProductDetails'>
> = ({route}) => {
  const id = route.params.id;
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const favouriteItems = useAppSelector(state => state.products.favouriteItems);
  const isFavourite = favouriteItems.findIndex(i => i.id === id);

  const {isLoading, isSuccess, data, isError} = useGetProductDetailsQuery({id});

  const handleFavourite = () => {
    dispatch(setFavouriteItem(data!));
  };

  const handleShare = () => {
    Share.share({
      message: `Check this out: ${appPrefixes}${product}/${id}`,
    });
  };

  const styles = useStyle();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.rightIcons}>
          <ShareSvg height={28} width={28} onPress={handleShare} />
          <FavouriteSvg
            height={28}
            width={28}
            onPress={handleFavourite}
            fill={isFavourite === -1 ? '' : theme.error[20]}
          />
        </View>
      ),
    });
  }, [navigation, isFavourite]);

  let content;
  if (isLoading) {
    content = <LoadingModal isVisible={isLoading} />;
  }
  if (!isLoading && isError) {
    content = (
      <EmptyContent
        title="Something went wrong, please refresh you app!"
        style={{paddingHorizontal: 20}}
      />
    );
  }

  if (!isLoading && isSuccess) {
    const {thumbnail, title, price, description} = data;
    content = (
      <ScrollView
        style={styles.cont}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <ProgressiveImage source={{uri: thumbnail}} style={styles.image} />
        <CustomText tag="large" weight={Fonts.SemiBold}>
          {title}
        </CustomText>
        <CustomText tag="h3" weight={Fonts.Medium}>{`$${price}`}</CustomText>
        <CustomText tag="h1" weight={Fonts.SemiBold} style={styles.descTitle}>
          Description
        </CustomText>
        <CustomText tag="h5" weight={Fonts.Regular} style={styles.desc}>
          {description}
        </CustomText>
        <View style={styles.buttonCont}>
          <CustomButton
            title="Add to basket"
            onPress={() => {}}
            style={styles.button}
          />
          <CustomButton
            title="Buy now"
            onPress={() => {}}
            style={styles.button}
          />
        </View>
      </ScrollView>
    );
  }

  return content;
};

export default ProductDetails;

const useStyle = makeStyles(theme => ({
  cont: {
    flex: 1,
    backgroundColor: theme.white,
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  image: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    marginBottom: 16,
  },
  descTitle: {
    marginVertical: 20,
  },
  desc: {
    color: theme.text[20],
    marginBottom: 20,
  },
  buttonCont: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
}));
