import {Pressable, View} from 'react-native';
import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {LeftArroeSvg} from '../constant/icons';
import {makeStyles} from '../hooks/makeStyle';

const DetailsHeader: React.FC<NativeStackHeaderProps> = ({
  navigation,
  options,
}) => {
  const styles = useStyle();
  return (
    <Pressable style={styles.cont} onPress={() => navigation.goBack()}>
      <LeftArroeSvg height={36} width={36} />
      {options.headerRight && (
        <View>{options.headerRight({canGoBack: false})}</View>
      )}
    </Pressable>
  );
};

export default DetailsHeader;

const useStyle = makeStyles(theme => ({
  cont: {
    backgroundColor: theme.white,
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
