import {StyleSheet} from 'react-native';
import Root from './src/navigation/Root';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {createLightTheme} from './src/theme/theme';
import {RootStackParamList} from './src/navigation/Screens';

function App() {
  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['https://tn-catalog-app.netlify.app', 'com.medul://'],
    config: {
      screens: {
        ProductDetails: 'product/:id',
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
