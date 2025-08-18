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
            {
                /* For now we'll always be in the startup flow, since the app will only be supporting BW (for now...) */
                inStartupFlow ? 
                (
                    <>
                        <Text style={[styles.bigText, {color: colors.fontColor}]}>Dein Bundesland📍</Text>
                        <Text style={[styles.smallText, {color: colors.lightFontColor}]}>Zum jetztigen Zeitpunkt unterstüzt AbiPilot nur das Abitursystem in Baden-Württemberg, da die Abitursysteme in jedem Bundesland unterschiedlich sind.</Text>
                        <Pressable style={[styles.button, {borderColor: colors.highlightBlue}]} onPress={() => navigation.navigate('chooseCourses')}>
                            <Text style={[styles.buttonText, { color: colors.highlightBlue }]}>Ok</Text>
                        </Pressable>
                    </>
                )
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
        fontSize: 35,
        alignSelf: 'center',
        paddingTop: 100,
    },
    smallText: {
        fontSize: 15,
        paddingTop: 30,
        paddingBottom: 80,
        textAlign: 'center'
    },
    button: {
        borderWidth: 4,
        justifyContent: 'center',
        padding: 4,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 800,
        alignSelf: 'center'
    }
});

export default StateChooseScreen;