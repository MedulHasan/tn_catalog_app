import { View, Text } from 'react-native';
import React from 'react';
import { makeStyles } from '../../hooks/makeStyle';

const Home = () => {
  const styles = useStyle();
  return (
    <View style={styles.cont}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const useStyle = makeStyles(theme => ({
  cont: {
    flex: 1,
    backgroundColor: theme.white,
  },
}));
