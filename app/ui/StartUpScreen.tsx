import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './pages/Welcome';
import StateChooseScreen from './pages/StateChooser';
import SetupCompleteScreen from './pages/SetupComplete';

const Stack = createNativeStackNavigator<Routes>();

export type Routes = {
    welcome: undefined,
    chooseState: undefined,
    finishSetup: undefined,
};

export const StartupScreen: React.FC<{onComplete: any}> = ({ onComplete }) => {

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="welcome" component={WelcomeScreen}/>
                <Stack.Screen name="chooseState">
                    {() => <StateChooseScreen inStartupFlow={true} />} 
                </Stack.Screen>
                <Stack.Screen name="finishSetup">
                    {() => <SetupCompleteScreen onComplete={onComplete}/>}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StartupScreen;