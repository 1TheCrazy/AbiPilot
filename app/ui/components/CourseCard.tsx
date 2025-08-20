import React from 'react';
import { View, Text, StyleProp, ViewStyle, Pressable } from 'react-native';

import { useTheme } from '../ThemeProvider';

export const CourseCard: React.FC<{name: string, onPress: () => void, style?: StyleProp<ViewStyle>}> = ({name, style, onPress}) => {
  const { colors } = useTheme();
  
  return (
    <Pressable 
      onPress={() => onPress()}
      style={[{
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
    </Pressable>
  );
}