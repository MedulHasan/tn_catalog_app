import React from 'react';
import {View} from 'react-native';
import {useTimestamp} from '../hooks/useTimestamp';
import {makeStyles} from '../hooks/makeStyle';
import {Fonts} from '../constant/fonts';
import CustomText from './CustomText';

const FloatingTimestamp: React.FC = () => {
  const {localTime} = useTimestamp();
  const styles = useStyle();

  if (!localTime) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>{localTime}</CustomText>
    </View>
  );
};

const useStyle = makeStyles(theme => ({
  container: {
    position: 'absolute',
    right: 20,
    top: -50,
    backgroundColor: theme.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  text: {
    color: theme.white,
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
  },
}));

export default FloatingTimestamp;
