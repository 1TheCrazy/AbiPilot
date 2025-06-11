import React from 'react';
import { Dimensions, Text, Button, StyleSheet, Pressable, View  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../ThemeProvider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../StartUpScreen';
import InfoCard from '../components/InfoCard';

type SetupNav = NativeStackNavigationProp<Routes, 'chooseState'>;


const StateChooseScreen: React.FC<{ inStartupFlow: boolean }> = ({ inStartupFlow }) => {
    const { colors } = useTheme();
    const screenHeight = Dimensions.get('screen').height;
    // Wrap in try block to not crash when we call this with inStartupFlow = false.
    // We assume no misuse with inStartupFlow = false if component is instantiated from outside
    let navigation: any;
    try{
        navigation = useNavigation<SetupNav>();
    }
    catch{}
  
    return (
        <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight
            }}>
            <Text style={[styles.bigText, {color: colors.fontColor}]}>Wähle ein Bundesland aus...</Text>
            { 
                inStartupFlow ? 
                (<Pressable style={[styles.button, { borderColor: colors.highlightBlue }]} onPress={() => { navigation.navigate('finishSetup') }}>
                    <Text style={[styles.buttonText, { color: colors.highlightBlue }]}>Nächster Schritt</Text>
                </Pressable>)
                :
                <View>
                    <InfoCard text="Wenn du dein Bundesland änderst, musst du ggf. deine Kurswahl anpassen."/>
                    <Pressable style={[styles.button, { borderColor: colors.highlightBlue }]} onPress={() => { /* Handle close here */ }}>
                        <Text style={[styles.buttonText, { color: colors.highlightBlue }]}>Fertig</Text>
                    </Pressable>
                </View>
            }
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    bigText: {
        fontSize: 23,
        paddingTop: 20,
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

export default StateChooseScreen;