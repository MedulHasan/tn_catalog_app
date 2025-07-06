import { Pressable } from 'react-native';
import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { LeftArroeSvg } from '../constant/icons';
import { makeStyles } from '../hooks/makeStyle';

const DetailsHeader: React.FC<NativeStackHeaderProps> = ({ navigation }) => {
  const styles = useStyle();
  return (
    <Pressable style={styles.cont} onPress={() => navigation.goBack()}>
      <LeftArroeSvg height={36} width={36} />
    </Pressable>
  );
};

export default DetailsHeader;

const useStyle = makeStyles(theme => ({
  cont: {
    backgroundColor: theme.white,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
}));
