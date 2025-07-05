import {
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import { Fonts } from '../constant/fonts';
import { makeStyles } from '../hooks/makeStyle';

interface Props extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const CustomTextInput: React.FC<Props> = ({ style, inputStyle, ...rest }) => {
  const styles = useStyle();
  return (
    <View style={[styles.cont, style]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={'#888888'}
        {...rest}
      />
    </View>
  );
};

export default CustomTextInput;

const useStyle = makeStyles(theme => ({
  cont: {
    borderWidth: 1,
    borderColor: theme.border[10],
    width: '100%',
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 16,
    fontFamily: Fonts.Medium,
    color: theme.text[10],
  },
}));
