import React from 'react';
import StackNavigation from './StackNavigation';
import {StatusBar} from 'react-native';

const Root = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <StackNavigation />
    </>
  );
};

export default Root;
