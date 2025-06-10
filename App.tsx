import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements'
// If you get an error here, this is because there is no type annotaions shipped by default. 
// Include an appropriate react-native-keep-awake.d.ts in ./node_modules/@types or ./node_modules/react-native-keep-awake to disable this
// You can also choose to ignore this or add an @ts-ignore
import KeepAwake from 'react-native-keep-awake'; 
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import BootSplash from "react-native-bootsplash";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import SettingsScreen from './app/ui/pages/Settings';
import HomeScreen from './app/ui/pages/Home';
import ListScreen from './app/ui/pages/List';
import { ThemeProvider, useTheme, ThemeType } from './app/ui/ThemeProvider';

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
        <NavigationContainer
          onReady={() => {
            BootSplash.hide({fade: true}); // Hide SplashScreen
          }}>
          <Tab.Navigator 
          backBehavior='history'
            screenOptions={({route}) =>({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = ''; // Assign empty here to make compiler shut up

                // Using 'solid' for focused and 'regular' for unfocused requires a pro license (I ain't got the money) 
                if (route.name === 'Home') {
                  iconName = 'house';
                } else if (route.name === 'Einstellungen') {
                  iconName = 'gear';
                } else if(route.name === 'Fächer'){
                  iconName = 'bars';
                }

                return <FontAwesome6 name={iconName as any} size={size} color={color} iconStyle='solid'/>;
              },
              tabBarStyle: { backgroundColor: colors.navbarColor },
              tabBarActiveTintColor: colors.navitemActiveColor,
              tabBarInactiveTintColor: colors.navitemInactiveColor,
              headerShown: false,
              tabBarButton: (props) => ( <PlatformPressable {...props} android_ripple={{ color: 'transparent' }}/> ), // Disable the ripple effect on android
              tabBarLabelPosition: 'below-icon',
              tabBarPosition: 'bottom',
            })}
            initialRouteName='Home'
            >
          <Tab.Screen name="Einstellungen" component={SettingsScreen}/>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Fächer" component={ListScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    )
  }
}