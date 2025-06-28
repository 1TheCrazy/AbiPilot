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
import Course from '../../client/static/interfaces/Course';

const HomeScreen = () => {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  const testImplClass = class extends ManagedCourse {

  }

  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight,
        }}>
          <CourseSettings course={new testImplClass({displayName: "Irgendein Name", id: "test"} as Course, true, false, [true, true, true , true], [], 50)}/>
    </SafeAreaView>
  );
}

export default HomeScreen;