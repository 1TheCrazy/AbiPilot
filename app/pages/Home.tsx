import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Testing
import { CourseWidget } from '../components/CourseWidget';
import { useTheme } from '../ThemeProvider';

export default function HomeScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16
        }}>
        <Text style={{color: colors.fontColor}}>
            Home Page
        </Text>
        <CourseWidget name="TEST 123"></CourseWidget>
    </SafeAreaView>
  );
}