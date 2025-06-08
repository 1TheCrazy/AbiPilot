import React from 'react';
import { Dimensions  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../ThemeProvider';
import { Heading } from '../components/Heading';
import { CourseCard } from '../components/CourseCard';

export default function ListScreen() {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight
        }}>
      <Heading text="Schriftliche Prüfungsfächer"></Heading>
      <Heading text="Mündliche Prüfungsfächer"></Heading>
      <Heading text="Basiskurse"></Heading>
    </SafeAreaView>
  );
}