import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements'
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// If you get an error here, this is because there is no type annotaions shipped by default. 
// Include an appropriate react-native-keep-awake.d.ts in ./node_modules/@types to disable this
// You can also choose to ignore this or add an @ts-ignore
import KeepAwake from 'react-native-keep-awake'; 
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import SettingsScreen from './app/pages/Settings';
import HomeScreen from './app/pages/Home';
import ListScreen from './app/pages/List';
import { ThemeProvider, useTheme, ThemeType } from './app/ThemeProvider';

const Tab = createBottomTabNavigator();

export default function App(){
  const { colors } = useTheme();
  
  return ( <ThemedApp {...colors} /> );
}

class ThemedApp extends React.Component<ThemeType> {
  componentDidMount() {
    KeepAwake.activate();
    changeNavigationBarColor('transparent', false);
  }

  componentWillUnmount() {
    KeepAwake.deactivate();
  }

  render(){
    const colors = this.props;

    return(
      <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator 
            screenOptions={{
              
              tabBarStyle: { backgroundColor: colors.navbarColor },
              tabBarActiveTintColor: colors.navitemActiveColor,
              tabBarInactiveTintColor: colors.navitemInactiveColor,
              headerShown: false,
              tabBarButton: (props) => ( <PlatformPressable {...props} android_ripple={{ color: 'transparent' }}/> ), // Disable the ripple effect on android
            }}
            initialRouteName='Home'
            >
          <Tab.Screen name="Einstellungen" component={SettingsScreen}/>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Liste" component={ListScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    )
  }
}