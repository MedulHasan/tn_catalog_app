import { View, Button } from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Screens';

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate('BottomTab');
  };
  return (
    <View>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
