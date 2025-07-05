import { View } from 'react-native';
import React from 'react';
import { makeStyles } from '../hooks/makeStyle';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import CustomText from '../components/CustomText';
import { Fonts } from '../constant/fonts';

const Header: React.FC<BottomTabHeaderProps> = ({ route, options }) => {
  const styles = useStyle();
  return (
    <View style={styles.cont}>
      <CustomText tag="large" weight={Fonts.SemiBold}>
        {options.title || route.name}
      </CustomText>
    </View>
  );
};

export default Header;

const useStyle = makeStyles(theme => ({
  cont: {
    backgroundColor: theme.white,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
}));
