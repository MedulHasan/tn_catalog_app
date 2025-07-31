import {Pressable, View} from 'react-native';
import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {LeftArroeSvg} from '../constant/icons';
import {makeStyles} from '../hooks/makeStyle';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './Screens';

const DetailsHeader: React.FC<NativeStackHeaderProps> = ({options}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handlePress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('BottomTab', {
        screen: 'Home',
      });
    }
  };
  const styles = useStyle();
  return (
    <Pressable style={styles.cont} onPress={handlePress}>
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
