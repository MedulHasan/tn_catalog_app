import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Screens';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { makeStyles } from '../../hooks/makeStyle';
import { BagSvg } from '../../constant/icons';
import { useLoginMutation } from '../../redux/features/user/user';
import useAlert from '../../hooks/useAlert';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setAccessToken } from '../../redux/features/user/authSlice';

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const { showError, showAlert } = useAlert();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const payload = {
      username,
      password,
    };
    const response = await login(payload);
    if ('data' in response) {
      dispatch(setAccessToken(response.data.accessToken));
      navigation.navigate('BottomTab', { screen: 'Home' });
    } else {
      if ('status' in response.error && response.error.status === 400) {
        const errorData = response.error.data as { message: string };
        showAlert(errorData.message);
      } else {
        showError(response.error);
      }
    }
  };

  const styles = useStyle();
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
    >
      <ScrollView
        contentContainerStyle={styles.cont}
        alwaysBounceVertical={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <Image
          source={require('../../assets/images/icons8-tshirt-48.png')}
          style={styles.image}
        />
        <View style={styles.form}>
          <CustomTextInput
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <CustomButton
            title="Login"
            onPress={handleLogin}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
      <View style={{ flex: 0.5 }} />
      <View style={styles.footerCont}>
        <BagSvg height={22} width={22} style={styles.icon} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const useStyle = makeStyles(theme => ({
  flex: {
    flex: 1,
    backgroundColor: theme.white,
  },
  cont: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  image: {
    height: 50,
    width: 50,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  footerCont: {
    borderTopWidth: 1,
    borderColor: theme.border[10],
    padding: 20,
  },
  icon: {
    marginLeft: 30,
  },
}));
