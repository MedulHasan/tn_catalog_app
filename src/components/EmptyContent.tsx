import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {makeStyles} from '../hooks/makeStyle';
import {Fonts} from '../constant/fonts';

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const EmptyContent: React.FC<Props> = ({title, style}) => {
  const styles = useStyle();
  return (
    <View style={[styles.cont, style]}>
      <CustomText tag="h3" weight={Fonts.SemiBold} style={styles.text}>
        {title}
      </CustomText>
    </View>
  );
};

export default EmptyContent;

const useStyle = makeStyles({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  text: {
    textAlign: 'center',
  },
});
