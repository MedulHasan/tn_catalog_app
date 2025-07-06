/* eslint-disable react-hooks/exhaustive-deps */
import {Dimensions, Pressable, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '../../hooks/makeStyle';
import MapView from 'react-native-maps';
import {LocationSvg} from '../../constant/icons';
import {useTheme} from '@react-navigation/native';
import {useCurrentLocation} from '../../hooks/useCurrentLocation';
import {sleep} from '../../helper/sleep';
import {RESULTS} from 'react-native-permissions';
import usePermissions from '../../hooks/usePermissions';
const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
  const theme = useTheme();
  const mapRef = useRef<MapView>(null);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const styles = useStyle();

  const {checkAndRequestLocationPermission} = usePermissions();
  const currentLocationFn = useCurrentLocation();
  const handleCurrentLocation = async () => {
    try {
      const currentLocation = await currentLocationFn();
      if (!currentLocation) throw new Error();
      setShowUserLocation(true);
      mapRef.current?.animateToRegion(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        1000,
      );
    } catch (error) {}
  };

  useEffect(() => {
    const init = async () => {
      const hasPermission = await checkAndRequestLocationPermission();
      if (hasPermission !== RESULTS.GRANTED) return;

      setShowUserLocation(true);
      await sleep(100);

      const currentLocation = await currentLocationFn();
      if (!currentLocation) return;

      mapRef.current?.animateToRegion(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        1000,
      );
    };

    if (mapReady) {
      init();
    }
  }, [mapReady]);
  return (
    <View style={styles.cont}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={false}
        scrollEnabled
        zoomEnabled
        pitchEnabled
        rotateEnabled
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        loadingEnabled={true}
        onMapReady={() => setMapReady(true)}
      />
      <Pressable style={styles.focusPoint} onPress={handleCurrentLocation}>
        <LocationSvg height={28} width={28} fill={theme.warning} />
      </Pressable>
    </View>
  );
};

export default Map;

const useStyle = makeStyles(theme => ({
  cont: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  focusPoint: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: theme.white,
    padding: 10,
    borderRadius: 50,
  },
}));
