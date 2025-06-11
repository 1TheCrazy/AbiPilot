import React from 'react';
import { Dimensions, Text, Button  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../ThemeProvider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../StartUpScreen';

type SetupNav = NativeStackNavigationProp<Routes, 'chooseState'>;


const StateChooseScreen: React.FC<{ inStartupFlow: boolean }> = ({ inStartupFlow }) => {
    const { colors } = useTheme();
    const screenHeight = Dimensions.get('window').height;
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
            <Text>Wähle ein Bundesland aus...</Text>
            { 
                inStartupFlow ? 
                (<Button title="Nächster Schritt" onPress={() => {
                    navigation.navigate('finishSetup')
                }}></Button>)
                :
                <Button title="Fertig" onPress={() => {
                    // Handle close here
                }}></Button>
            }
        </SafeAreaView>
  );
}

export default StateChooseScreen;