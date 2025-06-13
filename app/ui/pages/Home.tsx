import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Testing
import { CourseCard } from '../components/CourseCard';
import { useTheme } from '../ThemeProvider';
import { Heading } from '../components/Heading';

const HomeScreen = () => {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight,
        }}>
    </SafeAreaView>
  );
}

export default HomeScreen;