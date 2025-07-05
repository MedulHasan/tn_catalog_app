import { Modal, StatusBar, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { makeStyles } from '../hooks/makeStyle';
import CustomText from './CustomText';

interface Props {
  isVisible: boolean;
}

const LoadingModal: React.FC<Props> = ({ isVisible }) => {
  const styles = useStyle();

  return (
    <Modal visible={isVisible} transparent={true}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.cont}>
        <LottieView
          source={require('../assets/lottie/loading.json')}
          style={styles.loadingAnimation}
          autoPlay
          loop
        />
        <CustomText tag="h4" style={styles.normalText}>
          Loading...
        </CustomText>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const useStyle = makeStyles(theme => ({
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background[10],
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
  normalText: {
    marginTop: 16,
  },
}));
