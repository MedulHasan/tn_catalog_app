import {Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';

const LocationPermission =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

function usePermissions() {
  const checkAndRequestLocationPermission =
    async (): Promise<PermissionStatus> => {
      const status = await check(LocationPermission);
      if (
        status === RESULTS.GRANTED ||
        status === RESULTS.BLOCKED ||
        status === RESULTS.UNAVAILABLE
      ) {
        return status;
      }
      return await request(LocationPermission);
    };

  return {
    checkAndRequestLocationPermission,
  };
}

export default usePermissions;
