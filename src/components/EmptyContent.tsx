import { View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { makeStyles } from '../hooks/makeStyle';
import { Fonts } from '../constant/fonts';

interface Props {
  title: string;
}

const EmptyContent: React.FC<Props> = ({ title }) => {
  const styles = useStyle();
  return (
    <View style={styles.cont}>
      <CustomText tag="h3" weight={Fonts.SemiBold}>
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
});
