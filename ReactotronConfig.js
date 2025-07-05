import Reactotron from 'reactotron-react-native';

Reactotron.configure({ name: 'Catalog app' })
  // .use(reactotronRedux())
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect();
