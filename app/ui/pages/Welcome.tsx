import React from 'react';
import { Dimensions, Text, Button  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../ThemeProvider';
import { NativeStackNavigationProp, NativeStackNavigatorProps } from '@react-navigation/native-stack';
import { Routes } from '../StartUpScreen';

type SetupNav = NativeStackNavigationProp<Routes, 'welcome'>;

const WelcomeScreen = () => {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation<SetupNav>();
  
  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight
        }}>
      <Text>Hallo 👋</Text>
      <Button title="Setup beginnen" onPress={() => navigation.navigate('chooseState') }/>
    </SafeAreaView>
  );
}

export default WelcomeScreen;