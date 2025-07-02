import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NoteGauge from '../components/GradeGauge';
import { useTheme } from '../ThemeProvider';

// Testing
import { CourseCard } from '../components/CourseCard';
import { Heading } from '../components/Heading';
import CourseSettings from '../components/CourseSettings';
import UserCourse from '../../client/static/interfaces/UserCourse';
import ManagedCourse from '../../client/static/implemented/ManagedCourse';
import Course from '../../client/static/interfaces/Course';

const HomeScreen = () => {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{
      backgroundColor: colors.backgroundColor,
      padding: 16,
      minHeight: screenHeight,
      }}>
      <NoteGauge points={400} goalPoints={700} style={{marginTop: 60}}/>
    </SafeAreaView>
  );
}

export default HomeScreen;