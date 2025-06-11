import React, { useEffect } from 'react';

import ThemedApp from './app/ui/components/ThemedApp';
import { Client } from './app/client/SaveSystem';
// If you get an error here, this is because there is no type annotaions shipped by default. 
// Include an appropriate react-native-keep-awake.d.ts in ./node_modules/@types or ./node_modules/react-native-keep-awake to disable this
// You can also choose to ignore this or add an @ts-ignore
import KeepAwake from 'react-native-keep-awake';


export default function App(){
  useEffect(() => {
    KeepAwake.activate(); // Keep screen awake on mount

    return () => {
      KeepAwake.deactivate(); // Allow screen to sleep on unmount
    };
  });
  
  // Return a 'first startup screen' if we booted the app for the first time
  if(Client.isInitialStartup){

  }

  return ( <ThemedApp/> );
}

