import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Screens';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { makeStyles } from '../../hooks/makeStyle';
import { BagSvg } from '../../constant/icons';

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate('BottomTab');
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
          <CustomTextInput placeholder="Email" />
          <CustomTextInput placeholder="Password" />
          <CustomButton title="Login" onPress={handleLogin} />
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
