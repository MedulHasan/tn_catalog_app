import {RESULTS} from 'react-native-permissions';
import {Alert, Linking, Platform} from 'react-native';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
import {LatLng} from 'react-native-maps';
import usePermissions from './usePermissions';
import {getCurrentLocation} from '../helper/location';

export const useCurrentLocation = () => {
  const {checkAndRequestLocationPermission} = usePermissions();
  const currentLocation = async (): Promise<LatLng | null> => {
    if (Platform.OS === 'android') {
      const checkLocationEnable = await isLocationEnabled();
      if (!checkLocationEnable) {
        await promptForEnableLocationIfNeeded();
        return null;
      }
    }
    const result = await checkAndRequestLocationPermission();
    if (result === RESULTS.GRANTED) {
      return await getCurrentLocation();
    } else {
      Alert.alert(
        'Enable Location Service',
        'Sharing your location allows us to find restaurants and shops near you, and provide you with accurate delivery information.',
        [
          {text: 'No'},
          {text: 'Settings', onPress: () => Linking.openSettings()},
        ],
      );
      return null;
    }
  };
  return currentLocation;
};
