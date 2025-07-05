/* eslint-disable react/no-unstable-nested-components */
import { View, Pressable } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { makeStyles } from '../hooks/makeStyle';
import { FavouriteSvg, HomeSvg, MapPinSvg } from '../constant/icons';
import { useTheme } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';
import { BottomTabParamList } from './Screens';

const tabIcons: Record<keyof BottomTabParamList, React.FC<SvgProps>> = {
  Home: HomeSvg,
  Favourites: FavouriteSvg,
  Map: MapPinSvg,
};

const TabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const theme = useTheme();
  const styles = useStyle();
  return (
    <View style={styles.cont}>
      {state.routes.map((route, index) => {
        const routeName = route.name as keyof BottomTabParamList;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const IconComponent = tabIcons[routeName];

        return (
          <Pressable key={index} onPress={onPress} style={styles.tabButton}>
            <IconComponent
              height={24}
              width={24}
              fill={isFocused ? theme.primary : ''}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;

const useStyle = makeStyles(theme => ({
  cont: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: theme.white,
    borderTopWidth: 1,
    borderTopColor: theme.border[10],
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
