import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Testing
import { CourseCard } from '../components/CourseCard';
import { useTheme } from '../ThemeProvider';
import { Heading } from '../components/Heading';
import SwipableBottomSheet from '../components/SwipableBottomSheet';

const HomeScreen = () => {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight,
        }}>
          <SwipableBottomSheet viewHeight={100} closeCallback={() => {}}>
            <Text>HELLo</Text>
          </SwipableBottomSheet>
    </SafeAreaView>
  );
}

export default HomeScreen;