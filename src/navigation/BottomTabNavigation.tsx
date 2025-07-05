import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './Screens';
import Map from '../screens/map/Map';
import Favourites from '../screens/favourites/Favourites';
import Home from '../screens/home/Home';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
