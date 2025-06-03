import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Styles from '../Styles'

export default function HomeScreen() {
  return (
    <SafeAreaView style={{
            backgroundColor: Styles.backgroundColor,
            padding: 16
        }}>
        <Text style={{color: Styles.fontColor}}>
            Home Page
        </Text>
    </SafeAreaView>
  );
}