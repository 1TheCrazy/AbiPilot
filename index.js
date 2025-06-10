import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-reanimated'; // Keep this import in order for reanimated to initilize properly

AppRegistry.registerComponent(appName, () => App);