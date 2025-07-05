import { StyleProp, Text, TextStyle } from 'react-native';
import React from 'react';
import { makeStyles } from '../hooks/makeStyle';
import { Fonts } from '../constant/fonts';

interface Props {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  tag?: string;
  weight?: string;
  numberOfLines?: number;
  onLayout?: () => void;
  [x: string]: any;
}

const CustomText: React.FC<Props> = ({
  children,
  style,
  tag = 'h2',
  weight = Fonts.Medium,
  numberOfLines,
  onLayout,
  ...props
}) => {
  const styles = useStyle({ weight });
  return (
    <Text
      style={[styles.common, styles[tag as keyof typeof styles], style]}
      numberOfLines={numberOfLines}
      onLayout={onLayout}
      allowFontScaling={false}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;

interface StyleProps {
  weight: string;
}

const useStyle = makeStyles((theme, props: StyleProps) => ({
  common: {
    color: theme.black,
    fontFamily: props.weight,
  },
  large: {
    fontSize: 30,
    lineHeight: 38,
  },
  medium: {
    fontSize: 24,
    lineHeight: 32,
  },
  h1: {
    fontSize: 22,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    lineHeight: 25,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
  },
  h5: {
    fontSize: 16,
    lineHeight: 22,
  },
  h6: {
    fontSize: 15,
    lineHeight: 18,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  body2: {
    fontSize: 12,
    lineHeight: 16,
  },
}));
