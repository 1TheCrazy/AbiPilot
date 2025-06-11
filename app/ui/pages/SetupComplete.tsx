import React from 'react';
import { Dimensions, Text, Button  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../ThemeProvider';



const SetupCompleteScreen: React.FC<{onComplete: any}> = ({ onComplete }) => {
  const { colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{
            backgroundColor: colors.backgroundColor,
            padding: 16,
            minHeight: screenHeight
        }}>
      <Text>Viel Spaß mit der App! 👋</Text>
      <Button title="Setup beenden" onPress={() => onComplete() }/>
    </SafeAreaView>
  );
}

export default SetupCompleteScreen;