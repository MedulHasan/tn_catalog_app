/**
 * @format
 */

if (__DEV__) {
  require('./ReactotronConfig');
}

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const AddProvider = props => {
  return (
    <Provider store={store}>
      <App appThemeId={props.appThemeId} />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AddProvider);
