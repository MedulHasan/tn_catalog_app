import { View, Text } from 'react-native';
import React from 'react';
import { makeStyles } from '../../hooks/makeStyle';

const Favourites = () => {
  const styles = useStyle();
  return (
    <View style={styles.cont}>
      <Text>Favourites</Text>
    </View>
  );
};

export default Favourites;

const useStyle = makeStyles(theme => ({
  cont: {
    flex: 1,
    backgroundColor: theme.white,
  },
}));
