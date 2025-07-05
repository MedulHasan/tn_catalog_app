import { View, Text } from 'react-native';
import React from 'react';
import { makeStyles } from '../../hooks/makeStyle';

const Map = () => {
  const styles = useStyle();
  return (
    <View style={styles.cont}>
      <Text>Map</Text>
    </View>
  );
};

export default Map;

const useStyle = makeStyles(theme => ({
  cont: {
    flex: 1,
    backgroundColor: theme.white,
  },
}));
