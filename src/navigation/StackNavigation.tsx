import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './Screens';
import Login from '../screens/auth/Login';
import ProductDetails from '../screens/product/ProductDetails';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
