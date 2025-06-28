import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const Backdrop: React.FC<{ closeCallback: any }> = ({ closeCallback }) => {
    return(
        <>
        <Pressable
            onPress={() => closeCallback()}
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