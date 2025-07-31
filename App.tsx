import {StyleSheet} from 'react-native';
import Root from './src/navigation/Root';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {createLightTheme} from './src/theme/theme';
import {RootStackParamList} from './src/navigation/Screens';
import {appPrefixes, product} from './src/constant/linkRoute';

function App() {
  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [appPrefixes, 'https://reactnative.dev/'],
    config: {
      screens: {
        ProductDetails: `${product}/:id`,
      },
    },
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer theme={createLightTheme} linking={linking}>
          <Root />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
