import { MMKV } from 'react-native-mmkv';

export enum StorageKeys {
  User = 'user',
}

export const storage = new MMKV();
