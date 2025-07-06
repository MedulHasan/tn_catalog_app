import {
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { makeStyles } from '../hooks/makeStyle';
import { useTheme } from '@react-navigation/native';
import { Fonts } from '../constant/fonts';

export enum ButtonType {
  Primary,
}

interface Props {
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  title?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
}

const CustomButton: React.FC<Props> = ({
  type = ButtonType.Primary,
  style,
  title,
  disabled = false,
  isLoading = false,
  onPress,
}) => {
  const theme = useTheme();
  const styles = useStyle({
    type,
    disabled: disabled || isLoading,
  });
  return (
    <Pressable
      style={[styles.cont, style]}
      disabled={disabled || isLoading}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.white} />
      ) : (
        <Text numberOfLines={1} style={styles.text} allowFontScaling={false}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

interface StyleProps {
  type: ButtonType;
  disabled: boolean;
}

const useStyle = makeStyles((theme, props: StyleProps) => ({
  cont: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: (() => {
      if (props.disabled) {
        return theme.background[20];
      }
      switch (props.type) {
        case ButtonType.Primary:
          return theme.primary;
      }
    })(),
    height: 44,
    justifyContent: 'center',
    backgroundColor: (() => {
      switch (props.type) {
        case ButtonType.Primary:
          return props.disabled ? theme.background[20] : theme.primary;
      }
    })(),
  },
  text: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    color: (() => {
      switch (props.type) {
        case ButtonType.Primary:
          return theme.white;
      }
    })(),
  },
}));
