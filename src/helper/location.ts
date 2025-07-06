import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {LatLng} from 'react-native-maps';

export const getCurrentLocation = async (): Promise<LatLng> => {
  const position = await new Promise<GeolocationResponse>((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject);
  });
  return await {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
};
