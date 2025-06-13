import React, { useEffect, useState } from 'react';
// If you get an error here, this is because there is no type annotaions shipped by default. 
// Include an appropriate react-native-keep-awake.d.ts in ./node_modules/@types or ./node_modules/react-native-keep-awake to disable this
// You can also choose to ignore this or add an @ts-ignore
import KeepAwake from 'react-native-keep-awake';
import BootSplash from "react-native-bootsplash";

import ThemedApp from './app/ui/ThemedApp';
import { Client } from './app/client/SaveSystem';
import StartupScreen from './app/ui/StartUpScreen';
import { ThemeProvider } from './app/ui/ThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App(){
  const [isInitialStartup, setInitialStartup] = useState(Client.isInitialStartup);

  useEffect(() => {
    KeepAwake.activate(); // Keep screen awake on mount
    BootSplash.hide({fade: true}); // Hide SplashScreen

    return () => {
      KeepAwake.deactivate(); // Allow screen to sleep on unmount
    };
  });

  // Return a 'first startup screen' if we booted the app for the first time
  if(isInitialStartup){
    return(
      <ThemeProvider>
        <StartupScreen onComplete={() =>{
          Client.isInitialStartup = false;
          setInitialStartup(false); // Trigger a Rerender
        }}/>
      </ThemeProvider>
    )
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <ThemedApp/> 
      </ThemeProvider> 
    </GestureHandlerRootView>
  );
}

