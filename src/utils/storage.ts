import { MMKV } from 'react-native-mmkv';

export enum StorageKeys {
  User = 'user',
  Favourite = 'favourite',
}

export const storage = new MMKV();
