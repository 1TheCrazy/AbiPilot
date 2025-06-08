import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../ThemeProvider';

interface CourseWidgetProps{
  name: string
}

export const CourseCard: React.FC<CourseWidgetProps> = ({name}) => {
  const { colors } = useTheme();
  
  return (
    <View style={{
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 10,
        padding: 5,
        borderColor: colors.courseCardBorderColor,
        borderWidth: 2
      }}>
      <Text style={{
        color: colors.fontColor
      }}>{name}</Text>
    </View>
  );
}