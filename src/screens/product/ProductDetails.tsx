import { Image, ScrollView, View } from 'react-native';
import React from 'react';
import { makeStyles } from '../../hooks/makeStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Screens';
import CustomText from '../../components/CustomText';
import { Fonts } from '../../constant/fonts';
import CustomButton from '../../components/CustomButton';

const ProductDetails: React.FC<
  NativeStackScreenProps<RootStackParamList, 'ProductDetails'>
> = ({ route }) => {
  const { thumbnail, title, price, description } = route.params.itemDetails;
  const styles = useStyle();
  return (
    <ScrollView
      style={styles.cont}
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: thumbnail }} style={styles.image} />
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
};

export default ProductDetails;

const useStyle = makeStyles(theme => ({
  cont: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
  },
  image: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  descTitle: {
    marginVertical: 20,
  },
  desc: {
    color: theme.text[20],
  },
  buttonCont: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
}));
