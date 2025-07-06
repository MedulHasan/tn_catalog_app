import {StyleProp, View} from 'react-native';
import React from 'react';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';

interface Props extends FastImageProps {
  style: StyleProp<ImageStyle>;
}

const ProgressiveImage: React.FC<Props> = ({source, style, ...rest}) => {
  return (
    <View style={style}>
      <FastImage
        style={style}
        source={source}
        resizeMode={FastImage.resizeMode.cover}
        {...rest}
      />
    </View>
  );
};

export default ProgressiveImage;
