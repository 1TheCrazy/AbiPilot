import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '../ThemeProvider';

export const CourseCard: React.FC<{name: string, style?: StyleProp<ViewStyle>}> = ({name, style}) => {
  const { colors } = useTheme();
  
  return (
    <View style={[{
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 10,
        padding: 5,
        borderColor: colors.courseCardBorderColor,
        borderWidth: 2
      }, style]}>
      <Text style={{
        color: colors.fontColor
      }}>{name}</Text>
    </View>
  );
}