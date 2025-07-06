import {View} from 'react-native';
import React from 'react';
import {makeStyles} from '../../hooks/makeStyle';
import MapView from 'react-native-maps';

const Map = () => {
  const styles = useStyle();
  return (
    <View style={styles.cont}>
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        loadingEnabled={true}
      />
    </View>
  );
};

export default Map;

const useStyle = makeStyles(() => ({
  cont: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
}));
