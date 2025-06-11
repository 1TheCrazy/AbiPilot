import React from 'react';
import { Dimensions, Text, Button, StyleSheet, Pressable  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../ThemeProvider';
import { NativeStackNavigationProp, NativeStackNavigatorProps } from '@react-navigation/native-stack';
import { Routes } from '../StartUpScreen';

type SetupNav = NativeStackNavigationProp<Routes, 'welcome'>;

const WelcomeScreen = () => {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('screen').height;
  const navigation = useNavigation<SetupNav>();
  
  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight
        }}>
      <Text style={[styles.bigText, {color: colors.fontColor}]}>Willkommen 👋</Text>
      <Text style={[styles.smallText, {color: colors.lightFontColor}]}>Schließe ein kleines Setup ab, um AbiPilot nutzen zu können!</Text>
      <Pressable style={[styles.button, {borderColor: colors.highlightBlue}]} onPress={() => navigation.navigate('chooseState')}>
        <Text style={[styles.buttonText, { color: colors.highlightBlue }]}>Setup Beginnen</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    bigText: {
        fontSize: 40,
        alignSelf: 'center',
        paddingTop: 100,
    },
    smallText: {
        fontSize: 15,
        paddingTop: 30,
        paddingBottom: 80,
    },
    button: {
        borderWidth: 4,
        justifyContent: 'center',
        padding: 4,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 22,
        alignSelf: 'center'
    }
});

export default WelcomeScreen;