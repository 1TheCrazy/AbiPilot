import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import SettingsScreen from './pages/Settings';
import HomeScreen from './pages/Home';
import ListScreen from './pages/List';
import { ThemeProvider, useTheme, ThemeType } from './ThemeProvider';

const Tab = createBottomTabNavigator();

const ThemedApp = () =>{

  const { colors } = useTheme();

  return(
    <NavigationContainer>
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
  )
}

export default ThemedApp;