import { DefaultTheme } from '@react-navigation/native';

export const createLightTheme = {
  ...DefaultTheme,
  primary: '#1971ED',
  success: '#00B84A',
  info: '#3EAEFF',
  warning: '#FFA23A',
  error: {
    10: '#FE5050',
    20: '#E22739',
  },
  background: {
    10: '#E2ECFEBF',
    20: '#ADB3B8',
    30: '#E8E8E8',
  },
  border: {
    10: '#D9D9D9',
  },
  text: {
    10: '#222222',
  },
  black: '#000000',
  white: '#FFFFFF',
};

export type CustomTheme = typeof createLightTheme;

declare module '@react-navigation/native' {
  export function useTheme(): CustomTheme;
}
