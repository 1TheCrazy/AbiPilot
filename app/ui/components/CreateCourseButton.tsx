import React, { useState } from 'react';
import { View, Text, StyleProp, ViewStyle, Pressable, StyleSheet } from 'react-native';

import { useTheme } from '../ThemeProvider';

const CreateCourseButton: React.FC<{ creationSheetOpenStateSetter: React.Dispatch<React.SetStateAction<boolean>>; style?: StyleProp<ViewStyle>}> = ({creationSheetOpenStateSetter, style}) => {
  const { colors } = useTheme();
  
  const styles = StyleSheet.create({
    button: {
      borderWidth: 4,
      justifyContent: 'center',
      padding: 4,
      borderRadius: 15,
      marginHorizontal: 30,
    },
      buttonText: {
      fontSize: 22,
      alignSelf: 'center'
    }
  });

  function openNewCourseBottomSheet(){
    creationSheetOpenStateSetter(true);
  }

  return (
    <Pressable style={[styles.button, {borderColor: colors.highlightBlue}]} onPress={openNewCourseBottomSheet}>
      <Text style={[styles.buttonText, { color: colors.highlightBlue }]}> + Kurs erstellen</Text>
    </Pressable>
  );
}

export default CreateCourseButton;