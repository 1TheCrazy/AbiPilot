import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Testing
import { CourseCard } from '../components/CourseCard';
import { useTheme } from '../ThemeProvider';
import { Heading } from '../components/Heading';
import CourseSettings from '../components/CourseSettings';
import UserCourse from '../../client/static/interfaces/UserCourse';
import ManagedCourse from '../../client/static/implemented/ManagedCourse';

const HomeScreen = () => {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight,
        }}>
          <CourseSettings course={{
            course:{
              displayName:"Irgendein Name",
              id:"test"
            },
            isLK: true,
            isWrittenExamCourse: true,
            isOralExamCourse: false,
            writtenWeightPercentage: 60
          } as ManagedCourse}/>
    </SafeAreaView>
  );
}

export default HomeScreen;