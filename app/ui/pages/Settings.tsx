import React from 'react';
import { Text, Dimensions, StyleSheet, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeProvider';

import { Heading } from '../components/Heading';
import { ThemeToggle } from '../components/ThemeToggle';

const SettingsScreen = () => {
  const { colors, setTheme } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight,
        }}>
        <Heading text="Erscheinungsbild"/>
        <ThemeToggle/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        fontWeight: 600
    },
    hr: {
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 10,
    }
});

export default SettingsScreen;