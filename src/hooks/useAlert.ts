import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Alert } from 'react-native';

function useAlert() {
  const showError = (error?: FetchBaseQueryError | SerializedError) => {
    if (error && 'status' in error) {
      switch (error.status) {
        case 'FETCH_ERROR':
          showAlert(
            "Sorry we couldn't process your request. Please check you are connected to the internet.",
          );
          break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 506:
        case 507:
          showAlert(
            "Sorry we've run into some issues. Please try again later." +
              ` (${error.status})`,
          );
          break;
        default:
          showAlert(
            'Something went wrong. Please try again.' + ` (${error.status})`,
          );
      }
    } else {
      showAlert();
    }
  };

  const showAlert = (message?: string) => {
    Alert.alert('Error', message ?? 'Something went wrong. Please try again.', [
      { text: 'Ok' },
    ]);
  };

  return {
    showError,
    showAlert,
  };
}

export default useAlert;
