import Config from 'react-native-config';

export interface EnvironmentVariables {
  GOOGLE_MAPS_API_KEY: string;
  API_BASE_URL: string;
  ENV: string;
}

// Type-safe environment variables
export const ENV: EnvironmentVariables = {
  GOOGLE_MAPS_API_KEY: Config.GOOGLE_MAPS_API_KEY || '',
  API_BASE_URL: Config.API_BASE_URL || '',
  ENV: Config.ENV || 'development',
};
