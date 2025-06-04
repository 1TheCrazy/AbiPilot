import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeProvider';

export default function SettingsScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16
        }}>
        <Text style={{color: colors.fontColor}}>
            Settings Page
        </Text>
    </SafeAreaView>
  );
}