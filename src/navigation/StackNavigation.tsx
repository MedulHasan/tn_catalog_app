import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './Screens';
import Login from '../screens/auth/Login';
import ProductDetails from '../screens/product/ProductDetails';
import BottomTabNavigation from './BottomTabNavigation';
import { useAppSelector } from '../redux/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const accessToken = useAppSelector(state => state.auth).accessToken;
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={accessToken ? 'BottomTab' : 'Login'}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
