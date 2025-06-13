import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Theme } from '../ThemeProvider';
import { BlurView } from '@react-native-community/blur';

const Backdrop: React.FC<{ closeCallback: any }> = ({ closeCallback }) => {
    const theme = Theme; 

    return(
        <>
        <Pressable
            onPress={() => { console.log('calling ts'); closeCallback();}}
            style={[StyleSheet.absoluteFill]}
            pointerEvents="auto">

            <BlurView
            style={StyleSheet.absoluteFill}
            blurType={'dark'}
            blurAmount={2}
            />
        </Pressable>
        </>
    )
}

export default Backdrop;