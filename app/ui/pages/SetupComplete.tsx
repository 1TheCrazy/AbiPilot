import React from 'react';
import { Dimensions, Text, Button, StyleSheet, Pressable  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../ThemeProvider';



const SetupCompleteScreen: React.FC<{onComplete: any}> = ({ onComplete }) => {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('screen').height;

  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight
        }}>
        <Text style={[styles.bigText, {color: colors.fontColor}]}>Viel Spaß mit der App 🚀</Text>
        <Text style={[styles.smallText, {color: colors.lightFontColor}]}>Alles bereit – erkunde jetzt die App!</Text>
        <Pressable onPress={() => onComplete() } style={[styles.button, {borderColor: colors.highlightBlue}]}> 
            <Text style={[styles.buttonText, { color: colors.highlightBlue}]}>Setup beenden</Text>
        </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    bigText: {
        fontSize: 30,
        alignSelf: 'center',
        paddingTop: 100,
        fontWeight: 600
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

export default SetupCompleteScreen;