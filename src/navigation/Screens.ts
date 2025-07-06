import { NavigatorScreenParams } from '@react-navigation/native';
import { ProductType } from '../utils/types';

export type RootStackParamList = {
  Login: undefined;
  ProductDetails: { itemDetails: ProductType };
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
};

export type BottomTabParamList = {
  Home: undefined;
  Favourites: undefined;
  Map: undefined;
};
