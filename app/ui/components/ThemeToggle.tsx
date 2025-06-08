import React, { useState, useEffect  } from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions, useColorScheme } from "react-native"
import Icon from '@react-native-vector-icons/fontawesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from "../ThemeProvider";

type Theme = 'light' | 'dark' | 'system';

export const ThemeToggle = () =>{
    const [stateTheme, setScheme] = useState<Theme>('system');
    const { colors, setTheme } = useTheme();
    const { width } = useWindowDimensions();
    const translateX = useSharedValue(0); 
    const sysScheme = useColorScheme();
    let CONTAINER_WIDTH = width - 16 * 2; // Padding on Settings screen

    const indicatorTransform = useAnimatedStyle(() => {
      return {
        transform: [{translateX: translateX.value}],
      };
    });

    // Listen for system scheme changes
    useEffect(() => {
      if(stateTheme === 'system'){
        if(sysScheme){
          setTheme(sysScheme);
        }
        else{
          // This is the case when we have an unset/invalid system Theme
          // Default to dark theme
          setTheme('dark');
        }
      }
    }, [sysScheme])

    useEffect(() => {
      const springConfig = {
        damping: 25,
        stiffness: 80,
        mass: 1,
      }

      if (stateTheme === 'system') {
          translateX.value = withSpring((CONTAINER_WIDTH / 3) * 0, springConfig);
        } else if (stateTheme === 'dark') {
          translateX.value = withSpring((CONTAINER_WIDTH / 3) * 1, springConfig);
        } else if (stateTheme === 'light') {
          translateX.value = withSpring((CONTAINER_WIDTH / 3) * 2, springConfig);
        }
      }, 
    [stateTheme]);

    const setThemeInternal = (theme: Theme) => {
      setScheme(theme);

      if(theme === 'system'){
        if(sysScheme){
          setTheme(sysScheme);
          return;
        }
        else{
          // This is the case when we have an unset/invalid system Theme
          // Default to dark theme
          setTheme('dark');
          return;
        }
      }

      setTheme(theme);
    }

    return(
        <View style={[styles.background, {backgroundColor: colors.transparentAccent}]}>
          <Animated.View style={[styles.indicator, { width: CONTAINER_WIDTH / 3, backgroundColor: colors.transparentAccent }, indicatorTransform]}/>
          <Pressable 
            style={[styles.button, { width: CONTAINER_WIDTH / 3}]}
            onPress={ () => setThemeInternal('system')}>
            <Text style={[styles.text, { color: colors.fontColor }]}>System</Text>
          </Pressable>
          <Pressable 
            style={[styles.button, { width: CONTAINER_WIDTH / 3}]}
            onPress={ () => setThemeInternal('dark')}>
            <Text style={[styles.text, { color: colors.fontColor }]}>Dark</Text>
          </Pressable>
          <Pressable 
            style={[styles.button, { width: CONTAINER_WIDTH / 3}]}
            onPress={ () => setThemeInternal('light')}>
            <Text style={[styles.text, { color: colors.fontColor }]}>Light</Text>
          </Pressable>
        </View>
    )
}



const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'green',
    height: 30,
    top: 5,
    borderRadius: 10
  },
  background: {
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
  },
  text: {
    fontWeight: 600,
    fontSize: 15
  }
});